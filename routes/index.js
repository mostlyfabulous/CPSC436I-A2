const path = require("path")
var express = require('express');
var router = express.Router();
var app = express();

app.use(express.static(path.join(__dirname, "client", "build")))
/* Serve client */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = router;
