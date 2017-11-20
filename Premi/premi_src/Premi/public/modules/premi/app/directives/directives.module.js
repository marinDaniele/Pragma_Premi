/**
 * @namespace Front-End::Directives
 * @classdesc Package contenente le directives che compongno le views.
 * @author: gmanzoli
 * @description Data: 2015-05-05 Requisiti: -
 *
 */
(function () {
	'use strict';
	angular
		.module('premi.directives', [
			'ngMaterial',
			'premi.services',
			'premi.controllers'
		]);
})();
