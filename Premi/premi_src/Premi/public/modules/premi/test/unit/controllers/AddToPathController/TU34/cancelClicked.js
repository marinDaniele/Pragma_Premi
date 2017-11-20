/**
 * File: cancelClicked.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU34 Premi::Front-End::Controllers::AddToPathController metodo "cancelClicked"
 */
'use strict';
describe('TU34 Premi::Front-End::Controllers::AddToPathController', function(){
	var $scope, $mdDialog;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return{
					cancel: jasmine.createSpy('calcel')
				};
			});
		});
	});

	beforeEach(inject(function($controller, $rootScope, _$mdDialog_){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$mdDialog = _$mdDialog_;
		//crea una nuova istanza di AddToPathController
		$controller('AddToPathController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe invocare il metodo $mdDialog.cancel", function(){
		$scope.cancelClicked();
		expect($mdDialog.cancel).toHaveBeenCalled();
	});
});
