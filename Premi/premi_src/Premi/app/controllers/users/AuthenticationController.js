'use strict';
/**
 * @namespace Back-End::App::Controllers::Users
 */

/**
 * @class AuthenticationController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 06/05/2015 - Requisiti: RFO30.1, RFO30.2, RFO30.3, RFO30.4, RFO32, RFD35
 * @classdesc Classe che si occupa della registrazione e dell’autenticazione dell’utente nel sistema.
 * @memberof Back-End::App::Controllers::Users
 */
/*---PRIVATE---*/
var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	PremiError = require('../errors/PremiError'),
	User = mongoose.model('User');
/*---PUBLIC---*/
/**
 * @function signup
 * @description Effettua la registrazione dell’utente nel sistema.
 * @instance
 * @memberof Back-End::App::Controllers::Users.AuthenticationController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.signup = function (req, res, next)
{
	var user = new User(req.body);

	user.save(function (err)
	{
		if(err) {
			return next(err);
		}
		else
		{
			req.login(user,
				function (err)
				{
					if(err)
					{
						err.code = 401;
						next(err);
					}
					else
					{
						res.json({ status : 'ok'});
					}
				});
		}
	});
};

/**
 * @function signin
 * @description Esegue l'autenticazione dell'utente.
 * @instance
 * @memberof Back-End::App::Controllers::Users.AuthenticationController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */
exports.signin = function (req, res, next)
{
	passport.authenticate('local', function (err, user, info)
	{
		if (err || !user)
		{
			if(!err)
				err= [];
			err.code = 401;
			err.message= info.message;
			next(err);
		}
		else
		{
			req.login(user, function (err)
			{
				if (err)
				{
					err.code = 401;
					next(err);
				}
				else
				{
					res.json({ status : 'ok'});
				}
			});
		}
	})(req, res, next);
};

/**
 * @function signout
 * @instance
 * @description Esegue il logout dell'utente dal sistema.
 * @memberof Back-End::App::Controllers::Users.AuthenticationController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 */
exports.signout = function (req, res)
{
	req.logout();
	res.json({ status: 'ok'});
};
