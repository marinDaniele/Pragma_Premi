/**
 * File: selected.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU39 Premi::Front-End::Controllers::EditableNodeContentController metodo "selected"
 */
'use strict';
describe('TU39 Premi::Front-End::Controllers::EditableNodeContentController', function(){
	var $scope, $event;

	beforeEach(module('premi.controllers'));

	beforeEach(inject(function($controller, $rootScope){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		$event = {stopPropagation : jasmine.createSpy('stopPropagation')};
		$scope.nodeContent = {getId : jasmine.createSpy('getId')};
		//crea una nuova istanza di EditableNodeContentController
		$controller('EditableNodeContentController', { 
			$scope: $scope
		});
	}));

	//test
	it("Dovrebbe venire impostato a 'true' l'attributo $scope.isSelected", function(){
		$scope.isSelected = false;
		$scope.selected($event);
		expect($scope.isSelected).toBe(true);
	});
});
