"use strict";
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const authRoute = require("./auth");
const logoutRoute = require("./logout");
const itemRoute = require("./item");

module.exports = function (app) {
	router.get('/', function (req, res, next) {
		res.sendFile('index.html');
	});

	app.use("/api/login", authRoute);
	router.post("/api/logout", checkAuth, logoutRoute);
	app.use("/api/item", itemRoute);
	app.use(router);
};