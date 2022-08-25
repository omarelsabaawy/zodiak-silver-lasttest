const bcrypt = require('bcryptjs');

const User = require('../models/user');

const passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(1) // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);


exports.getRegister = (req, res, next) => {
    res.render('auth/Register', {
        pageTitle: 'Registration',
        path: '/Registration',
        isAuth: false,
        isManager: false,
        user: null,
        emailExist: false,
        weakPassword: false,
    });
};

exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        pageTitle: 'Login page',
        path: '/login',
        isAuth: false,
        isManager: false,
        user: null,
        emailExist: false,
        wrongPassword: false
    });
};


exports.postRegister = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const isManager = false;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.render('auth/Register', {
                    pageTitle: 'Registration',
                    path: '/Registration',
                    isAuth: false,
                    isManager: false,
                    user: null,
                    emailExist: true,
                });
            }
            if (schema.validate(password)) {
                return bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            username: username,
                            email: email,
                            password: hashedPassword,
                            isManager: isManager,
                            cart: { items: [], total_cart_price: 0 }
                        });
                        return user.save();

                    })
                    .then(result => {
                        res.redirect('/login');
                    });
            } else {
                return res.render('auth/Register', {
                    pageTitle: 'Registration',
                    path: '/Registration',
                    isAuth: false,
                    isManager: false,
                    user: null,
                    emailExist: false,
                    weakPassword: true,
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.render('auth/login', {
                    pageTitle: 'Login page',
                    path: '/login',
                    isAuth: false,
                    isManager: false,
                    user: null,
                    emailExist: true,
                    wrongPassword: false
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.render('auth/login', {
                        pageTitle: 'Login page',
                        path: '/login',
                        isAuth: false,
                        isManager: false,
                        user: null,
                        emailExist: false,
                        wrongPassword: true
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};