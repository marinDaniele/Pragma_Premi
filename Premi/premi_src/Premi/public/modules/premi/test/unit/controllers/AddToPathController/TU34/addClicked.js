/**
 * File: addClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU34 Premi::Front-End::Controllers::AddToPathController metodo "addClicked"
 */
'use strict';
describe('TU34 Premi::Front-End::Controllers::AddToPathController', function(){
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
		$scope.onAdd = jasmine.createSpy('onAdd');
		$scope.node = {getId : jasmine.createSpy('getId')};
		//crea una nuova istanza di AddToPathController
		$controller('AddToPathController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $scope.onAdd", function(){
		$scope.addClicked();
		expect($scope.onAdd).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.hide", function(){
		$scope.addClicked();
		expect($mdDialog.hide).toHaveBeenCalled();
	});
});
