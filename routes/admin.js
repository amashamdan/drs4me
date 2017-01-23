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
		res.render("admin.ejs", {csrfToken: req.csrfToken(), messageAdmin: undefined, messagePhysician: undefined});
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
				res.render("admin.ejs", {csrfToken: req.csrfToken(), messageAdmin: "Admin already added.", messagePhysician: undefined});
			}
		})
	})
});

router.route("/addPhysician")
.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to databse.");
			return;
		}
		var physicians = db.collection("physicians");
		physicians.find({"email": req.body.email}).toArray(function(err, result) {
			if (result.length > 0) {
				res.render("admin.ejs", {csrfToken: req.csrfToken(), messageAdmin: undefined, messagePhysician: "Physician already added."});
			} else {
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password1, salt, function(err, hash) {
						physicians.insert({
							"name": req.body.name,
							"email": req.body.email,
							"password": hash,
							"phone": req.body.phone,
							"imageUrl": req.body.image,
							"specialty": req.body.specialty,
							"address": req.body.address,
							"zip": req.body.zip
						}, function() {
							res.redirect("/admin");
						});
					});
				});				
			}
		});
	});
});

module.exports = router;