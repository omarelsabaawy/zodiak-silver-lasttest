const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');

const router = express.Router();

router.get('/admin/add-products', isManager, isAuth, adminController.getAddProducts);

router.post('/admin/add-product', isAuth, adminController.postAddProduct);

router.get('/admin/manage-products', isManager, isAuth, adminController.getManageProducts);

router.get('/admin/edit-product/:productId', isManager, isAuth, adminController.getEditProduct);

router.post('/admin/edit-product', isManager, isAuth, adminController.postEditProduct);

router.post('/admin/delete-product', isManager, isAuth, adminController.postDeleteProduct);

router.get('/admin/all-orders', isManager, isAuth, adminController.getOrders);

router.get('/admin/orders/:orderId', isManager, isAuth, adminController.getOrder);

router.post('/admin/delete-order', isManager, isAuth, adminController.deleteOrder);

module.exports = router;