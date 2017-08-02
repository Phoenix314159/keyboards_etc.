const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = module.exports = express(),
    config = require('./config.js'),
    log = require('./loggedIn'),
    massive = require('massive'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    cartCtrl = require('./cartCtrl'),
    mainCtrl = require('./mainCtrl'),
    passport = require('./services/passport'),
    corsOptions = {
        origin: 'http://localhost:3085'
    };
app.set('db', massiveInstance);

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true
}));
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/products', mainCtrl.getProducts);
app.get('/api/products/:type', mainCtrl.getProductByType);
app.get('/api/product/:id', mainCtrl.getProductById);
app.get('/api/cart/:id', log.loggedIn, mainCtrl.getCart);
app.post('/api/addtocart', log.loggedIn, mainCtrl.addToCart);
app.get('/api/checklogin', log.loggedIn, (req, res) => {
    res.status(200).send({user:true});
})

let isAuthed = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401)
        .send();
    return next();
};

app.get('/api/me', isAuthed, mainCtrl.me);
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/me',
    failureRedirect: '/#!/login',
    failureFlash: true
}));
app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/api/newuser', mainCtrl.addUser);
app.delete('/api/delete/:id', mainCtrl.deleteFromCart);
app.delete('/api/deleteall', mainCtrl.deleteCart);
app.put('/api/updatequantity', mainCtrl.updateQuantity);
app.post('/api/payments', cartCtrl.processPayment);

app.listen(config.port, () => {
    console.log('listening on port 3085');
})
