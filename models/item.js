"use strict";
const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

let schema = new Schema({
	name: {type: String, require: true},
	description: String,
	pictureUrl: String,
	created: {type: Date, default: Date.now}
});

exports.Item = mongoose.model("Item", schema);