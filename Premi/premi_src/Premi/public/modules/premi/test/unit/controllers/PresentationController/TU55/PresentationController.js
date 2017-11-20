/**
 * File: PresentationController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU55 Premi::Front-End::Controllers::PresentationController costruttore
 */
'use strict';
describe('TU55 Premi::Front-End::Controllers::PresentationController costruttore', function(){
	var $scope, $rootScope;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$element', function(){
				return [{dataset: jasmine.createSpyObj('dataset', ['width'])}];
			});
			$provide.service('$compile', function(){});
			$provide.service('$window', function(){});
		});
		inject(function($controller, _$rootScope_, $element, $compile, $window){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			//crea una nuova istanza di PresentationController
			$controller('PresentationController', { 
				$scope: $scope,
				$element: $element, 
				$compile: $compile, 
				$window: $window
			});
		});
		//$scope.$on = jasmine.createSpy('$on');
		spyOn($scope, 'previousStep');
		spyOn($scope, 'nextStep');
	});

	//test
	it("Dovrebbe invocare il metodo $scope.$on con il parametro 'presentation-previousStep'", function(){
		expect($scope.previousStep).not.toHaveBeenCalled();
		$scope.$emit('presentation-previousStep');
		expect($scope.previousStep).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.$on con il parametro 'presentation-nextStep'", function(){
		expect($scope.nextStep).not.toHaveBeenCalled();
		$scope.$emit('presentation-nextStep');
		expect($scope.nextStep).toHaveBeenCalled();
	});

	/*it("Dovrebbe invocare il metodo $scope.$on con il parametro 'presentation-init'", function(){
		expect($scope.$on).not.toHaveBeenCalledWith('presentation-init', jasmine.any(Function));
		$scope.$emit('$on');
	});*/
/*
	it("Dovrebbe invocare il metodo $scope.$on con il parametro 'presentation-previousStep'", function(){
		expect($scope.$on).toHaveBeenCalledWith('presentation-previousStep', $scope.previousStep);
	});

	it("Dovrebbe invocare il metodo $scope.$on con il parametro 'presentation-nextStep'", function(){
		expect($scope.$on).toHaveBeenCalledWith('presentation-nextStep', $scope.nextStep);
	});*/
});
