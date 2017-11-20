/**
 * @class PathController
 * @classdesc Classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la modifica dei percorsi
 * di presentazione di un progetto.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 - Requisiti: RFO4, RFD4.3, RFD4.3.1, RFD4.3.2,
 * RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.5, RFD22, RFD4.4.5, RFD35
 * @memberOf Front-End::Controllers
 */

(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('PathController', pathController);

    pathController.$inject = ['$scope', 'pathService'];

    function pathController($scope, pathService){
        //Inizializzazione
        /*
        *  scope:{
         selectedPath: '=',
         deselectPath: '&'
         },
        * */
        $scope.pathName = null;
        $scope.$watch('selectedPath', function () {
            if ($scope.selectedPath !== null) {
                $scope.pathName = $scope.selectedPath.getName();
            }
        });
        /**
         * @function removeNode
         * @instance
         * @desc Metodo che rimuove il nodo identificato da nodeId dal percorso
         * di presentazione corrente.
         * @param {String} nodeId - Parametro che contiene l'identificativo del
         * nodo da rimuovere dal percorso.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathController
         */
        $scope.removeNode = function (nodeId){
            pathService.removeNodeFromPath(nodeId,$scope.selectedPath.getId())
                .then(function (){
                    $scope.selectedPath.deleteStep(nodeId);
                },function (error){
                    $scope.$emit('premi-error',error);
                });
            /* Codice per l'eleminazione effettiva dei alla pressione del
            pulsante salva
            if ($scope.selectedPath.deleteStep(nodeId)){
                removedSteps.push(nodeId);
            }*/
        };
        /**
         * @function saveChanges
         * @instance
         * @desc Metodo che rende effettive le modifiche subite dal percorso di
         * presentazione utilizzando PathService.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathController
         */
        $scope.saveChanges = function (){
            if ($scope.pathName !== '') {
                $scope.selectedPath.setName($scope.pathName);
                pathService.finalizePathUpdates($scope.selectedPath)
                    .then(function () {
                        $scope.deselectPath();
                    }, function (error) {
                        $scope.$emit('premi-error', error);
                    });
            }
            /* Codice per l'eleminazione effettiva dei alla pressione del
            pulsante salva
            var promises = [];
            removedSteps.forEach(function (nodeId){
                promises.push(pathService.removeNodeFromPath(nodeId,
                $scope.selectedPath.getId()));
            });
            promises.push(pathService.finalizePathUpdates($scope.selectedPath));
            console.log(promises);
            $q.all(promises)
                .then(function (){
                    console.log('finito update');
                    $scope.deselectPath();
                },function (error){
                    $scope.$emit('premi-error',error);
                });
            */
        };
    }
})();
