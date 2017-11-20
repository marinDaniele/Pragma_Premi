/**
 * File: EditableNodeContentController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU39 Premi::Front-End::Controllers::EditableNodeContentController costruttore
 */
'use strict';
describe('TU39 Premi::Front-End::Controllers::EditableNodeContentController', function(){
	var $scope;

	beforeEach(module('premi.controllers'));

	beforeEach(inject(function($controller, $rootScope){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$scope.$on = jasmine.createSpy('$on');
		//crea una nuova istanza di EditableNodeContentController
		$controller('EditableNodeContentController', { 
			$scope: $scope
		});
	}));

	//test
	it("Dovrebbe inizializzare l'attributo $scope.isSelected a false", function(){
		expect($scope.isSelected).toBe(false);
	});

	it("Dovrebbe invocare il metodo $scope.on, passando come parametri il valore 'nodecontent-deselect' e una funzione", function(){
		expect($scope.$on).toHaveBeenCalledWith("nodecontent-deselect", jasmine.any(Function));
	});
});
