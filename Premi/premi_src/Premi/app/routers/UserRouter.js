'use strict';
/**
 * @class UserRouter
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 16/05/2015 - Requisiti: RFO30.1, RFO30.2, RFO30.3, RFO30.4, RFO32, RFD35
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
	var users = require('../controllers/UserController');

	//->AuthenticationController
	app.route('/signup').post(users.signup);
	app.route('/login').post(users.signin);
	app.route('/logout').get(users.requiresLogin,users.signout);
};
