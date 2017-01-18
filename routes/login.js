var express = require("express");
var mongodb = require("mongodb");
var parser = require("body-parser").urlencoded({extended: false});
var bcrypt = require("bcryptjs");

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.DATABASE;

router.route("/")
.get(function(req, res) {
	if (req.session.user) {
		res.redirect("/");
	} else {
		res.render("login.ejs", {csrfToken: req.csrfToken(), message: undefined});
	}
});

router.route("/user")
.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to database.");
			return;
		}

		var users = db.collection("users");
		users.find({"email": req.body.email}).toArray(function(err, result) {
			if (result.length == 0) {
				res.render("login.ejs", {csrfToken: req.csrfToken(), message: "Email not found.", messageType: "error"});
			} else {
				bcrypt.compare(req.body.password, result[0].password, function(err, checkResult) {
					if (checkResult) {
						req.session.user = result[0];
						delete req.session.user.password;
						res.redirect("/dashboard");
					} else {
						res.render("login.ejs", {csrfToken: req.csrfToken(), message: "Incorrect password.", messageType: "error"});
					}
				})
			}
		})
	});
});

module.exports = router;

/* USE CSRF */