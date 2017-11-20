'use strict';
/**
 * @class StaticRouter
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 15/05/2015 - Requisiti: RFD26, RFD35
 * @classdesc Classe che gestisce le richieste relative alle pagine statiche della componente back-end.
 * @memberof Back-End::App::Routers
 */
/*---PUBLIC---*/
/**
 * @function router
 * @instance
 * @description Contiene diverse route che vengono configurate all'avvio del server.
 * Quest'ultime ricevono le richieste del client e passano il controllo al ConcreteHandler successivo.
 * @memberof Back-End::App::Routers.UserRouter
 * @param {Server} app - Rappresenta l'istanza del server su cui configurare i route che mappano i controllers specifici.
 */
module.exports = function (app)
{

    var statics= require('../controllers/StaticController.js');

    //-> StaticController
    app.route('/statics/userManual').get(statics.getUserManual);
};

