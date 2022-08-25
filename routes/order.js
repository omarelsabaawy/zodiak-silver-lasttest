const path = require('path');

const express = require('express');

const orderController = require('../controllers/oder');
const isAuth = require('../middleware/is-auth');
const isCartEmpty = require('../middleware/is-cart-empty');

const router = express.Router();

router.get('/checkout', isAuth, orderController.getCheckout);

router.post('/create-order', isAuth, orderController.createOrder);

module.exports = router;