"use strict";
const Item = require("../models/UnitOfWork").Item;

module.exports = {
	"get": function () {
		return Item.find();
	},
	create: function (newItemProperties) {
		let item = new Item({
			name: newItemProperties.name,
			description: newItemProperties.description || "",
			pictureUrl: newItemProperties.pictureUrl
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