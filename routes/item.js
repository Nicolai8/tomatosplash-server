"use strict";
const express = require("express");
const router = express.Router();
const itemService = require("../services/itemService");
const checkAuth = require("../middleware/checkAuth");

router.get("/", function (req, res, next) {
    itemService.get(+req.query.page, +req.query.limit)
        .then((result) => {
            res.json(result);
        })
        .catch(next);
});

//save
router.put("/", checkAuth, function (req, res, next) {
    if (!req.body.name) return next(new HttpError(400));

    itemService.create(req.body)
        .then((item) => {
            res.json(item);
        })
        .catch(next);
});

//remove
router.delete("/:id", checkAuth, function (req, res, next) {
    itemService.delete(req.params.id)
        .then(() => {
            res.json({});
        })
        .catch(next);
});

//edit
router.post("/:id", checkAuth, function (req, res, next) {
    itemService.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        price: req.body.price
    })
    .then((item) => {
        res.json(item);
    })
    .catch(next);
});

module.exports = router;