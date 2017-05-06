const app = require('./server'),
    db = app.get('db'),
    bcrypt = require('bcryptjs'),
    hashPass = (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

module.exports = {
    getProducts: (req, res) => {
        if (req.params.type !== 'allproducts') {
            db.get_product_by_type([req.params.type], (err, product) => {
                !err ? res.status(200).send(product) : res.status(404).send(err);
            })
        } else {
            db.get_products((err, products) => {
                !err ? res.status(200).send(products) : res.status(404).send(err);
            })
        }
    },
    getProductById: (req, res) => {
        if (req.params.id) {
            db.get_product_by_id([req.params.id], (err, product) => {
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
        db.get_shopping_cart([req.params.id],(err, cart) => {
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
    updateQuantity: (req, res) => {
        console.log(req.body);
        db.update_quantity([req.body.id, req.body.quantity], (err, cart) => {
            !err ? res.status(200).send(cart) : res.status(404).send(err);
        })
    },
    subTotal: (req, res) => {

    }
}