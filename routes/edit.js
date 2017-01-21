var express = require("express");
var mongodb = require("mongodb");
var parser = require("body-parser").urlencoded({extended: false});

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.DATABASE;

router.route("/")
.get(function(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		res.render("edit.ejs", {user: req.session.user, csrfToken: req.csrfToken(), message: undefined});
	}
});

router.route("/info")
.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to database.");
			return;
		}
		var users = db.collection("users");
		if (req.session.user.email == req.body.email) {
			updateUser(req, res, users);
		} else {
			/* Ensure the newly entered email is not in the database. */
			users.find({"email": req.body.email}).toArray(function(err, result) {
				if (result.length > 0) {
					res.render("edit.ejs", {user: req.session.user, csrfToken: req.csrfToken(), message: "The entered email is already registered."});
				} else {
					updateUser(req, res, users);
				}
			});
		}
	})
});

function updateUser(req, res, users) {
	users.update(
		{"email": req.session.user.email},
		{"$set": {"firstName": req.body.firstName, "lastName": req.body.lastName, "email": req.body.email, "phone": req.body.phone}},
		function() {
			/* Can also save properties directly into session.user, like:
			session.user.name = req.body.name */
			users.find({"email": req.body.email}).toArray(function(err, result) {
				req.session.user = result[0];
				delete req.session.user.password;
				res.redirect("/dashboard");
			});
		}
	);
}

module.exports = router;