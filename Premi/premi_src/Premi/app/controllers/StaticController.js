'use strict';
/**
 * @class StaticController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 16/05/2015 - Requisiti: RFD26, RFD35
 * @classdesc Classe che gestisce le operazioni riguardanti la visualizzazione di pagine HTML statiche.
 * @memberof Back-End::App::Controllers
 */
/*---PRIVATE---*/
var path = require('path');
/*---PUBLIC---*/
/**
 * @function getUserManual
 * @instance
 * @description Si occupa di restituire, attraverso il parametro res, la pagina del manuale utente richiesta dal client.
 * @memberof Back-End::App::Controllers.StaticController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 */
exports.getUserManual = function (req,res)
{
    res.sendFile(path.resolve('app/views/userManual.html'));
};
