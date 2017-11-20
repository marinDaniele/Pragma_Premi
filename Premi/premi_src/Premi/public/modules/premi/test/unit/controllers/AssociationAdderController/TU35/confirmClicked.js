/**
 * File: confirmClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU35 Premi::Front-End::Controllers::AssociationAdderController metodo "confirmClicked"
 */
'use strict';
describe('TU35 Premi::Front-End::Controllers::AssociationAdderController', function(){
	var $scope, $mdDialog;

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

	beforeEach(inject(function($controller, $rootScope, _$mdDialog_){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$mdDialog = _$mdDialog_;
		$scope.onNodeSelected = jasmine.createSpy('onNodeSelected');
		//crea una nuova istanza di AssociationAdderController
		$controller('AssociationAdderController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $scope.onNodeSelected", function(){
		$scope.confirmClicked();
		expect($scope.onNodeSelected).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.hide", function(){
		$scope.confirmClicked();
		expect($mdDialog.hide).toHaveBeenCalled();
	});
});
