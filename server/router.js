const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// By default passport will create a cookie session so set that to false
// Helpers requireAuth and requireSignin
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}

// Any request that hits the / will have to authenticate via the requireAuth and then be allowed to progress
