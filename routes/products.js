const mainCtrl = require('../controllers/mainCtrl');

module.exports = app => {

    app.get('/api/products', mainCtrl.getProducts);

    app.get('/api/products/:type', mainCtrl.getProductByType);

    app.get('/api/product/:id', mainCtrl.getProductById);
}
