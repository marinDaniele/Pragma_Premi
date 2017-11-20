/**
 * File: call.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU36 Premi::Front-End::Controllers::ContextMenuController metodo "call"
 */
'use strict';
describe('TU36 Premi::Front-End::Controllers::ContextMenuController', function(){
	var $scope, $mdDialog;
	var fn = {
		callback: jasmine.createSpy('callback')
	};

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
		//crea una nuova istanza di ContextMenuController
		$controller('ContextMenuController', { 
			$scope: $scope,
			$mdDialog: $mdDialog
		});
	}));

	//test
	it("Dovrebbe essere invocato il metodo $mdDialog.hide", function(){
		$scope.call(fn);
		expect($mdDialog.hide).toHaveBeenCalled();
	});
	
	it("Dovrebbe essere invocata la funzione fn.callback", function(){
		$scope.call(fn);
		expect(fn.callback).toHaveBeenCalled();
	});
});
