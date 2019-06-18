var express = require('express');
var router = express.Router();

let nextId = 0;
let messages = [
  {id: nextId++, text: "This is the first post", timestamp: JSON.stringify(new Date())},
  {id: nextId++, text: "This is the second post", timestamp: JSON.stringify(new Date())},
  {id: nextId++, text: "This is the third post", timestamp: JSON.stringify(new Date())}
];

router.get('/', function(req, res, next) {
  // res.send(messages);
  res.json(messages);
});

router.put('/', function(req, res, next) {
  // console.log(messages);
  // console.log(req.body.id);
  let message = messages.find( (m) => {
    // console.log(m.id);
    return m.id === req.body.id.delKey
  });
  // console.log("this is the msg:" + JSON.stringify(message));
  res.json(message);
});

router.post('/reply', function(req, res) {
  // console.log(req);
  if (req.body.text) {
    newMessage = {
      id: nextId++,
      text: ("↪ " + req.body.text),
      timestamp: JSON.stringify(new Date())
    };
    messages.splice(req.body.id, 0, newMessage)
  }
  res.json(messages);
});

router.post('/', function(req, res) {
  // console.log(req);
  if (req.body !== {}) {
    newMessage = {
      id: nextId++,
      text: req.body.text,
      timestamp: JSON.stringify(new Date())

    };
    // users = users.concat(req.body); works
    messages.push(newMessage);
  }
  // users = [...users, req.body]; also works
  res.json(messages);
});

router.delete('/', function(req, res) {
  messages = messages.filter( ({ id }) => id !== req.body.id);
  res.json(messages);
});

module.exports = router;
