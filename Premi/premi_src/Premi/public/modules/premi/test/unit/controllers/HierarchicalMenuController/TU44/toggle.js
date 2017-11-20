/**
 * File: toggle.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU44 Premi::Front-End::Controllers::HierarchicalMenuController metodo "toggle"
 */
'use strict';
describe('TU44 Premi::Front-End::Controllers::HierarchicalMenuController metodo "toggle"', function(){
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
	it("Dovrebbe assegnare il valore 'false' all'attributo $scope.isOpen, nel caso $scope.isOpen valga 'true'", function(){
		$scope.isOpen = true;
		$scope.toggle();
		expect($scope.isOpen).toBe(false);
	});

	it("Dovrebbe assegnare il valore 'true' all'attributo $scope.isOpen, nel caso $scope.isOpen valga 'false'", function(){
		$scope.isOpen = false;
		$scope.toggle();
		expect($scope.isOpen).toBe(true);
	});
});
