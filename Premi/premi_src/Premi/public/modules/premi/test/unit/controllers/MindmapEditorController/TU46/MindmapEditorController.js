/**
 * File: MindmapEditorController.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU46 Premi::Front-End::Controllers::MindmapEditorController costruttore
 */
describe('TU46 Premi::Front-End::Controllers::MindmapEditorController', function(){
	var $scope, mindmapService;

	beforeEach(function(){
		module('premi.controllers');
		module(function($provide){
			$provide.service('$mdDialog', function(){});
			$provide.factory('mindmapService', function(){
				return {
					listen: jasmine.createSpy('listen')
				};
			});
			$provide.service('projectService', function(){});
		});
	});

	beforeEach(inject(function($controller, $rootScope, $mdDialog, _mindmapService_, projectService){
		//crea un nuovo scope figlio
		$scope = $rootScope.$new();
		mindmapService = _mindmapService_;
		$scope.$on = jasmine.createSpy('$on');
		//crea una nuova istanza di MindmapEditorController
		$controller('MindmapEditorController', { 
			$scope: $scope,
			$mdDialog: $mdDialog,
			mindmapService: mindmapService,
			projectService: projectService
		});
	}));

	//test
	it("Dovrebbe inizializzare l'attributo $scope.associableNodeList a null", function(){
		expect($scope.associableNodeList).toBe(null);
	});

	it("Dovrebbe inizializzare l'attributo $scope.currentNode a null", function(){
        expect($scope.currentNode).toBe(null);
	});

	it("Dovrebbe invocare il metodo $scope.on, passando come parametri il valore '$destroy' e una funzione", function(){
		expect($scope.$on).toHaveBeenCalledWith("$destroy", jasmine.any(Function));
	});

	it("Dovrebbe invocare il metodo mindmapService.listen, passando come parametri il valore 'node-select' e una funzione", function(){
		expect(mindmapService.listen).toHaveBeenCalledWith("node-select", jasmine.any(Function));
	});

	it("Dovrebbe invocare il metodo mindmapService.listen, passando come parametri il valore 'node-deselect' e una funzione", function(){
		expect(mindmapService.listen).toHaveBeenCalledWith("node-deselect", jasmine.any(Function));
	});

	it("Dovrebbe invocare il metodo mindmapService.listen, passando come parametri il valore 'association-select' e una funzione", function(){
		expect(mindmapService.listen).toHaveBeenCalledWith("association-select", jasmine.any(Function));
	});
});
