/**
 * @class NodeController
 * @classdesc Classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la modifica dei nodi presenti in un progetto.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFO4.2, RFO4.2.3, RFO4.2.3.4,
 * RFO4.2.3.5, RFO4.2.3.12, RFO4.2.3.13, RFO4.2.5, RFO4.2.6,
 * RFO4.2.7, RFD22, RFD4.2.3.15, RFD4.2.3.16, RFD35
 * @memberOf Front-End::Controllers
 */

(function (){
	'use strict';

	angular
		.module('premi.controllers')
		.controller('NodeController', nodeController);

	nodeController.$inject = ['$scope','projectService'];


	function nodeController($scope, projectService){
		//Recupero lo stile del progetto da usare per il frame del nodo
		$scope.classString = projectService.getStyle();
	}


})();
