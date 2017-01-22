var express = require("express");
var mongodb = require("mongodb");
var parser = require("body-parser").urlencoded({extended: false});
var bcrypt = require("bcryptjs");

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var mongoUrl  = process.env.DATABASE;

router.route("/")
.get(function(req, res) {
	if (req.session.user) {
		res.render("admin.ejs", {csrfToken: req.csrfToken(), messageAdmin: undefined, messgePhysician: undefined});
	} else {
		res.redirect("/");
	}
})

router.route("/addAdmin")
.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to databse.");
			return;
		}
		var admins = db.collection("admins");
		admins.find({"email": req.body.email}).toArray(function(err, result) {
			if (result.length == 0) {
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password1, salt, function(err, hash) {
						admins.insert({
							"name": req.body.name,
							"email": req.body.email,
							"phone": req.body.phone,
							"password": hash
						}, function() {
							res.redirect("/admin");
						});
					});
				});
			} else {
				res.render("admin.ejs", {csrfToken: req.csrfToken(), messageAdmin: "Admin already added.", messgePhysician: undefined});
			}
		})
	})
});

module.exports = router;