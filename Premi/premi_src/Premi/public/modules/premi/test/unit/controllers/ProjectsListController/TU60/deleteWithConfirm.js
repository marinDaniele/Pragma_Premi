/**
 * File: deleteWithConfirm.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-13
 * Descrizione: Test di unità TU60 Premi::Front-End::Controllers::ProjectsListController metodo "deleteWithConfirm"
 */
'use strict';
describe('TU60 Premi::Front-End::Controllers::ProjectsListController metodo "deleteWithConfirm"', function(){
	var $scope, $rootScope, $q, $mdDialog, errorInShow,
	showError = false,
	projectId = "project",
	ev = "event";

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.factory('$mdDialog', function(){
				return {
					show: jasmine.createSpy('show').and.callFake(function(){
						if(!showError)
							return $q.when();
						else{
							errorInShow = "Something went wrong in show";
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
				}
			});
		});
		inject(function($controller, _$rootScope_, _$q_, _$mdDialog_){
			//crea un nuovo scope figlio
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$q = _$q_;
			$mdDialog = _$mdDialog_;
			//crea una nuova istanza di ProjectsListController
			$controller('ProjectsListController', { 
				$scope: $scope,
				$mdDialog: $mdDialog
			});
		});
		$scope.$emit = jasmine.createSpy('$emit');
		$scope.onDelete = jasmine.createSpy('onDelete');
	});

	//test
	it("Dovrebbe invocare il metodo $mdDialog.confirm", function(){
		expect($mdDialog.confirm).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.confirm).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.parent", function(){
		expect($mdDialog.parent).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.parent).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.title", function(){
		expect($mdDialog.title).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.title).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.content", function(){
		expect($mdDialog.content).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.content).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.ariaLabel", function(){
		expect($mdDialog.ariaLabel).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.ariaLabel).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.ok", function(){
		expect($mdDialog.ok).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.ok).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.cancel", function(){
		expect($mdDialog.cancel).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.cancel).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $mdDialog.targetEvent", function(){
		expect($mdDialog.targetEvent).not.toHaveBeenCalledWith(ev);
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.targetEvent).toHaveBeenCalledWith(ev);
	});

	it("Dovrebbe invocare il metodo $mdDialog.show", function(){
		expect($mdDialog.show).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		expect($mdDialog.show).toHaveBeenCalled();
	});

	it("Dovrebbe invocare il metodo $scope.onDelete, con il parametro {projectId: projectId}, nel caso la chiamata del metodo $mdDialog.show vada a buon fine", function(){
		showError = false;
		expect($scope.onDelete).not.toHaveBeenCalled();
		$scope.deleteWithConfirm(ev, projectId);
		$rootScope.$digest();
		expect($scope.onDelete).toHaveBeenCalledWith({projectId: projectId});
	});
});
