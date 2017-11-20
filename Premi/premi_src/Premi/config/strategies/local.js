'use strict';
/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');
/*By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
  */
module.exports = function() {
	// Use local strategy: 	Strategies, and their configuration, are supplied via the use() function.
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'email non trovata o password non valida'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'email non trovata o password non valida'
					});
				}

				return done(null, user);/*If the credentials are valid, the verify callback invokes done
				to supply Passport with the user that authenticated.*/
			});
		}
	));
};
