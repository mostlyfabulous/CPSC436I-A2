// var config = require('../config.js');
var assert = require('assert');
var express = require('express');
var router = express.Router();
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST,OPTIONS, DELETE, PATCH, PUT');
  next();
});
// DB connection driver
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PW+"@sandbox-ocgqf.mongodb.net/test?retryWrites=true&w=majority";
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
    console.log("Largest message ID: " + msg.id);
    nextId = msg.id;
  });
  // returns all the documents unlike in mongo shell which returns the largest message id

  // messages.aggregate({ $group:{ _id: null, maxId:{ $max : "$id" }}}, function(re) {
  //   nextId=re;
  // })

  // let messages = [
  //   {id: nextId++, text: "This is the first post", timestamp: new Date().toISOString()},
  //   {id: nextId++, text: "This is the second post", timestamp: new Date().toISOString()},
  //   {id: nextId++, text: "This is the third post", timestamp: new Date().toISOString()}
  // ];
  // collection.drop();
  // collection.insertMany([
  // messages[0], messages[1], messages[2]
  // ]);

// Get all messages
  router.get('/', function(req, res, next) {
    // console.log(messages);
    messages.find().toArray(function(err, msgs) {
      assert.equal(err, null);
      res.json(msgs);
    });
    // res.json(messages.find());
  });
// Detailed message request
  router.put('/', function(req, res, next) {
    // console.log(messages);
    // console.log(req.body.id);
    messages.find({id: req.body.id.delKey}).toArray(function(err, msg) {
      console.log(msg);
      assert.equal(err, null);
      res.json(msg[0]);
    });;
    // console.log("this is the msg:" + JSON.stringify(message));
  });
  // Reply to a message
  // TODO: Integrate DB storage and reply feature
  router.post('/reply', function(req, res) {
    // console.log(req);
    if (req.body.text) {
      newMessage = {
        id: ++nextId,
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
      newMessage = {
        id: ++nextId,
        text: req.body.text,
        timestamp: new Date().toISOString()
      };
      console.log(newMessage);
      messages.insertOne(newMessage);
      messages.find().toArray(function(err, msgs) {
        assert.equal(err, null);
        res.json(msgs);
      });
    }
  });
  // Delete a message
  router.delete('/', function(req, res) {
    console.log("deleting message");
    // messages = messages.filter( ({ id }) => id !== req.body.id);
    try {
      messages.deleteOne({id: req.body.id}), function(err, msgs) {
        // assert.equal(err, null);
        console.log("callback of deleteOne");
        console.log(err);
        console.log(msgs);
        assert.equal(1, msgs.result.n);
        res.json(req.body);
        };
    } catch (e) {
      console.log(e);
    } finally {
      res.json(req.body);
    }
    });
  process.on('SIGINT', () => {
    console.log("\nClosing MongoDB connection...");
    client.close();
    process.exit();
  });
});
module.exports = router;
