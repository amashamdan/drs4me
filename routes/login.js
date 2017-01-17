var express = require("express");
var mongodb = require("mongodb");

var router = express.Router();

router.route("/")
.get(function(req, res) {
	res.render("login.ejs");
})

module.exports = router;