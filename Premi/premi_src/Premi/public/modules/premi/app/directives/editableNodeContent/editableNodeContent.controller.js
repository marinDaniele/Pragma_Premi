/**
 * @class EditableNodeContentController
 * @classdesc Classe che gestisce la logica della directive
 * <tt>premiEditableNodeContent</tt>. Questa classe registra un
 * gestore per l'evento nodecontent-deselect che imposta come
 * de-selezionata la directive.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFD4.2.3.9, RFD4.2.3.10,
 * RFF4.2.3.11, RFD4.2.3.18, RFD4.2.3.19, RFD4.2.3.20
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('EditableNodeContentController',
        editableNodeContentController);

    editableNodeContentController.$inject = ['$scope'];

    function editableNodeContentController($scope){

        $scope.isSelected = false;

        $scope.$on('nodecontent-deselect', function (event,nodeContentId){
            if ($scope.nodeContent.getId() === nodeContentId){
                $scope.isSelected = false;
            }
        });

        /**
         * @function selected
         * @instance
         * @desc Metodo che gestisce la selezione dell'elemento da parte
         * dell'utente.
         * Questo metodo solleva l'evento <tt>nodecontent-selected</tt>
         * fornendo l'id dell'oggetto NodeContent
         * rappresentato dalla directive.
         * @returns {void}
         * @memberOf Front-End::Controllers.EditableNodeContentController
         */
        $scope.selected = function (event){
            event.stopPropagation();
            $scope.$emit('nodecontent-selected',
                {id:$scope.nodeContent.getId()});
            $scope.isSelected = true;
        };

    }
})();
