const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = module.exports = express(),
    config = require('./config.js'),
    massive = require('massive'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    cookieParser = require('cookie-parser'),
    session = require('express-session');
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.set('db', massiveInstance);
let passport = require('./services/passport');
let corsOptions = {
    origin: 'http://localhost:3060'
}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
const mainCtrl = require('./mainCtrl');
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/products/:type', mainCtrl.getProducts);
app.get('/api/products/:id', mainCtrl.getProductById);
app.get('/api/cart', mainCtrl.getCart);
app.post('/api/addtocart', mainCtrl.addToCart);

app.post('/api/login',passport.authenticate('local', {
        successRedirect: '/api/me',
        failureRedirect: '/#!/login',
        failureFlash: true
    }));
app.get('/api/logout', function(req, res, next) {
    req.logout();
    return res.status(200)
        .send('logged out');
});

// POLICIES //
var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401)
        .send();
    return next();
};
app.get('/api/me', isAuthed, mainCtrl.me);
app.post('/api/newuser', mainCtrl.addUser);
app.delete('/api/delete/:id', mainCtrl.deleteFromCart);
app.put('/api/updatequantity', mainCtrl.updateQuantity);


app.listen(3060, () => {
    console.log('listening on port 3060');
})
