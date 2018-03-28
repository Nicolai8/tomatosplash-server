'use strict';
const mongoose = require('../lib/mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const orderStatusEnum = require('./enums/orderStatus');

const schema = new mongoose.Schema({
    type: { type: String, required: true, enum: orderStatusEnum.enumArray, default: orderStatusEnum.enum.NEW },
    // in case order is already Processed item data (JSON.stringify result) will be stored here
    // - to prevent loosing data after removing some items
    processedOrderItems: [String],
    created: { type: Date, default: Date.now },
    processed: { type: Date, default: Date.now },
    _items: [{ type: Schema.ObjectId, ref: 'Item' }],
});
schema.plugin(mongoosePaginate);

exports.model = mongoose.model('Order', schema);
