'use strict';
/**
 * @class AuthorizationController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 06/05/2015 - Requisiti: RFO30.2, RFO30.3, RFO30.4, RFO32, RFD35
 * @classdesc Classe middleware che controlla la consistenza della sessione associata all'utente autenticato.
 * @memberof Back-End::App::Controllers::Users
 */
/*---PRIVATE---*/
var _ = require('lodash'),
	mongoose = require('mongoose'),
	PremiError = require('../errors/PremiError'),
	User = mongoose.model('User');
/*---PUBLIC---*/
/*-MIDDLEWARES-*/
/**
 * @function requiresLogin
 * @instance
 * @description Middleware, verifica che l'utente che esegue una richiesta sia effettivamente un utente autenticato.
 * Se ciò è verificato passa il controllo al prossimo concreteHandler, altrimenti attiva la catena di gestione degli
 * errori.
 * @memberof Back-End::App::Controllers::Users.AuthorizationController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo. @param
* {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
* catena di gestione delle richieste.
 * */
exports.requiresLogin = function(req, res, next) {
	var err= [];
	if (!req.isAuthenticated()) {/*isAuthenticated() è un metodo pubblico di passport che ritorna un booleano*/
		err.code= 401;
		return next(err);
	}
	else
		next();
};
