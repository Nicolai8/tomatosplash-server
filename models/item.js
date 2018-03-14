"use strict";
const mongoose = require("../lib/mongoose");
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    name: { type: String, require: true },
    description: String,
    price: Number,
    type: String,
    created: { type: Date, default: Date.now }
});
schema.plugin(mongoosePaginate);

exports.model = mongoose.model("Item", schema);