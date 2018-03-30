'use strict';
const Order = require('../models/UnitOfWork').Order;
const orderStatusEnum = require('../models/enums/orderStatus').enum;

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
        return Order.findById(id).populate({ path: 'items', select: '-_id' })
            .then((order) => {
                order.processedOrderItems = order.items.map((item) => {
                    return JSON.stringify(item);
                });
                order.type = orderStatusEnum.PROCESSED;
                order.processed = Date.now();
                order._items = [];
                return order.save();
            })
    },
    'delete': function (id) {
        return Order.findByIdAndRemove(id);
    }
};
