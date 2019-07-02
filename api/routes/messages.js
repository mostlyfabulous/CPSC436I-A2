var config = require('../../config.js');
var assert = require('assert');
var express = require('express');
var router = express.Router();
// DB connection driver
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+config.mongoUser+":"+config.mongopw+"@sandbox-ocgqf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let dbConnected = false;

client.connect(err => {
  if (err) console.log("Error connecting: "+err);
  if (!err) dbConnected = true;
  console.log(dbConnected);
  const messages = client.db("MessageBoard").collection("messages");
  // Reset and add sample mesages to DB
  let nextId = null;
  messages.find().sort({id:-1}).limit(1)
  .next(function(err, msg) {
    assert.equal(err, null);
    console.log(msg.id);
    nextId = msg.id;
  });
  // returns all the documents unlike in mongo shell which returns the largest message id
  // messages.aggregate({ $group:{ _id: null, maxId:{ $max : "$id" }}}) 

  // let messages = [
  //   {id: nextId++, text: "This is the first post", timestamp: new Date().toISOString()},
  //   {id: nextId++, text: "This is the second post", timestamp: new Date().toISOString()},
  //   {id: nextId++, text: "This is the third post", timestamp: new Date().toISOString()}
  // ];
  // collection.drop();
  // collection.insertMany([
  // messages[0], messages[1], messages[2]
  // ]);
  // client.close();

// Get all messages
  router.get('/', function(req, res, next) {
    // console.log(messages);
    messages.find().toArray(function(err, msgs) {
      assert.equal(err, null);
      res.json(msgs);
    });
    // res.json(messages.find());
  });

  router.put('/', function(req, res, next) {
    // console.log(messages);
    // console.log(req.body.id);
    let message = messages.find({id: req.body.id.delKey});
    // console.log("this is the msg:" + JSON.stringify(message));
    message.toArray(function(err, msg) {
      assert.equal(err, null);
      res.json(message);
    });
  });
  // Reply to a message
  // TODO: Integrate DB storage and reply feature
  router.post('/reply', function(req, res) {
    // console.log(req);
    if (req.body.text) {
      newMessage = {
        id: nextId++,
        text: ("↪ " + req.body.text),
        timestamp: new Date().toISOString()
      };
      messages.insertOne(newMessage);
      // messages.splice(req.body.id, 0, newMessage)
    }
    messages.find().toArray(function(err, msgs) {
      assert.equal(err, null);
      res.json(msgs);
    });
  });
  // Add message
  router.post('/', function(req, res) {
    // console.log(req.body);
    if (req.body !== {}) {
      // console.log(JSON.stringify(nextId));
      console.log("inserting with id:"+nextId);
      newMessage = {
        id: nextId++,
        text: req.body.text,
        timestamp: new Date().toISOString()
      };
      console.log(newMessage);
      messages.insert(newMessage);
      messages.find().toArray(function(err, msgs) {
        assert.equal(err, null);
        res.json(msgs);
      });
    }
  });
  // Delete a message
  router.delete('/', function(req, res) {

    // messages = messages.filter( ({ id }) => id !== req.body.id);
    messages.find().toArray(function(err, msgs) {
      assert.equal(err, null);
      res.json(msgs);
    });
  });
});
module.exports = router;
