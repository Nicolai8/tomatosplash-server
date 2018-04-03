'use strict';
const Order = require('../models/UnitOfWork').Order;
const orderStatusEnum = require('../models/enums/orderStatus').enum;
const moment = require('moment');

module.exports = {
    'get': function (page, limit) {
        return Order.paginate(
            {},
            {
                sort: { created: -1 },
                page: page,
                limit: limit,
            }
        );
    },
    create: function (newItemProperties) {
        let order = new Order({
            type: newItemProperties.type,
            processedOrderItems: [],
            items: newItemProperties.items,
        });
        return order.save();
    },
    update: function (id, propertiesToUpdate) {
        propertiesToUpdate.updated = Date.now();
        return Order.findByIdAndUpdate(id, propertiesToUpdate).then(() => Order.findById(id));
    },
    proceedOrder: function (id) {
        return Order.findById(id).populate({ path: 'items._item', select: '-__v -created' })
            .then((order) => {
                order.processedOrderItems = order.items.map((item) => {
                    return JSON.stringify(item);
                });
                order.type = orderStatusEnum.PROCESSED;
                order.processed = Date.now();
                order.items = [];
                return order.save();
            })
    },
    getDailyReport: function (date) {
        date = moment(date).startOf('day');
        return Order.find({
            processed: {
                $gte: date.toDate(),
                $lt: moment(date).add(1, 'days').toDate(),
            },
        });
    },
    'delete': function (id) {
        return Order.findByIdAndRemove(id);
    }
};
