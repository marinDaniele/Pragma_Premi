/**
 * @class AssociationAdderController
 * @classdesc Classe che gestisce il funzionamento della directive
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFO4.2, RFO4.2.6
 * premiAssociationAdder.
 * @memberOf Premi.Front-End.Controllers
 */
(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('AssociationAdderController', associationAdderController);
    associationAdderController.$inject = ['$scope','$mdDialog'];

    function associationAdderController($scope,$mdDialog) {
        // Variabile contenente l'id del nodo selezionato dall'utente
        $scope.selectedNodeId = '';

        /**
         * @function confirmDisabled
         * @instance
         * @desc Metodo che ritorna un booleano che specifica se il pulsante di
         * conferma è abilitato o meno.
         * @returns {Boolean}
         * @memberOf Premi.Front-End.Controllers.AssociationAdderController
         */
        $scope.confirmDisabled = function (){
            return $scope.selectedNodeId === '';
        };

        /**
         * @function confirmClicked
         * @instance
         * @desc Metodo che gestisce l'evento di click sul pulsante di conferma
         * di aggiunta dell'associazione. Questo metodo invoca la funzione
         * <tt>$scope.onNodeSelected</tt> e nasconde la directive.
         * @returns {void}
         * @memberOf Premi.Front-End.Controllers.AssociationAdderController
         */
        $scope.confirmClicked = function () {
            $scope.onNodeSelected({nodeId: $scope.selectedNodeId});
            $mdDialog.hide();
        };

        /**
         * @function cancelClicked
         * @instance
         * @desc Metodo che gestisce l'evento click sul pulsante per annullare
         * l'aggiunta dell'associazione. Si occupa di nascondere la directive.
         * @returns {void}
         * @memberOf Premi.Front-End.Controllers.AssociationAdderController
         */
        $scope.cancelClicked = function () {
            $mdDialog.cancel();
        };

    }
})();
