var express = require("express");
var mongodb = require("mongodb");

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.DATABASE;

router.route("/")
.get(function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connection to database.");
			return
		}
		
		if (req.session.user) {
			var user = req.session.user;
		} else {
			var user = undefined;
		}

		var physicians = db.collection("physicians");
		physicians.find({"featured": true}).toArray(function(err, results) {
			res.render("index.ejs", {user: user, featuredPhysicians: results});
		});
	});
})

module.exports = router;