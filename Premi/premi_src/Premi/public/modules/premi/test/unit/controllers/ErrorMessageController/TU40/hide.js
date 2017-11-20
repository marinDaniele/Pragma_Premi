/**
 * File: hide.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU40 Premi::Front-End::Controllers::ErrorMessageController metodo "hide"
 */
'use strict';
describe('TU40 Premi::Front-End::Controllers::ErrorMessageController', function(){
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
		//crea una nuova istanza di ErrorMessageController
		$controller('ErrorMessageController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe venire invocato il metodo $mdDialog.cancel", function(){
		$scope.hide();
		expect($mdDialog.cancel).toHaveBeenCalled();
	});
});
