const Product = require('../models/product');
const Subscription = require('../models/subscription');

exports.getIndex = (req, res, next) => {
    Product
        .find()
        .then(products => {
            return res.render('shop/index', {
                pageTitle: 'Home Page',
                path: '/',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => { console.log(err); });
};

exports.getShop = (req, res, next) => {
    Product
        .find()
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Shop Now',
                header: 'Shop now',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => { console.log(err); });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
        .findById(prodId)
        .then(product => {
            return res.render('shop/product', {
                pageTitle: product.title,
                path: '/product',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                product: product,
                user: req.user
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getContact = (req, res, next) => {
    return res.render('shop/contact', {
        pageTitle: 'Contact Us now',
        path: '/contactUs',
        isAuth: req.session.isLoggedIn,
        isManager: req.session.isManager,
        user: req.user
    });
};

exports.getTC = (req, res, next) => {
    return res.render('terms-conditions', {
        pageTitle: 'Terms & Conditions',
        path: '/terms&conditions',
        isAuth: req.session.isLoggedIn,
        isManager: req.session.isManager,
        user: req.user
    });
}

exports.getAbout = (req, res, next) => {
    return res.render('shop/about', {
        pageTitle: 'About Us',
        path: '/aboutUs',
        isAuth: req.session.isLoggedIn,
        isManager: req.session.isManager,
        user: req.user
    });
};

exports.search = (req, res, next) => {
    var regex = new RegExp(req.body.search, 'i');
    Product
        .find({ "title": regex })
        .then(prods => {
            res.render('shop/shop', {
                pageTitle: 'Searching for ' + req.body.search,
                header: 'Searching for ' + req.body.search,
                path: '/search',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: prods,
                user: req.user
            });
        })
        .catch(err => { console.log(err); });
};

exports.getMale = (req, res, next) => {
    Product
        .find({ gender: 'Male' } || { gender: 'male' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Sort Products By gender',
                header: 'Men Products',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });

        })
        .catch(err => console.log(err));
};

exports.getFemale = (req, res, next) => {
    Product
        .find({ gender: 'Female' } || { gender: 'female' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Sort Products By gender',
                header: 'Women Products',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });

        })
        .catch(err => console.log(err));
};

exports.getNecklaces = (req, res, next) => {
    Product
        .find({ category: 'Necklaces' } || { category: 'necklaces' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Get All Necklaces',
                header: 'Filtering by Necklaces',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => console.log(err));
};

exports.getBracelet = (req, res, next) => {
    Product
        .find({ category: 'Bracelet' } || { category: 'bracelet' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Get All Bracelets',
                header: 'Filtering by Bracelets',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => console.log(err));
};

exports.getRings = (req, res, next) => {
    Product
        .find({ category: 'Ring' } || { category: 'ring' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Get All Rings',
                header: 'Filtering by Rings',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => console.log(err));
};


exports.getShopPriceSortedAsce = (req, res, next) => {
    Product
        .find()
        .sort({ price: 'ascending' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Sort Products Ascendingly',
                header: 'Products sorted Ascendingly',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });

        })
        .catch(err => console.log(err));
};

exports.getShopPriceSortedDesc = (req, res, next) => {
    Product
        .find()
        .sort({ price: 'descending' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Sort Products Descendingly',
                header: 'Products sorted Descendingly',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => console.log(err));
};

exports.getShopTitleAtoZ = (req, res, next) => {
    Product
        .find()
        .sort({ title: 'ascending' })
        .then(products => {
            return res.render('shop/shop', {
                pageTitle: 'Sort Products from A to Z',
                header: 'Products sorted from A to Z',
                path: '/shop',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                products: products,
                user: req.user
            });
        })
        .catch(err => console.log(err));
};


exports.getCart = (req, res, next) => {
    let totalPrice = 0;
    req.user
        .populate('cart.items.productId')
        .then(user => {
            for (item of user.cart.items) {
                totalPrice += item.productId.price * item.quantity;
            }
            return res.render('shop/cart', {
                pageTitle: user.username + "'s  cart",
                path: '/cart',
                isAuth: req.session.isLoggedIn,
                isManager: req.session.isManager,
                user: req.user,
                products: user.cart.items,
                totalPrice: totalPrice
            });
        })
        .catch(err => { console.log(err); });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const quantity = req.body.quantity;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product, quantity);
        })
        .then(result => {

            res.redirect('/cart');
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postClearCart = (req, res, next) => {
    let totalPrice = 0;
    req.user
        .clearCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: req.user.username + "'s Cart",
                isAuth: req.session.isLoggedIn,
                user: req.user,
                products: products,
                totalPrice: totalPrice
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.subscription = (req, res, next) => {
    const email = req.body.email;
    Subscription
        .findOne({ email: email })
        .then(subscriber => {
            if (!subscriber) {
                const subscript = new Subscription({
                    email: email
                });
                subscript.save();
                return res.redirect('..');
            }
        })
        .catch(err => {
            console.log(err);
        });
}