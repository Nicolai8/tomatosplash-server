"use strict";
const Item = require("../models/UnitOfWork").Item;

module.exports = {
    "get": function (page, limit) {
        return Item.paginate(
            {},
            {
                sort: { created: -1 },
                page: page,
                limit: limit,
            }
        );
    },
    create: function (newItemProperties) {
        let item = new Item({
            name: newItemProperties.name,
            description: newItemProperties.description || "",
            type: newItemProperties.type || "",
            price: newItemProperties.price
        });
        return item.save();
    },
    update: function (id, propertiesToUpdate) {
        return Item.findByIdAndUpdate(id, propertiesToUpdate);
    },
    "delete": function (id) {
        return Item.findByIdAndRemove(id);
    }
};