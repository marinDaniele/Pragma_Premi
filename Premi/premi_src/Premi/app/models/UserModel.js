'use strict';
/**
 * @class UserModel
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 05/05/2015 - Requisiti: RFO30.1, RFO30.2, RFO32
 * @classdesc Classe che modella la creazione e la gestione dei dati utente.
 * @memberof Back-End::App::Models
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var validateLocalStrategyProperty = function (property)
{
	return ((!this.updated) || property.length);
};

var validateLocalStrategyPassword = function (password)
{
	return (password && password.length > 6);
};

/**
 * @type {mongoose.Schema}
 * @description Questo campo dati rappresenta lo schema Mongoose dell’utente Premi.
 * @memberof Back-End::App::Models
 * @property {String} username - rappresenta l'email con cui viene identificato l'utente all'interno dell'applicazione.
 * @property {String} password - rappresenta la password associata all'utente.
 */
var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		dropDups: true,
		validate: [validateLocalStrategyProperty, 'Fornire un indirizzo email valido'],
		match: [/.+\@.+\..+/, 'Fornire un indirizzo email valido']
	},
	password: {
		type: String,
		required: true,
		validate: [validateLocalStrategyPassword, 'La password deve contenere almeno 7 caratteri']
	},
	salt: {
		type: String
	},
	updated: {
		type: Date
	}
});

UserSchema.pre('save', function (next)
{
	if (this.password && this.password.length > 6)
	{
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

/**
 * @function hashPassword
 * @instance
 * @private
 * @description Effettua l'hashing della stringa password se non è già stata criptata tramite campo salt.
 * @memberof Back-End::App::Models.UserModel
 * @param {String} password - Rappresenta la password dell'utente.
 * @returns {String} password - Rappresenta la password criptata.
 */
UserSchema.methods.hashPassword = function (password)
{
	if(this.salt && password)
	{
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	}
	else
	{
		return password;
	}
};

UserSchema.methods.authenticate = function (password)
{
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
