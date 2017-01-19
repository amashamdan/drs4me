var express = require("express");

var router = express.Router();

router.route("/")
.get(function(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
 		res.render("dashboard.ejs", {user: req.session.user});
	}
})

module.exports = router;