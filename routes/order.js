'use strict';
const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const checkAuth = require('../middleware/checkAuth');

router.get('/', function (req, res, next) {
    orderService.get(+req.query.page, +req.query.limit)
        .then((result) => {
            res.json(result);
        })
        .catch(next);
});

//save
router.put('/', checkAuth, function (req, res, next) {
    if (!req.body.name) return next(new HttpError(400));

    orderService.create(req.body)
        .then((item) => {
            res.json(item);
        })
        .catch(next);
});

//remove
router.delete('/:id', checkAuth, function (req, res, next) {
    orderService.delete(req.params.id)
        .then(() => {
            res.json({});
        })
        .catch(next);
});

router.post('/proceed/:id', checkAuth, function (req, res, next) {
    orderService.proceedOrder(req.params.id)
        .then((item) => {
            res.json(item);
        })
        .catch(next);
});

//edit
router.post('/:id', checkAuth, function (req, res, next) {
    orderService.update(req.params.id, {
        type: req.body.type,
        _items: req.body._items
    })
    .then((item) => {
        res.json(item);
    })
    .catch(next);
});

module.exports = router;