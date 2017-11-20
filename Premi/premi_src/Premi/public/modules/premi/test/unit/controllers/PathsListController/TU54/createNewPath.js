/**
 * File: createNewPath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU54 Premi::Front-End::Controllers::PathsListController metodo "createNewPath"
 */
'use strict';
describe('TU54 Premi::Front-End::Controllers::PathsListController metodo "createNewPath"', function(){
	var $scope, $rootScope, $q, errorInShow, errorInAddPath, pathService,
	showError = false,
	addPathError = false,
	path = {
		id: "path",
		getId: function(){return this.id;},
		getName: function(){return this.id;}
	};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.factory('pathService', function(){
				return {
					addPath: jasmine.createSpy('addPath').and.callFake(function(){
						if(!addPathError)
							return $q.when(path);
						else{
							errorInAddPath = "Something went wrong in addPath!";
							return $q.reject(errorInAddPath);
						}
					})
				};
			});
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show').and.callFake(function(){
						if(!showError)
							return $q.when(path.getName());
						else{
							errorInShow = "Something went wrong in show!";
							return $q.reject(errorInShow);
						}
					}),
					confirm: jasmine.createSpy('confirm').and.callFake(function(){
						return this;
					}),
					parent: jasmine.createSpy('parent').and.callFake(function(){
						return this;
					}),
					title: jasmine.createSpy('title').and.callFake(function(){
						return this;
					}),
					content: jasmine.createSpy('content').and.callFake(function(){
						return this;
					}),
					ariaLabel: jasmine.createSpy('ariaLabel').and.callFake(function(){
						return this;
					}),
					ok: jasmine.createSpy('ok').and.callFake(function(){
						return this;
					}),
					cancel: jasmine.createSpy('cancel').and.callFake(function(){
						return this;
					}),
					targetEvent: jasmine.createSpy('targetEvent').and.callFake(function(){
						return this;
					})
				};
			});
		});
		inject(function($controller, _$rootScope_, _$q_, $location, _pathService_, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			pathService = _pathService_;
			//crea una nuova istanza di PathsListController
			$controller('PathsListController', { 
				$scope: $scope,
				$location: $location,
				pathService: pathService,
				$mdDialog: $mdDialog
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$scope.paths = {
			push: jasmine.createSpy('push')
		}
	});

	//test
	it("Dovrebbe invocare il metodo pathService.addPath, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect(pathService.addPath).not.toHaveBeenCalled();
		showError = false;
		$scope.createNewPath();
		$rootScope.$digest();
		expect(pathService.addPath).toHaveBeenCalled();
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = false;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = true;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe non invocare il metodo pathService.addPath, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect(pathService.addPath).not.toHaveBeenCalled();
		showError = true;
		$scope.createNewPath();
		$rootScope.$digest();
		expect(pathService.addPath).not.toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.paths.push, nel caso la chiamata al metodo pathService.addPath vada a buon fine", function(){
		expect($scope.paths.push).not.toHaveBeenCalled();
		showError = false;
		addPathError = false;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.paths.push).toHaveBeenCalled();
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInAddPath, nel caso la chiamata al metodo pathService.addPath vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInAddPath);
		showError = false;
		addPathError = false;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInAddPath);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInAddPath, nel caso la chiamata al metodo pathService.addPath non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInAddPath);
		showError = false;
		addPathError = true;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInAddPath);
	});

	it("Dovrebbe non invocare il metodo $scope.paths.push, nel caso la chiamata al metodo pathService.addPath non vada a buon fine", function(){
		expect($scope.paths.push).not.toHaveBeenCalled();
		showError = false;
		addPathError = true;
		$scope.createNewPath();
		$rootScope.$digest();
		expect($scope.paths.push).not.toHaveBeenCalled();
	});
});
