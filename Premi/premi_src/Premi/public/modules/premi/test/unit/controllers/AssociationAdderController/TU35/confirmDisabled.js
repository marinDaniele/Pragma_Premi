/**
 * File: confirmDisabled.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU35 Premi::Front-End::Controllers::AssociationAdderController metodo "confirmDisabled"
 */
'use strict';
describe('TU35 Premi::Front-End::Controllers::AssociationAdderController', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return{
					hide: jasmine.createSpy('hide')
				};
			});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $mdDialog){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$scope.onNodeSelected = jasmine.createSpy('onNodeSelected');
		//crea una nuova istanza di AssociationAdderController
		$controller('AssociationAdderController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe restituire 'true' nel caso il bottone sia disabilitato, 'false' altrimenti", function(){
		expect($scope.confirmDisabled()).toBe($scope.selectedNodeId === '');
	});
});
