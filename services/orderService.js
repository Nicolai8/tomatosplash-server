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
            _items: newItemProperties._items,
        });
        return order.save();
    },
    update: function (id, propertiesToUpdate) {
        return Order.findByIdAndUpdate(id, propertiesToUpdate).then(() => Order.findById(id));
    },
    proceedOrder: function (id) {
        return Order.findById(id).populate({ path: '_items', select: '-_id' })
            .then((order) => {
                order.processedOrderItems = order._items.map((item) => {
                    return JSON.stringify(item);
                });
                order.type = orderStatusEnum.PROCESSED;
                order._items = [];
                return order.save();
            })
    },
    'delete': function (id) {
        return Order.findByIdAndRemove(id);
    }
};