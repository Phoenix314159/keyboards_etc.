const mainCtrl = require('../controllers/mainCtrl'),
    cartCtrl = require('../controllers/cartCtrl'),
    log = require('../services/loggedIn');

module.exports = app => {

    app.get('/api/cart/:id', log.loggedIn, mainCtrl.getCart);

    app.delete('/api/delete/:id', mainCtrl.deleteFromCart);

    app.delete('/api/deleteall', mainCtrl.deleteCart);

    app.put('/api/updatequantity', mainCtrl.updateQuantity);

    app.post('/api/payments', cartCtrl.processPayment);

    app.post('/api/addtocart', log.loggedIn, mainCtrl.addToCart);
}