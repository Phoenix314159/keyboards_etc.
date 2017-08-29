const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    app = require('../server'),
    db = app.get('db');

function verifyPassword(submitedPass, userPass) {
    return bcrypt.compareSync(submitedPass, userPass);
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    username = username.toLowerCase();
    db.read_username([username], (err, user) => {
        user = user[0];
        if (err) done(err);
        if (!user) return done(null, false);
        if (verifyPassword(password, user.password)) {
            delete user.password;
            return done(null, user);
        }
        return done(null, false);
    });
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
