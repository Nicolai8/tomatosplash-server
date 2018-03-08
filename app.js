const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const sessionStore = require("./lib/sessionStore");
const config = require('./config');
const cors = require('express-cors');
const app = express();

app.use(cors({
	allowedOrigins: [
		'*'
	]
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.get("session:secret"),
	cookie: config.get("session:cookie"),
	store: sessionStore
}));

app.use(express.static(path.join(__dirname, 'public')));

const passport = require("passport");
//configure passport
app.use(passport.initialize());
app.use(passport.session());

require("./routes")(app);

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	if (res.req.headers["x-requested-with"] === "XMLHttpRequest") {
		err = {
			status: err.status,
			message: err.message,
			stack: err.stack || ""
		};
		res.json(err);
	} else {
		res.send(err.message);
	}
});


module.exports = app;
