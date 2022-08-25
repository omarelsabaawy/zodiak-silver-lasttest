const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI ='mongodb+srv://DevSolutions:8ttM5kVi6BqOe2ol@cluster0.8t7rw.mongodb.net/zodiak-silver-test'
//       'mongodb+srv://Zodiak-silver-main:Zodiak-silver-main1234@cluster0.jbqvwty.mongodb.net/Zodiak-silver-main';
//     'mongodb+srv://DevSolutions:8ttM5kVi6BqOe2ol@cluster0.8t7rw.mongodb.net/zodiak-silver-test';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    return res.render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuth: req.session.isLoggedIn,
        isManager: req.session.isManager,
        user: req.user
    });
});

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('connected');
        app.listen(process.env.PORT || 8000);
    })
    .catch(err => {
        console.log(err);
    });
