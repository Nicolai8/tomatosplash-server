"use strict";
const express = require("express");
const router = express.Router();
const passport = require("../lib/passport");

router.post("/", passport.authenticate);

router.post("/isAuthenticated", function (req, res) {
	res.json({"isAuthenticated": typeof req.user !== "undefined"});
});

module.exports = router;