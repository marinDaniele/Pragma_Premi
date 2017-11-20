/**
 * @class DashboardController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante la visualizzazione dei progetti di un utente.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-15 Requisiti: RFO1, RFO1.1, RFO1.2, RFD26, RFO27,
 * RFO32
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('DashboardController',dashboardController);

    dashboardController.$inject = ['$scope','projectService','$location',
        '$mdDialog'];

    function dashboardController($scope, projectService, $location, $mdDialog){
        $scope.projects = [];
        //Caricamento dei progetti
        projectService.getProjects()
            .then(function (projects){
                $scope.projects = projects;
            },function (error){
                $scope.$emit('premi-error',error);
            });
        /**
         * @function newProjectClicked
         * @instance
         * @desc Metodo che gestisce l'evento di creazione di un nuovo progetto.
         * Interagisce con <tt>ProjectService</tt> per creare un nuovo progetto.
         * @returns {void}
         * @memberOf Front-End::Controllers.DashboardController
         */
        $scope.newProjectClicked = function (){
            $mdDialog.show({
                controller: function ($scope){
                    $scope.nome="Nuovo progetto";
                    $scope.hide = function () {
                        $mdDialog.hide($scope.nome);
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                },
                template:'<md-dialog>' +
                '<md-toolbar>' +
                '<div class="md-toolbar-tools"><h2>Inserisci un nome</h2>' +
                '</div>'+
                '</md-toolbar>' +
                '<md-dialog-content>' +
                '<div>' +
                '<md-input-container><label>Nome progetto' +
                '</label><input ng-model="nome" type="text" ' +
                'ng-required="true">' +
                '</md-input-container>' +
                '</div>' +
                '</md-dialog-content>' +
                    '<div class="md-actions" layout="row">' +
                '<md-button ng-click="cancel()">Annulla</md-button>'+
                '<md-button id="btn-aggiungi-progetto" ng-click="hide()"' +
                ' class="md-primary">Aggiungi' +
                '</md-button></div>' +
                '</md-dialog>',
                parent: angular.element(document.body)
            })
                .then(function (projectName) {
                    if (projectName === ''){
                        projectName = 'Nuovo progetto';
                    }
                    console.log(projectName);
                    return projectService.createProject(projectName);
                })
                .then(function (project){
                    console.log(project);
                    $scope.projects.push(project);
                })
                .catch(function (error){
                    if (error !== undefined){
                        $scope.$emit('premi-error',error);
                    }
                });
        };
        /**
         * @function deleteProjectClicked
         * @instance
         * @desc Metodo che gestisce l'evento di cancellazione di un progetto
         * esistente.
         * Interagisce con <tt>ProjectService</tt> per cancellare il progetto.
         * @param {String} projectId - Parametro contenente l'id del progetto da
         * cancellare.
         * @returns {void}
         * @memberOf Front-End::Controllers.DashboardController
         */
        $scope.deleteProjectClicked = function (projectId){
            projectService.deleteProject(projectId)
                .then(function (){
                    var projectFound = false;
                    for (var i= 0; !projectFound && i < $scope.projects.length;
                         i++){
                        if ($scope.projects[i]._id === projectId){
                            $scope.projects.splice(i,1);
                            projectFound = true;
                        }
                    }
                },function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function editProjectClicked
         * @instance
         * @desc Metodo che si occupa di reindirizzare l'utente alla vista per
         * la modifica di un progetto.
         * @param {String} projectId - Parametro contenente l'id del progetto da
         * aprire.
         * @returns {void}
         * @memberOf Front-End::Controllers.DashboardController
         */
        $scope.editProjectClicked = function (projectId){
            projectService.loadProject(projectId)
                .then(function (){
                    $location.path('/editor');
                },function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function startPresentationClicked
         * @instance
         * @desc Metodo che gestisce l'avvio di una presentazione direttamente
         * dalla dashboard.
         * Instanzia il progetto e reindirizza alla vista per la presentazione.
         * @param {String} pathId - Parametro contenente l'id del percorso di
         * presentazione
         * che l'utente vuole presentare.
         * @param {String} projectId - Parametro contenente l'id del progetto
         * contenente il percorso
         * che l'utente vuole presentare.
         * @returns {void}
         * @memberOf Front-End::Controllers.DashboardController
         */
        $scope.startPresentationClicked = function (pathId, projectId){
            console.log(projectId + ' '+pathId);
            projectService.loadProject(projectId)
                .then(function (){
                    $location.path('/presentation/'+pathId);
                },function (error){
                    $scope.$emit('premi-error',error);
                });
        };
    }
})();
