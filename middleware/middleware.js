const session = require('express-session'),
    config = require('../config/config'),
    bodyParser = require('body-parser');

module.exports = app => {

    app.use(session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        rolling: true
    }))

    app.use(bodyParser.json());
}
