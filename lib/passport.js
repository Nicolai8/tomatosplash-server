"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("../config");

let user = {
	id: config.get("admin") + "kakwerl1jl3las",
	username: config.get("admin")
};

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	done(null, user);
});

passport.use(new LocalStrategy(function (username, password, done) {
	if (username === config.get("admin") && password === config.get("adminPassword")) {
		done(null, user);
	} else {
		done(new Error("not authorized"));
	}
}));

exports.authenticate = function authenticate(req, res, next) {
	passport.authenticate("local", function (err, user) {
		if (err) {
			return next(err);
		}

		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}

			req.user = user;
			res.json({});
		});
	})(req, res, next);
};