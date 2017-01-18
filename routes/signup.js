var express = require("express");
var mongodb = require("mongodb");
var parser = require("body-parser").urlencoded({extended: false});
var bcrypt = require("bcryptjs");

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.DATABASE;

router.route("/")
.get(function(req, res) {
	res.render("signup.ejs", {csrfToken: req.csrfToken(), message: undefined});
})
.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to database.");
			return;
		}

		var users = db.collection("users");
		users.find({"email": req.body.email}).toArray(function(err, results) {
			if (results.length == 0) {
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password1, salt, function(err, hash) {
						users.insert({
							"email": req.body.email,
							"password": hash,
							"firstName": req.body.firstName,
							"lastName": req.body.lastName,
							"phone": req.body.phone
						}, function() {
							res.render("login.ejs", {csrfToken: req.csrfToken(), message: "You have successfully signed up. You can now login to your account.", messageType: "success"});
						});						
					});
				});
			} else {
				res.render("signup.ejs", {csrfToken: req.csrfToken(), message: "Email is already used."});
			}
		})
	})
});


module.exports = router;



