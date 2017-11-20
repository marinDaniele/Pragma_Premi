'use strict';
/**
 * @namespace Back-End::App::Controllers
 */
/**
 * @class ErrorHandler
 * @author Stefano Munari  (stefanomunari.sm@gmail.com)
 * @description Data: 19/05/2015 - Requisiti: RFO30.3, RFO30.4, RFD33, RFD35
 * @classdesc Classe middleware per la gestione degli errori.
 * @memberof Back-End::App::Controllers
 */
/*---PRIVATE---*/
var PremiError = require('./errors/PremiError'),
	errorCodes =
	{
		401 : ['Accesso non autorizzato', 'È neccessario effettuare l\'operazione di login nel sistema'],

		11000 : ['Unicità del campo dati richiesto', 'Campo dati già esistente'],

		11001 : ['Unicità del campo dati richiesto', 'Campo dati già esistente']//per retrocompatibilità con versioni vecchie di Mongoose
	};

function buildError(error)
{
	var err= [];
	if(error.code && error.code === parseInt(error.code)) //ricevo un intero
	{
		err.code = error.code;

		if(errorCodes[error.code] === undefined)
		{
			console.error('Riceve un codice d\'errore sconosciuto:', error.code);
			err.title = 'Errore interno al server';
			err.message = 'Errore sconosciuto, qualcosa è andato storto: '+error.code;
		}
		else
		{
			err.title = errorCodes[error.code][0];
			if(!error.message) {
				err.message = errorCodes[error.code][1];
			}
			else
			{
				err.message = error.message;
			}
		}
	}
	else
	{
		err.code = 500;
		err.title = 'Errore sconosciuto';
		for(var errName in error.errors)
		{
			if(error.errors[errName].message)
			{
				err.message = error.errors[errName].message;
			}
		}
	}
	return err;
}
/*---PUBLIC---*/
/**
 * @function handle
 * @description  Metodo che gestisce la costruzione dei messaggi d’errore.
 * @instance
 * @memberof Back-End::App::Controllers.ErrorHandler
 * @param {PremiError} err - Rappresenta l'errore.
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */

exports.handle =
	function (err, req, res, next)
	{
		if(!err)
		{
			return next();
		}
		if(err instanceof PremiError)
		{
			res.status(400).json(err.toJSON());
		}
		else
		{
			console.error(err.stack);
			err= buildError(err);

			res.status(err.code).json({
				title : err.title,
				code : err.code,
				message : err.message
			});
		}
	};
