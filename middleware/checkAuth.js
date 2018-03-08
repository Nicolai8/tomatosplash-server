'use strict';
const passport = require('passport');
const HttpError = require("../errors").HttpError;

module.exports = function (req, res, next) {
	if (!req.user) {
		passport.authenticate('basic', {session: false})(req, res, function (err) {
			if (err) {
				return next(new HttpError(401));
			}
			next();
		});
	} else {
		next();
	}
};