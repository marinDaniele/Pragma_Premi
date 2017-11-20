'use strict';
/**
 * @class UserController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 06/05/2015 - Requisiti: RFO30.1, RFO30.2, RFO30.3, RFO30.4, RFO32, RFD35
 * @classdesc Classe che raggruppa i vari controllers responsabili delle operazioni riguardo la gestione degli utenti.
 * @memberof Back-End::App::Controllers
 */
/*---PRIVATE---*/
var _ = require('lodash');
/*---PUBLIC---*/
module.exports = _.extend(
	require('./users/AuthenticationController.js'),
	require('./users/AuthorizationController.js')
);
