"use strict";
const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, require: true },
    description: String,
    price: Number,
    type: String,
    created: { type: Date, default: Date.now }
});

exports.Item = mongoose.model("Item", schema);