/**
 * File: SmartMenuController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-13
 * Descrizione: Test di unità TU62 Premi::Front-End::Controllers::SmartMenuController costruttore
 */
'use strict';
describe('TU62 Premi::Front-End::Controllers::SmartMenuController costruttore', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		inject(function($controller, $rootScope){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			//crea una nuova istanza di SmartMenuController
			$controller('SmartMenuController', { 
				$scope: $scope
			});
		});
	});

	//test
	it("Dovrebbe inizializzare a 'false' l'attributo $scope.isOpen", function(){
		expect($scope.isOpen).toBe(false);
	})
});
