'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config');
	
/**
 * Module init function.
 */
module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-salt -password', function(err, user) {
			done(err, user);
		});
	});
/*
* 	Qui istanzia e setta tutti i conretestrategy per la sessione ma non mi interessano tutti dovrei chiamare solo localstrategy*/
	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/local.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
