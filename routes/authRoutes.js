const passport = require('passport');

module.exports = app => {

    app.get('/', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.json({
                status: 'session cookie set'
            });
        } else {
            res.cookie('token', '')
            res.json({
                status: 'session cookie not set'
            });
        }
    });

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {failureRedirect:'/'}),
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