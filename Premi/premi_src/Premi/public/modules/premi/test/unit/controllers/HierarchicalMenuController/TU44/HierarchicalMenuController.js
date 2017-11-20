/**
 * File: HierarchicalMenuController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU44 Premi::Front-End::Controllers::HierarchicalMenuController costruttore
 */
'use strict';
describe('TU44 Premi::Front-End::Controllers::HierarchicalMenuController costruttore', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		inject(function($controller, $rootScope){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			//crea una nuova istanza di HierarchicalMenuController
			$controller('HierarchicalMenuController', { 
				$scope: $scope
			});
		});
	});

	//test
	it("Dovrebbe inizializzare a 'false' l'attributo $scope.isOpen", function(){
		expect($scope.isOpen).toBe(false);
	})
});
