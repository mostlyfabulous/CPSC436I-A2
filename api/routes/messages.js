var express = require('express');
var router = express.Router();

let messages = [
  {id: 1, text: "This is the first post", timestamp: JSON.stringify(new Date())},
  {id: 2, text: "This is the second post", timestamp: JSON.stringify(new Date())},
  {id: 3, text: "This is the third post", timestamp: JSON.stringify(new Date())}
];

router.get('/', function(req, res, next) {
  // res.send(messages);
  res.json(messages);
});

router.post('/', function(req, res) {
  console.log(req.body);
  newMessage = req.body;
  // users = users.concat(req.body); works
  messages.push(newMessage);
  // users = [...users, req.body]; also works
  res.json(newMessage);
});

module.exports = router;
