'use strict';
/**
 * @class NotFoundHandler
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 18/05/2015 - Requisiti: RFD35
 * @classdesc Classe che si occupa della gestione dell'errore di pagina non trovata.
 * @memberof Back-End::App::Controllers
 */
/*---PUBLIC---*/
/**
 * @function handle
 * @instance
 * @description Metodo che gestisce la costruzione del messaggio d’errore.
 * @memberof Back-End::App::Controllers.NotFoundHandler
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 */

exports.handle =
    function (req,res)
    {
        var message= 'impossibile trovare risorsa '+req.originalUrl;
        res.status(404).json({
            title: 'Pagina non trovata',
            code: 404,
            message: message
        });
    };
