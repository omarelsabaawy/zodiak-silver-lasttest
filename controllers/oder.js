const Order = require('../models/order');
const product = require('../models/product');

exports.getCheckout = (req, res, next) => {
    let totalPrice = 0;
    req.user
        .populate('cart.items.productId')
        .then(user => {
            for (item of user.cart.items) {
                totalPrice += item.productId.price * item.quantity;
            }
            return res.render('orders/checkout', {
                pageTitle: 'checkout',
                path: '/checkout',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: user.cart.items,
                user: req.user,
                totalPrice: totalPrice
            });
        })
        .catch(err => { console.log(err); });
};

exports.createOrder = (req, res, next) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const number = req.body.number;
    const email = req.body.email;
    const address = req.body.address;
    const town = req.body.town;
    const zipcode = req.body.zipcode;
    const otherInfo = req.body.otherInfo;


    let totalPrice = 0;
    let shipping = 0;

    const towns = new Map([
        ['cairo', true],
        ['giza', true],
    ]);
    if (towns.has(town.toLowerCase())) {
        shipping = 40;
        totalPrice += shipping;
    } else {
        shipping = 60;
        totalPrice += shipping;
    }
    req.user
        .populate('cart.items.productId')
        .then(user => {
            let products = user.cart.items;
            for (item of user.cart.items) {
                totalPrice += item.productId.price * item.quantity;
                product
                    .findById(item.productId)
                    .then(product => {
                        product.title = product.title;
                        product.price = product.price;
                        product.description = product.description;
                        product.imageUrl = product.imageUrl;
                        product.category = product.category;
                        product.quantity = product.quantity - item.quantity;
                        product.category = product.category;
                        product.gender = product.gender;
                        return product.save();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            const order = new Order({
                fname: fname,
                lname: lname,
                number: number,
                email: email,
                address: address,
                town: town,
                zipcode: zipcode,
                otherInfo: otherInfo,
                totalPrice: totalPrice,
                products: products
            });
            order
                .save()
                .then(result => {
                    req.user
                        .clearCart().then(() => {
                            return res.render('orders/confirmation', {
                                pageTitle: 'Order Placed Successfully',
                                header: 'Order placed Successfully ',
                                message: 'Thank you. Your order has been received. ',
                                path: '/confirmation',
                                isAuth: req.session.isLoggedIn,
                                isManager: req.session.isManager,
                                products: products,
                                user: req.user,
                                totalPrice: totalPrice,
                                shipping: shipping,
                                orderResult: result
                            });
                        }).catch(err => { console.log(err); });
                })
                .catch(err => { console.log(err); });
        })
        .catch(err => { console.log(err); });
};