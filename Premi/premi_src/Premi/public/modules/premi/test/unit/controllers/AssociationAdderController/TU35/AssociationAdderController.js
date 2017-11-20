/**
 * File: AssociationAdderController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU35 Premi::Front-End::Controllers::AssociationAdderController costruttore
 */
'use strict';
describe('TU35 Premi::Front-End::Controllers::AssociationAdderController', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $mdDialog){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		//crea una nuova istanza di AssociationAdderController
		$controller('AssociationAdderController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe inizializzare l'attributo $scope.selectedNodeId con una stringa vuota", function(){
		expect($scope.selectedNodeId).toBe('');
	});
});
