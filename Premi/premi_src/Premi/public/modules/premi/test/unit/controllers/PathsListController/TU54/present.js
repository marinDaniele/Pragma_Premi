/**
 * File: present.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU54 Premi::Front-End::Controllers::PathsListController metodo "present"
 */
'use strict';
describe('TU54 Premi::Front-End::Controllers::PathsListController metodo "present"', function(){
	var $scope, $location, 
	pathId = "path";
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$location', function(){
				return {
					url: jasmine.createSpy('url')
				};
			});
			$provide.service('pathService', function(){});
			$provide.service('$mdDialog', function(){});
		});
		inject(function($controller, $rootScope, _$location_, pathService, $mdDialog){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$location = _$location_;
			//crea una nuova istanza di PathsListController
			$controller('PathsListController', { 
				$scope: $scope,
				$location: $location,
				pathService: pathService,
				$mdDialog: $mdDialog
			});
		});
	});

	//test
	it("Dovrebbe invocare il metodo $location.url, con il parametro '/presentation/'+pathId", function(){
		expect($location.url).not.toHaveBeenCalledWith('/presentation/'+pathId);
		$scope.present(pathId);
		expect($location.url).toHaveBeenCalledWith('/presentation/'+pathId);
	});
});
