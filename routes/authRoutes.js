const passport = require('passport');

module.exports = app => {

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {failureRedirect:'/login'}),
        (req, res) => {
            req.session.token = req.user.token;
            res.redirect('/');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
    });

};