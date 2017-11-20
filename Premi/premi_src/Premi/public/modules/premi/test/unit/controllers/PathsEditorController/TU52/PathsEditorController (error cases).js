/**
 * File: PathsEditorController (error cases).js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU52 Premi::Front-End::Controllers::PathsEditorController costruttore (solo casi promises non andate a buon fine)
 */
'use strict';
describe('TU52 Premi::Front-End::Controllers::PathsEditorController costruttore (solo casi promises non andate a buon fine)', function(){
	var $scope, $rootScope, $q, errorOccurred = true, error,
	paths = ["path0", "path1", "path2"];
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdUtil', function(){});
			$provide.service('$mdSidenav', function(){});
			$provide.factory('pathService', function(){
				return {
					getPathNames: jasmine.createSpy('getPathNames').and.callFake(function(){
						if(!errorOccurred)
							return $q.when(paths);
						else{
							error = "Something whent wrong!";
							return $q.reject(error);
						}
					})
				};
			});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen')
				};
			});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, _$rootScope_, _$q_, $mdUtil, $mdSidenav, pathService, mindmapService, $mdDialog){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$q = _$q_;
			$scope = $rootScope.$new();
			$scope.$on = jasmine.createSpy('$on');
			//crea una nuova istanza di PathsEditorController
			$controller('PathsEditorController', { 
				$scope: $scope,
				mdUtil: $mdUtil, 
				mdSidenav: $mdSidenav, 
				pathService: pathService, 
				mindmapService: mindmapService, 
				$mdDialog: $mdDialog
			});
		});
		spyOn($scope, '$emit');
	});

	//test
	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error, nel caso la chiamata del metodo pathService.getPathName non vada a buon fine", function(){
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
