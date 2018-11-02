// npm packages
const express = require('express');

// app imports
const {
    ordersHandler
} = require('../handlers');

// globals
const router = new express.Router();
const {
    createOrder,
    updateOrder,
    readOrder
} = ordersHandler;


router
    .route('/')
    .post(createOrder);


router
    .route('/:id')
    .patch(updateOrder);


router
    .route('')
    .get(readOrder)

module.exports = router;
