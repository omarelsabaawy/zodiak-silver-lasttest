const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/shop', shopController.getShop);

router.get('/product', shopController.getProduct);

router.get('/products/:productId', shopController.getProduct);

router.get('/shop/Sort-by-price=ASCE', shopController.getShopPriceSortedAsce);

router.get('/shop/Sort-by-price=DESC', shopController.getShopPriceSortedDesc);

router.get('/shop/Sort-by-Title=A-Z', shopController.getShopTitleAtoZ);

router.get('/shop/Sort-by-gender=Men', shopController.getMale);

router.get('/shop/Sort-by-gender=Women', shopController.getFemale);

router.get('/shop/Filter-by-Category=Necklaces', shopController.getNecklaces);

router.get('/shop/Filter-by-Category=Bracelet', shopController.getBracelet);

router.get('/shop/Filter-by-Category=Rings', shopController.getRings);

router.get('/contactUs', shopController.getContact);

router.post('/subscription', shopController.subscription);

router.get('/terms&conditions', shopController.getTC);

router.get('/aboutUs', shopController.getAbout);

router.post('/search', shopController.search);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/clear-cart', isAuth, shopController.postClearCart);

module.exports = router;