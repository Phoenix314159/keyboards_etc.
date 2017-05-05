const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    app = require('./../server'),
    db = app.get('db');

// VERIFY PASSWORD //
function verifyPassword(submitedPass, userPass) {
    return bcrypt.compareSync(submitedPass, userPass);
}

// RUN WHEN LOGGING IN //
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    username = username.toLowerCase();

    db.read_username([username], function (err, user) {
        user = user[0];

        // If err, return err
        if (err) done(err);

        // If no user if found, return false
        if (!user) return done(null, false);

        // If user is found, check to see if passwords match. If so, return user
        if (verifyPassword(password, user.password)) {
            delete user.password;
            return done(null, user);
        }

        // If no match, return false
        return done(null, false);
    });
}));

// Puts the user on the session
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;
