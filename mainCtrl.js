const app = require('./server'),
    db = app.get('db'),
    bcrypt = require('bcryptjs'),
    hashPass = (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    };
// stripe = require("stripe")('pk_test_YCIPURTU6ePqrjERaHH1AHMN');
// token = request.body.stripeToken;
module.exports = {


    getProducts: (req, res) => {

        db.get_products((err, products) => {
            !err ? res.status(200).send(products) : res.status(404).send(err);
        })
    },
    getProductById: (req, res) => {
        if (req.params.id) {
            db.get_product_by_id([req.params.id], (err, product) => {
                !err ? res.status(200).send(product) : res.status(404).send(err);
            })
        }
    },
    getProductByType: (req, res) => {
        if (req.params.type === 'allproducts') {
            db.get_products((err, products) => {
                !err ? res.status(200).send(products) : res.status(404).send(err);
            })
        } else if (req.query.id) {
            db.get_product_by_id([req.query.id], (err, product) => {
                !err ? res.status(200).send(product) : res.status(404).send(err);
            })
        }
        else {
            db.get_product_by_type([req.params.type], (err, product) => {
                !err ? res.status(200).send(product) : res.status(404).send(err);
            })
        }
    },
    me: (req, res) => {
        return res.status(200)
            .send(req.user);
    },
    addUser: (req, res) => {
        req.body.password = hashPass(req.body.password);
        req.body.email = req.body.email.toLowerCase();
        db.new_user([req.body.firstname, req.body.lastname, req.body.email, req.body.username, req.body.password], (err, user) => {
            !err ? res.status(200).send(user) : res.status(404).send(err);
        })
    },
    getCart: (req, res) => {
        db.get_shopping_cart([req.params.id], (err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })
    },
    addToCart: (req, res) => {
        db.add_to_cart([req.body.customerId, req.body.productId, req.body.quantity], (err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })

    },
    deleteFromCart: (req, res) => {
        db.delete_from_cart([req.params.id], (err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })

    },
    deleteCart: (req, res) => {
        db.delete_all_cart((err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })
    },
    updateQuantity: (req, res) => {
        db.update_quantity([req.body.id, req.body.quantity], (err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })
    },
    updateTotal: (req, res) => {
        db.update_total([req.body.productId], (err, total) => {
            console.log('yo man dude');
            !err ? res.status(200).send(total) : res.status(404).send(err);
        })
    },
    getTotal: (req, res) => {
        db.get_total((err, total) => {
            !err ? res.status(200).send(total) : res.status(404).send(err);
        })
    },

}