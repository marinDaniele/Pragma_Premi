/**
 * File: confirm.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-10
 * Descrizione: Test di unità TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "confirm"
 */
'use strict';
describe('TU59 Premi::Front-End::Controllers::ProjectSettingsEditorController metodo "confirm"', function(){
	var $scope, $mdDialog, $q, $rootScope, error, errorPresence,
	currentProject = {
		name: "project", textColor: "white", backgroundColor: "blue", fontFamily: "Arial",
		getName: function(){return this.name;},
		getTextColor: function(){return this.textColor;},
		getBackgroundColor: function(){return this.backgroundColor;},
		getFontFamily: function(){return this.fontFamily;},
		setName: function(name){this.name = name},
		setTextColor: function(textColor){this.textColor = textColor;},
		setBackgroundColor: function(backgroundColor){this.backgroundColor = backgroundColor;},
		setFontFamily: function(fontFamily){this.fontFamily = fontFamily;}
	};
	
	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return{
					hide: jasmine.createSpy('hide')
				};
			});
			$provide.factory('projectService', function(){
				return {
					getCurrentProject: jasmine.createSpy('getCurrentProject').and.returnValue(currentProject),
					finalizeProjectUpdates: jasmine.createSpy('getCurrentProject').and.callFake(function(){
						if(!error)
							return $q.when();
						else{
							error = "Something went wrong!";
							return $q.reject(error);	
						}
					})
				};
			});
		});
		inject(function($controller, _$rootScope_, _$q_, _$mdDialog_, projectService){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$mdDialog = _$mdDialog_;
			$q = _$q_;
			//crea una nuova istanza di ProjectSettingsEditorController
			$controller('ProjectSettingsEditorController', { 
				$scope: $scope, 
				$mdDialog: $mdDialog,
				projectService: projectService
			});
		});
		spyOn(currentProject, "setName").and.callThrough();
		spyOn(currentProject, "setTextColor").and.callThrough();
		spyOn(currentProject, "setBackgroundColor").and.callThrough();
		spyOn(currentProject, "setFontFamily").and.callThrough();
		spyOn($scope, '$emit');
	});

	//test
	it("Dovrebbe invocare il metodo currentProject.setName, passando come parametro il valore dell'attributo $scope.project.name", function(){
		$scope.confirm();
		expect(currentProject.setName).toHaveBeenCalledWith($scope.project.name);
	});

	it("Dovrebbe invocare il metodo currentProject.setBackgroundColor, passando come parametro il valore dell'attributo $scope.project.backgroundColor", function(){
		$scope.confirm();
		expect(currentProject.setBackgroundColor).toHaveBeenCalledWith($scope.project.backgroundColor);
	});

	it("Dovrebbe invocare il metodo currentProject.setTextColor, passando come parametro il valore dell'attributo $scope.project.textColor", function(){
		$scope.confirm();
		expect(currentProject.setTextColor).toHaveBeenCalledWith($scope.project.textColor);
	});

	it("Dovrebbe invocare il metodo currentProject.setFontFamily, passando come parametro il valore dell'attributo $scope.project.fontFamily", function(){
		$scope.confirm();
		expect(currentProject.setFontFamily).toHaveBeenCalledWith($scope.project.fontFamily);
	});

	it("Dovrebbe invocare il metodo $mdDialog.hide", function(){
		$scope.confirm();
		expect($mdDialog.hide).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.$emit, con i parametri 'premi-error' ed error", function(){
		error = true;
		$scope.confirm();
		$rootScope.$digest();
		expect($scope.$emit).toHaveBeenCalledWith('premi-error',error);
	});
});
