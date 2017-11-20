/**
 * File: PathController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU51 Premi::Front-End::Controllers::PathController costruttore
 */
'use strict';
describe('TU51 Premi::Front-End::Controllers::PathController costruttore', function(){
	var $scope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('pathService', function(){});
		});
		inject(function($controller, $rootScope, pathService){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$scope.$watch = jasmine.createSpy('$watch');
			//crea una nuova istanza di PathController
			$controller('PathController', { 
				$scope: $scope,
				pathService: pathService
			});
		});
	});

	//test
	it("Dovrebbe inizializzare l'attributo $scope.pathName a null", function(){
		expect($scope.pathName).toBe(null);
	});

	it("Dovrebbe invocare il metodo $scope.$watch, con i parametri 'selectedPath' e una funzione", function(){
		expect($scope.$watch).toHaveBeenCalledWith('selectedPath', jasmine.any(Function));
	});
});
