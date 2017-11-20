/**
 * @class ProjectsListController
 * @classdesc Classe che gestisce la logica di funzionamento della directive
 * premiProjectsList.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO4, RFD7.1, RFO11, RFO11.2,
 * RFO11.1, RFO10, RFO10.1, RFO10.2, RFO11.3
 * @memberOf Front-End::Controllers
 */

(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('ProjectsListController',projectsListController);

    projectsListController.$inject = ['$scope', '$mdDialog'];

    function projectsListController($scope, $mdDialog){
        /**
         * @function showPaths
         * @instance
         * @desc Metodo che rende visibile la finestra di dialogo per la scelta
         * del percorso di presentazione da presentare.
         * @param {String} projectId - Parametro rappresentate l'<tt>id</tt> del
         * progetto contenente il percorso da presentare.
         * @param {Object} paths - Parametro rappresentante i percorsi
         * disponibili, contiene le informazioni sotto forma di coppie
         * chiave/valore, come chiave viene utilizzato l'<tt>id</tt> e
         * come valore il nome.
         * @returns {void}
         * @memberOf Front-End::Controllers.ProjectsListController
         */
        $scope.showPaths = function (projectId, paths) {

            //Creo lo scope isolato da passare al dialog
            var dialogScope = $scope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.projectId = projectId;
            dialogScope.paths = paths;
            dialogScope.onPlay=$scope.onPlay;


            $mdDialog.show({
                scope: dialogScope,
                templateUrl: 'app/directives/projectsList/pathsList.html',
                controller: function ($scope, $mdDialog){
                    console.log($scope.paths);
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.selectedPath = function (pathId) {
                        $mdDialog.hide();
                        $scope.onPlay({
                            pathId:pathId,
                            projectId:$scope.projectId
                        });
                    };
                }
            });
        };

        /**
         * @function deleteWithConfirm
         * @instance
         * @desc Metodo che gestisce la cancellazione di un progetto dalla
         * lista dei progetti. Prima di effettuare la cancellazione richiede
         * all'utente la conferma dell'operazione.
         * @param {MouseEvent} ev - Parametro che rappresenta l'evento del
         * browser che ha causato l'invocazione del metodo.
         * @param {String} projectId - Parametro che rappresenta l'<tt>id</tt>
         * del progetto da cancellare.
         * @returns {void}
         * @memberOf Front-End::Controllers.ProjectsListController
         */
        $scope.deleteWithConfirm = function (ev,projectId){
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Sei sicuro di vole cancellare il progetto?')
                .content('Una volta cancellato non avrai più modo di' +
                ' recuperarlo.')
                .ariaLabel('Conferma cancellazione')
                .ok('Conferma cancellazione')
                .cancel('Annulla')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                console.log(projectId);
                $scope.onDelete({projectId: projectId});
            });
        };
    }
})();
