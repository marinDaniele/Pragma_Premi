/**
 * @class PathsListController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa della
 * directive premiPathsList.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFD4.3, RFD4.3.3, RFD4.5, RFD7.1,
 * RFD4.5.1, RFD4.7
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('PathsListController', pathsListController);

    pathsListController.$inject = ['$scope','$location', 'pathService','$mdDialog'];

    function pathsListController($scope, $location, pathService, $mdDialog){
        /*  scope:{
                selectPath: '&'
                paths:'='
            },
         */
        /* --- PARTE RELATIVA ALLA LISTA DEI PERCORSI --- */
        /**
         * @function present
         * @instance
         * @desc Metodo che avvia la presentazione del percorso identificato da
         * <tt>pathId</tt>.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt> del
         * percorso che si vuole presentare.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsListController
         */
        $scope.present = function (pathId){
            $location.url('/presentation/'+pathId);
        };

        /**
         * @function pathSelected
         * @instance
         * @desc Metodo che gestisce il click dell'utente sul pulsante di
         * modifica del percorso identificato da <tt>pathId</tt>. Ottiene da
         * <tt>PathService</tt> l'oggetto <tt>Path</tt> rappresentante il
         * percorso di presentazione selezionato ed invoca la funzione
         * <tt>selectPath</tt> presente nello <tt>$scope</tt>.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt> del
         * percorso che si vuole selezionare.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsListController
         */
        $scope.pathSelected = function (pathId){
            pathService.getPath(pathId)
                .then(function (pathObj){
                    $scope.selectPath({'path':pathObj});
                },function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function deletePath
         * @instance
         * @desc Metodo che richiede a <tt>PathService</tt> la rimozione del
         * percorso identificato da <tt>pathId</tt>.
         * @param {MouseEvent} ev - Parametro che rappresenta l'evento del
         * browser che ha causato l'invocazione del metodo.
         * @param {String} pathId - Parametro che rappresenta l'identificativo
         * del percorso di presentazione che si vuole cancellare.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsListController
         */
        $scope.deletePath = function (ev,pathId){
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Sei sicuro di vole cancellare il percorso?')
                .content('Una volta cancellato non avrai più modo di ' +
                'recuperarlo.')
                .ariaLabel('Conferma cancellazione')
                .ok('Conferma cancellazione')
                .cancel('Annulla')
                .targetEvent(ev);
            $mdDialog.show(confirm)
                .then(function () {
                    return pathService.deletePath(pathId);
                })
                .then(function (){
                    return pathService.getPathNames();
                })
                .then(function (paths){
                    $scope.paths.splice(0,$scope.paths.length);
                    paths.forEach(function (item){
                        $scope.paths.push(item);
                    });
                })
                .catch(function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function createNewPath
         * @instance
         * @desc Metodo che utilizza <tt>PathService</tt> per creare un nuovo
         * percorso di presentazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsListController
         */
        $scope.createNewPath = function (){
            $mdDialog.show({
                controller: function ($scope){
                    $scope.nome="Nuovo percorso";
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
                '<md-input-container><label>Nome percorso</label>' +
                '<input ng-model="nome" type="text" md-maxlength="30">' +
                '</md-input-container>' +
                '</div>' +
                '</md-dialog-content>' +
                '<div class="md-actions" layout="row">' +
                '<md-button ng-click="cancel()">Annulla</md-button>'+
                '<md-button ng-click="hide()" class="md-primary">Aggiungi' +
                '</md-button></div>' +
                '</md-dialog>',
                parent: angular.element(document.body)
            })
                .then(function (pathName) {
                    if (pathName === ''){
                        pathName = 'Nuovo percorso';
                    }
                    return pathService.addPath(pathName);
                })
                .then(function (path){
                    //path ha come campi id e name
                    $scope.paths.push({
                        _id: path.getId(),
                        name: path.getName()
                    });
                }).catch(function (error){
                    $scope.$emit('premi-error',error);
                });
        };
    }
})();
