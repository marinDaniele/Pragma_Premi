/**
 * @class ContextMenuController
 * @classdesc Classe che gestisce il comportamento della directive
 * premiContextMenu.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO4.2, RFO4.2.2, RFO4.2.5,
 * RFO4.2.6, RFO4.2.7
 * @classdesc Classe che gestisce il comportamento della directive
 * premiContextMenu.
 * @memberOf Front-End::Controllers
 */
(function (){
	'use strict';

	angular
		.module('premi.controllers')
		.controller('ContextMenuController', contextMenuController);

	contextMenuController.$inject = ['$scope','$mdDialog'];


	function contextMenuController($scope,$mdDialog){

		/**
		 * @function cancel
		 * @instance
		 * @desc Metodo che nasconde il menù utilizzando il metodo
		 * $mdDialog.cancel.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.ContextMenuController
		 */
		$scope.cancel = function () {
			$mdDialog.cancel();
		};
		/**
		 * @function call
		 * @instance
		 * @desc Metodo che invoca la funzione <tt>callback</tt> presente
		 * all'interno dell'oggetto <tt>fn</tt> ricevuto come parametro.
		 * @param {Object} fn - Parametro che rappresenta una voce del menù, ha
		 * un campo dati callback contenente una funzione da invoca quando
		 * l'utente seleziona la voce del menù.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.ContextMenuController
		 */
		$scope.call = function (fn){
			$mdDialog.hide();
			fn.callback($scope.objectId);
		};
	}
})();
