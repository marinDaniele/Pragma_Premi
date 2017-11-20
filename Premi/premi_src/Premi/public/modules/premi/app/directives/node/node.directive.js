/**
 * @class premiNode
 * @classdesc Rappresenta il componente grafico che visualizza il contenuto di
 * un nodo. Questo contenuto non deve essere modificabile.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO7.7
 * @example <premi-node node="node"></premi-node>
 * @memberOf Front-End::Directives
 */
(function (){
	'use strict';

	angular
		.module('premi.directives')
		.directive('premiNode',premiNode);

	function premiNode(){
		return {
			restrict:'E',
			scope:{
				node:'='
			},
			replace:true,
			controller:'NodeController',
			templateUrl: 'app/directives/node/node.html'
		};

	}
})();
