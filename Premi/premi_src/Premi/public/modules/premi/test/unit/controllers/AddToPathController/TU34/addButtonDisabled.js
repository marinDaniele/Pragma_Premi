/**
 * File: addButtonDisabled.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU34 Premi::Front-End::Controllers::AddToPathController metodo "addButtonDisabled"
 */
'use strict';
describe('TU34 Premi::Front-End::Controllers::AddToPathController', function(){
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
		//crea una nuova istanza di AddToPathController
		$controller('AddToPathController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe restituire 'true' nel caso il bottone sia disabilitato, 'false' altrimenti", function(){
		expect($scope.addButtonDisabled()).toBe($scope.selectedPathId === '');
	});
});
