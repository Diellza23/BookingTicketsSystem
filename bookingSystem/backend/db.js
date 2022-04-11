const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Airline", (err) => {
  if (err) {
    console.log("Connection ended with error" + err);
  } else {
    console.log("Connection is successful");
  }
});

module.exports = mongoose;
