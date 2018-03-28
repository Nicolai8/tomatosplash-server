"use strict";
const Item = require("../models/UnitOfWork").Item;

module.exports = {
    "get": function () {
        return Item.find().sort({ created: -1 });
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
        return Item.findByIdAndUpdate(id, propertiesToUpdate).then(() => Item.findById(id));
    },
    "delete": function (id) {
        return Item.findByIdAndRemove(id);
    }
};
