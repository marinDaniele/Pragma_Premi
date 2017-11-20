/**
 * @class NodeContentsEditorController
 * @classdesc Classe che si occupa di gestire la logica legata alla modifica del
 * contenuto di un nodo.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5,
 * RFO4.2.3.5.2, RFO4.2.3.5.1, RFO4.2.3.7, RFO4.2.3.12, RFO4.2.3.13,
 * RFD4.2.3.15, RFD4.2.3.16
 * @memberOf Fron-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('NodeContentsEditorController',
            NodeContentsEditorController);

    NodeContentsEditorController.$inject = ['$scope','$mdDialog', 'projectService'];

    function NodeContentsEditorController($scope, $mdDialog, projectService){
        var oldContent = '';
        $scope.selectedNodeContent = null;
        $scope.classString = projectService.getStyle();
        $scope.canDeleteNodeContent = true;

        $scope.$on('nodecontent-selected',function (event,args){
            console.log(args);
            /*Se c'è un contenuto selezionato gli comunico con un evento di
            deselezionarsi*/
            if ($scope.selectedNodeContent &&
                $scope.selectedNodeContent.getContent() === ''
            ){
                $scope.selectedNodeContent.content=oldContent;
            }
            if ($scope.selectedNodeContent) {
                $scope.$broadcast('nodecontent-deselect',
                    $scope.selectedNodeContent.getId());
            }
            $scope.selectedNodeContent = $scope.node.getContent(args.id);
            oldContent = $scope.selectedNodeContent.getContent();
            $scope.canDeleteNodeContent =
                $scope.selectedNodeContent.getType() !== 'title';
        });
        /**
         * @function deleteNodeContent
         * @instance
         * @desc Metodo che rimuove dall'oggetto node presente nello $scope}
         * l'oggetto selectedNodeContent.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.deleteNodeContent = function (){
            $scope.node.removeContent($scope.selectedNodeContent.getId());
            $scope.selectedNodeContent = null;
        };
        /**
         * @function addTextContent
         * @instance
         * @desc Metodo che aggiunge all'oggetto node presente nello $scope un
         * nuovo contenuto di tipo testuale.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.addTextContent = function (){
            $scope.node.addText();
            /*E' necessario fare il broadcast del deselect altrimenti si
            verificano situazioni inconsistenti*/
            if ($scope.selectedNodeContent) {
                $scope.$broadcast('nodecontent-deselect',
                    $scope.selectedNodeContent.getId());
                $scope.selectedNodeContent = null;
            }
            /* per semplicità il nuovo elemento non viene selezionato
             $scope.selectedNodeContent = newContent;*/
        };

        /**
         * @function addImageContent
         * @instance
         * @desc Metodo che aggiunge all'oggetto <tt>node</tt> presente nello
         * $scope un nuovo contenuto di tipo immagine.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.addImageContent = function (){
            //var newContent =
            $scope.node.addImage();
            /*E' necessario fare il broadcast del deselect altrimenti si
            verificano situazioni inconsistenti*/
            if ($scope.selectedNodeContent) {
                $scope.$broadcast('nodecontent-deselect',
                    $scope.selectedNodeContent.getId());
                $scope.selectedNodeContent = null;
            }
        };
        /**
         * @function slideClicked
         * @instance
         * @desc Metodo che gestisce l'evento <tt>click</tt> sulla slide,
         * deselezionando l'elemento correntemente selezionato.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.slideClicked = function (event){
            //Se editableNodeContent non ferma la propagazione dell'evento
            // click, viene invocata anche questa funzione
            //facendo diventare inutile il select.
            //Occhio quindi che se c'è qualche bug, questa potrebbe essere la
            //causa.
            event.preventDefault();
            if ($scope.selectedNodeContent !== null){
                $scope.$broadcast('nodecontent-deselect',
                    $scope.selectedNodeContent.getId());
                $scope.selectedNodeContent = null;
            }
        };
        /**
         * @function cancelClicked
         * @instance
         * @desc Metodo che gestisce il click dell'utente sul pulsante per 
         * annullare le modifiche. Questo metodo invoca la funzione 
         * <tt>$scope.onReset</tt> e nasconde la directive.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.cancelClicked = function (){
            $scope.onReset();
            $scope.selectedNodeContent = null;
            $mdDialog.cancel();
        };
        /**
         * @function saveClicked
         * @instance
         * @desc Metodo che gestisce il click dell'utente sul pulsante di 
         * conferma delle modifiche. Questo metodo invoca la funzione 
         * <tt>$scope.onConfirm</tt> e nasconde la directive.
         * @returns {void}
         * @memberOf Fron-End::Controllers.NodeContentsEditorController
         */
        $scope.saveClicked = function (){
            $scope.onConfirm();
            $scope.selectedNodeContent = null;
            $mdDialog.hide();
        };
    }
})();
