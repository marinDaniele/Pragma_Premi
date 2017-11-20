/**
 * @class AddToPathController
 * @classdesc Classe che si occupa di gestire la logica di funzionamento della
 * directive premiAddToPath.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFD4.3.2, RFD4.4.1
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('AddToPathController', addToPathController);

    addToPathController.$inject = ['$scope','$mdDialog'];

    /**
     * @class AddToPathController
     * @desc Classe che si occupa di gestire la logica di funzionamento della 
     * directive premiAddToPath.
     * @memberOf Front-End::Controllers
     */
    function addToPathController($scope,$mdDialog){

        /* SCOPE:
        * node:'=', //Nodo da visualizzare
        * paths:'=',
        * onAdd:'&' */
        $scope.selectedPathId = '';

        /**
         * @function cancelClicked
         * @instance
         * @desc Metodo che gestisce l'evento click sul pulsante che annulla 
         * l'aggiunta del nodo al percorso di presentazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.AddToPathController
         */
        $scope.cancelClicked = function (){
            $mdDialog.cancel();
        };

        /**
         * @function addButtonDisabled
         * @instance
         * @desc Metodo che ritorna un valore booleano che specifica se il 
         * pulsante di conferma è abilitato o meno.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.AddToPathController
         */
        $scope.addButtonDisabled = function (){
            return $scope.selectedPathId === '';
        };

        /**
         * @function addClicked
         * @instance
         * @desc Metodo che gestisce l'evento click sul pulsante per confermare 
         * l'aggiunta del nodo al percorso di presentazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.AddToPathController
         */
        $scope.addClicked = function (){
            $scope.onAdd({
                pathId:$scope.selectedPathId,
                nodeId:$scope.node.getId()
            });
            $mdDialog.hide();
        };
    }
})();
