/**
 * File: deletePath.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU54 Premi::Front-End::Controllers::PathsListController metodo "deletePath"
 */
'use strict';
describe('TU54 Premi::Front-End::Controllers::PathsListController metodo "deletePath"', function(){
	var $scope, $rootScope, $q, errorInShow, errorInDeletePath, errorInGetPathNames, pathService,
	showError = false,
	deletePathError = false,
	getPathNamesError = false,
	pathId = "path",
	paths = [];
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.factory('pathService', function(){
				return {
					deletePath: jasmine.createSpy('deletePath').and.callFake(function(){
						if(!deletePathError)
							return $q.when();
						else{
							errorInDeletePath = "Something went wrong in deletePath!";
							return $q.reject(errorInDeletePath);
						}
					}),
					getPathNames: jasmine.createSpy('getPathNames').and.callFake(function(){
						if(!getPathNamesError)
							return $q.when(paths);
						else{
							errorInGetPathNames = "Something went wrong in getPathNames!";
							return $q.reject(errorInGetPathNames);
						}
					})
				};
			});
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show').and.callFake(function(){
						if(!showError)
							return $q.when(paths);
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
			splice: jasmine.createSpy('splice'),
			length: 1,
			forEach: jasmine.createSpy('forEach')
		}
	});

	//test
	it("Dovrebbe invocare il metodo pathService.deletePath con il parametro pathId, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect(pathService.deletePath).not.toHaveBeenCalledWith(pathId);
		showError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect(pathService.deletePath).toHaveBeenCalledWith(pathId);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInShow, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInShow);
		showError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInShow);
	});

	it("Dovrebbe non invocare il metodo pathService.deletePath con il parametro pathId, nel caso la chiamata al metodo $mdDialog.show non vada a buon fine", function(){
		expect(pathService.deletePath).not.toHaveBeenCalledWith(pathId);
		showError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect(pathService.deletePath).not.toHaveBeenCalledWith(pathId);
	});

	it("Dovrebbe invocare il metodo pathService.getPathNames, nel caso la chiamata al metodo pathService.deletePath vada a buon fine", function(){
		expect(pathService.getPathNames).not.toHaveBeenCalled();
		showError = false;
		deletePathError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect(pathService.getPathNames).toHaveBeenCalled();
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInDeletePath, nel caso la chiamata al metodo pathService.deletePath vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeletePath);
		showError = false;
		deletePathError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeletePath);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInDeletePath, nel caso la chiamata al metodo pathService.deletePath non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInDeletePath);
		showError = false;
		deletePathError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInDeletePath);
	});

	it("Dovrebbe non invocare il metodo pathService.getPathNames, nel caso la chiamata al metodo pathService.deletePath non vada a buon fine", function(){
		expect(pathService.getPathNames).not.toHaveBeenCalled();
		showError = false;
		deletePathError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect(pathService.getPathNames).not.toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.paths.splice con i parametri 0 e $scope.paths.length, nel caso la chiamata al metodo pathService.getPathNames vada a buon fine", function(){
		expect($scope.paths.splice).not.toHaveBeenCalledWith(0,$scope.paths.length);
		showError = false;
		deletePathError = false;
		getPathNamesError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.paths.splice).toHaveBeenCalledWith(0,$scope.paths.length);
	});

	it("Dovrebbe non invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInGetPathNames, nel caso la chiamata al metodo pathService.getPathNames vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInGetPathNames);
		showError = false;
		deletePathError = false;
		getPathNamesError = false;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInGetPathNames);
	});

	it("Dovrebbe invocare il metodo $scope.$emit con i parametri 'premi-error' ed errorInGetPathNames, nel caso la chiamata al metodo pathService.getPathNames non vada a buon fine", function(){
		expect($scope.$emit).not.toHaveBeenCalledWith('premi-error',errorInGetPathNames);
		showError = false;
		deletePathError = false;
		getPathNamesError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',errorInGetPathNames);
	});

	it("Dovrebbe non invocare il metodo $scope.paths.splice con i parametri 0 e $scope.paths.length, nel caso la chiamata al metodo pathService.getPathNames non vada a buon fine", function(){
		expect($scope.paths.splice).not.toHaveBeenCalledWith(0,$scope.paths.length);
		showError = false;
		deletePathError = false;
		getPathNamesError = true;
		$scope.deletePath("", pathId);
		$rootScope.$digest();
		expect($scope.paths.splice).not.toHaveBeenCalledWith(0,$scope.paths.length);
	});
});
