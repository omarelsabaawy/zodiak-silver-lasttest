const Product = require('../models/product');
const Order = require('../models/order');

exports.getManageProducts = (req, res, next) => {
    Product
        .find()
        .then(products => {
            return res.render('admin/manage-product', {
                pageTitle: 'Manage products',
                path: '/manage-products',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                user: req.user,
                products: products
            });
        })
        .catch(err => { console.log(err); });
};

exports.getAddProducts = (req, res, next) => {
    return res.render('admin/edit-product', {
        pageTitle: 'Add new product',
        path: '/add-products',
        isAuth: req.session.isLoggedIn,
        user: req.user,
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const gender = req.body.gender;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        quantity: quantity,
        category: category,
        gender: gender,
        userId: req.session.user
    });
    product
        .save()
        .then(result => {
            res.redirect('/admin/manage-products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    Product
        .find()
        .then(products => {
            const editMode = req.query.edit;
            if (!editMode) {
                return res.redirect('/');
            }
            const prodId = req.params.productId;
            Product.findById(prodId)
                .then(product => {
                    if (!product) {
                        return res.redirect('/');
                    }
                    res.render('admin/edit-product', {
                        products: products,
                        pageTitle: 'Edit Product',
                        path: '/edit-product',
                        editing: editMode,
                        product: product,
                        isAuth: req.session.isLoggedIn,
                        isManager: req.session.isManager,
                        user: req.user
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => { console.log(err); })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedQuantity = req.body.quantity;
    const updatedCat = req.body.category;
    const updatedGender = req.body.gender;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            product.category = updatedCat;
            product.quantity = updatedQuantity;
            product.category = updatedCat;
            product.gender = updatedGender;
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/manage-products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            res.redirect('/admin/manage-products');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order
        .find()
        .then(orders => {
            res.render('admin/viewOrders', {
                pageTitle: 'Orders',
                path: '/admin/all-orders',
                orders: orders,
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                user: req.user
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteOrder = (req, res, next) => {
    const orderId = req.body.orderId;
    Order.findByIdAndRemove(orderId)
        .then(() => {
            res.redirect('/admin/all-orders');
        })
        .catch(err => console.log(err));
};

exports.getOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    let shipping = 0;
    const towns = new Map([
        ['cairo', true],
        ['giza', true],
    ]);
    Order
        .findById(orderId)
        .then(order => {
            if (towns.has((order.town).toLowerCase())) {
                shipping += 40;
            } else {
                shipping += 60;
            }
            return res.render('orders/order', {
                pageTitle: 'Order number' + orderId,
                header: 'Order number' + orderId,
                message: 'This order was placed.',
                path: '/order',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: order.products,
                user: req.user,
                totalPrice: order.totalPrice,
                shipping: shipping,
                orderResult: order
            });
        })
        .catch(err => {
            console.log(err);
        });
};