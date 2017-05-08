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
    session = require('express-session');
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.set('db', massiveInstance);
let passport = require('./services/passport');
let corsOptions = {
    origin: 'http://localhost:3065'
}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
const mainCtrl = require('./mainCtrl');
app.use(passport.initialize());
app.use(passport.session());
// app.use(log.loggedIn);

app.get('/api/products', mainCtrl.getProducts);
app.get('/api/products/:type', mainCtrl.getProductByType);
app.get('/api/product/:id', mainCtrl.getProductById);
app.get('/api/cart/:id', log.loggedIn, mainCtrl.getCart);
app.post('/api/addtocart', log.loggedIn, mainCtrl.addToCart);
app.get('/api/checklogin', log.loggedIn, (req, res) => {
    res.status(200).send({user:true});
})
// var supertest = require('supertest-as-promised');
// var request = supertest('https://ngcourse.herokuapp.com');
// var assert = require('chai').assert;
//
// describe('Backend API', function() {
//     it ('should return the list of users', function() {
//         return request.get('/api/v1/users')
//             .expect(200);
//     });
// });
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/me',
    failureRedirect: '/#!/login',
    failureFlash: true
}));
app.get('/api/logout', function (req, res, next) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
});


let isAuthed = function (req, res, next) {
    if (!req.isAuthenticated()) return res.status(401)
        .send();
    return next();
};
app.get('/api/me', isAuthed, mainCtrl.me);
app.post('/api/newuser', mainCtrl.addUser);
app.delete('/api/delete/:id', mainCtrl.deleteFromCart);
app.delete('/api/deleteall', mainCtrl.deleteCart);
app.put('/api/updatequantity', mainCtrl.updateQuantity);


app.listen(3065, () => {
    console.log('listening on port 3065');
})
