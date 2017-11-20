/**
 * @class premiContextMenu
 * @classdesc Rappresenta un menù contestuale generato in base agli oggetti
 * passati nello scope isolato. Fornisce un
 * pulsante per ogni oggetto ricevuto come parametro, ogni pulsante viene
 * rappresentato con un'icona e con del testo.
 * Al click di un pulsante viene invocata la funzione ad esso associata.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO4.2, RFO4.2.2, RFO4.2.5,
 * RFO4.2.6, RFO4.2.7
 * @memberOf Front-End::Directives
 */
(function (){
	'use strict';
	angular
		.module('premi.directives')
		.directive('premiContextMenu', contextMenuDirective);

	function contextMenuDirective(){
		return {
			restrict:'EA',
			scope:{
				node:'=',
				operations:'=',
				objectId:'@'
			},
			controller:'ContextMenuController',
			templateUrl:'app/directives/contextMenu/contextMenu.html'
		};
	}
})();
