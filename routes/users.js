const mainCtrl = require('../controllers/mainCtrl'),
    log = require('../services/loggedIn'),
    passport = require('../services/passport'),
    isAuthed = require('../services/auth');

module.exports = app => {

    app.use(passport.initialize());

    app.use(passport.session());

    app.get('/api/me', isAuthed.auth, mainCtrl.me);

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/api/me',
        failureRedirect: '/#!/login',
        failureFlash: true
    }));

    app.get('/api/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/checklogin', log.loggedIn, (req, res) => {
        res.status(200).send({user: true});
    })

    app.post('/api/newuser', mainCtrl.addUser);
}
