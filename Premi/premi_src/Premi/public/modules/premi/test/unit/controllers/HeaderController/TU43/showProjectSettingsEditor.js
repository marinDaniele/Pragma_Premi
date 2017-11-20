/**
 * File: showProjectSettingsEditor.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-12
 * Descrizione: Test di unità TU43 Premi::Front-End::Controllers::HeaderController metodo "showProjectSettingsEditor"
 */
'use strict';
describe('TU43 Premi::Front-End::Controllers::HeaderController metodo "showProjectSettingsEditor"', function(){
	var $scope, $mdDialog;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$location', function(){});
			$provide.service('projectService', function(){});
			$provide.service('$window', function(){});
			$provide.service('authenticationService', function(){});
			$provide.service('mindmapAdapterService', function(){});
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show')
				};
			});
		});
		inject(function($controller, $rootScope, $location, projectService, $window, authenticationService, mindmapAdapterService, _$mdDialog_){
			//crea un nuovo scope figlio
			$scope = $rootScope.$new();
			$mdDialog = _$mdDialog_;
			//crea una nuova istanza di HeaderController
			$controller('HeaderController', { 
				$scope: $scope,
				$location: $location,
				projectService: projectService,
				$window: $window,
				authenticationService: authenticationService,
				mindmapAdapterService: mindmapAdapterService, 
				$mdDialog: $mdDialog
			});
		});
	});

	it("Dovrebbe invocare il metodo $mdDialog.show", function(){
		$scope.showProjectSettingsEditor();
		expect($mdDialog.show).toHaveBeenCalled();
	});
});
