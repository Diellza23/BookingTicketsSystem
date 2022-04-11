const express = require("express");

const router = express.Router();

const mongoTypes = require("mongoose").Types;
const Post = require("../backend/Models/Post.js");
const { mongo } = require("./db.js");

//routes
//get all posts

router.get("/", (req, res) => {
  Post.find((err, doc) => {
    if (err) {
      console.log("Error occures while data fetching" + err);
      res.status(400).send("Internal error", err);
    } else {
      res.send(doc);
    }
  });
});

//create new post
router.post("/", (req, res) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
  });
  post.save((err, doc) => {
    if (err) {
      console.log("Internal error: ", err);
      res.status(400).send("Internal Error: " + err);
    } else {
      res.send(doc);
    }
  });
});

//get post by id
router.get("/:id", (req, res) => {
  if (mongo.ObjectId.isValid(req.params.id)) {
    Post.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Internal error", err);
        res.status(400).send("Internal error: ", id);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).send("No record found with the given id: ", id);
  }
});

//delete post  by id
router.delete("/:id", (req, res) => {
  if (mongo.ObjectId.isValid(req.params.id)) {
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Internal error", err);
        res.status(400).send("Internal error: ", id);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.status(400).send("No record found with the given id: ", id);
  }
});

//update post
router.put("/:id", (req, res) => {
  let post = {
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
  };

  if (mongo.ObjectId.isValid(req.params.id)) {
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: post },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Internal error", err);
          res.status(400).send("Internal error: ", id);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    res.status(400).send("No record found with the given id: ", id);
  }
});

module.exports = router;
