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
		res.redirect("/admin");
	} else {
		res.render("adminLogin.ejs", {message: undefined, csrfToken: req.csrfToken()});
	}
})

.post(parser, function(req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		if (err) {
			res.end("Error connecting to database.");
			return;
		}
		var admins = db.collection("admins");
		admins.find({"email": req.body.credential2}).toArray(function(err, result) {
			if (result.length == 0) {
				res.render("adminLogin.ejs", {message: "First credential did not pass.", csrfToken: req.csrfToken()});
			} else {
				/*bcrypt.compare(req.body.credential1, result[0].password, function(err, checkResult) {
					if (checkResult) {
						req.session.user = result[0];
						delete req.session.use.password;
						res.redirect("/admin");
					} else {
						res.render("adminLogin.ejs", {message: "Second credential did not pass.", csrfToken: req.csrfToken()});
					}
				});*/
					if (req.body.credential1 == result[0].password) {
						req.session.user = result[0];
						delete req.session.user.password;
						res.redirect("/admin");
					} else {
						res.render("adminLogin.ejs", {message: "Second credential did not pass.", csrfToken: req.csrfToken()});
					}				
			}
		})
	});
});

module.exports = router;