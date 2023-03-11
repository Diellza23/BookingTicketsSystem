const express = require("express");
const bodyparser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const stripe = require("stripe")(
  "sk_test_51KT96rDvrPmUXctBHblfU8kKdIVjoKgeRX0SId8M1jt57PQ4CUTuLUdEmxlXScutTy0denPQ8sOCi1E3IFmuf1rE00haFesDE8"
);
const cors = require("cors");

app.use(cors({ origin: "http://localhost:4200" }));

app.post("/checkout", async (req, res) => {
  try {
    console.log(req.body);
    token = req.body.token;
    const customer = stripe.customers
      .create({
        email: "dk49556@ubt-uni.net",
        source: token.id,
      })
      .then((customer) => {
        console.log(customer);
        return stripe.charges.create({
          amount: 1000,
          description: "Test Purchase using express and Node",
          currency: "USD",
          customer: customer.id,
        });
      })
      .then((charge) => {
        console.log(charge);

        // Save payment information to MongoDB
        MongoClient.connect(
          "mongodb://localhost:27017/airline",
          function (err, client) {
            if (err) throw err;
            var db = client.db("mydb");
            var paymentInfo = {
              amount: charge.amount,
              description: charge.description,
              currency: charge.currency,
              customerId: charge.customer,
              created: new Date(),
            };
            db.collection("payments").insertOne(
              paymentInfo,
              function (err, res) {
                if (err) throw err;
                console.log("Payment information saved to MongoDB!");
                client.close();
              }
            );
          }
        );

        res.json({
          data: "success",
        });
      })
      .catch((err) => {
        res.json({
          data: "failure",
        });
      });
    return true;
  } catch (error) {
    return false;
  }
});

app.listen(3000, () => {
  console.log("App is listening on Port 5000");
});
