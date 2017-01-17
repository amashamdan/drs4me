var express = require("express");
var secure = require('express-force-https');
require("ejs");
var session = require("client-sessions");

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

var index = require("./routes/index");
app.use("/", index);
var login = require("./routes/login");
app.use("/login", login);

var PORT = Number(process.env.PORT || 8080);
app.listen(PORT);