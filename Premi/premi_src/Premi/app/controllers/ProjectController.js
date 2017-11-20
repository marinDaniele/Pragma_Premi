'use strict';
/**
 * @class ProjectController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 12/05/2015 - Requisiti: RFO1, RFO1.1, RFO4, RFD4.1, RFO4.2, RFO4.2.2, RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.7, RFD4.2.3.8,
 * RFD4.2.3.8.1, RFD4.2.3.8.2, RFO4.2.3.12, RFO4.2.3.13, RFO4.2.5, RFO4.2.6, RFO4.2.7, RFD4.3, RFD4.3.1, RFD4.3.2,
 * RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.5, RFF4.6, RFF4.6.1, RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFO7, RFD7.1, RFO11, RFO11.2,
 * RFD22, RFO10, RFD33, RFO11.3, RFD4.2.3.15, RFD4.2.3.16, RFD4.4.5, RFD35
 * @classdesc Classe che raggruppa i vari controllers responsabili delle operazioni riguardanti la mappa mentale.
 * @memberof Back-End::App::Controllers
 */
/*---PRIVATE---*/
var _ = require('lodash');
/*---PUBLIC---*/
module.exports = _.extend(
    require('./projects/NodeController.js'),
    require('./projects/ProjectManagementController.js'),
    require('./projects/PathController.js')
);
