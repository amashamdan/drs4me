var express = require("express");
var secure = require('express-force-https');
require("ejs");
var session = require("client-sessions");
var csrf = require("csurf");

var app = express();
app.use(secure);

app.use("/stylesheets", express.static(__dirname + "/views/stylesheets"));
app.use("/scripts", express.static(__dirname + "/views/scripts"));
app.use("/images", express.static(__dirname + "/views/images"));

app.use(session({
	cookieName: "session",
	// Random string.
	secret: "dgrdtyhdthsrtg",
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true, //Don't let browser javascript access cookies.
	secure: true, //only use cookies over https
	ephemeral: true //Delete this cookie when the broswer is closed.
}));

/* THIS MUST LIKE THIS IN THIS ORDER. Needed for csrf to work properly. */
app.use(require("body-parser").urlencoded({extended: true}));
app.use(csrf());

var index = require("./routes/index");
app.use("/", index);
var login = require("./routes/login");
app.use("/login", login);
var logout = require("./routes/logout");
app.use("/logout", logout);
var signup = require("./routes/signup");
app.use("/signup", signup);
var dashboard = require("./routes/dashboard");
app.use("/dashboard", dashboard);
var edit = require("./routes/edit");
app.use("/edit", edit);
var adminLogin = require("./routes/adminLogin");
app.use("/adminLogin", adminLogin);
var admin = require("./routes/admin");
app.use("/admin", admin);

var PORT = Number(process.env.PORT || 8080);
app.listen(PORT);