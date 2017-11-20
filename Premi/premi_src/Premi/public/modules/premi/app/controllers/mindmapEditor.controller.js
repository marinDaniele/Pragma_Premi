/**
 * @class MindmapEditorController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante la modifica di una mappa.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-16 Requisiti: RFO4.2, RFO4.2.1, RFO5, RFD22
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('MindmapEditorController', mindmapEditorController);

    mindmapEditorController.$inject = ['$scope', '$mdDialog', 'mindmapService',
        'projectService'];

    function mindmapEditorController($scope, $mdDialog, mindmapService,
                                     projectService){

        $scope.associableNodeList = null;
        $scope.currentNode = null;

        // --- Listeners
        $scope.$on('$destroy',destructor);
        mindmapService.listen('node-select',nodeSelected);
        mindmapService.listen('node-deselect', nodeDeselected);
        mindmapService.listen('association-select',relationSelected);
        //Potrebbe non servire

        // --- Metodi relativi alle associazioni
        /**
         * @function relationSelected
         * @instance
         * @desc Metodo che gestisce l'evento di selezione di una relazione,
         * viene invocato come gestore dell'evento sollevato da
         * <tt>MindmapService</tt>. Si occupa di aggiornare i dati del menù di
         * modifica di una relazione e di visualizzare il menù contestuale per
         * la modifica di un'associazione.
         * @param {MouseEvent} e - Parametro contenente i dati dell'evento click
         * sollevato dal browser.
         * @param {String} edgeId - Parametro contenente l'<tt>id</tt>
         * dell'associazione selezionata dall'utente.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        function relationSelected(e,edgeId){
            console.log('edge menu handler chiamato '+edgeId);
            $scope.currentNode = null;
            var functions = [deleteAssociationFun];
            showContextMenu(edgeId,functions);
        }
        /**
         * @function startAddAssociation
         * @instance
         * @desc Metodo che viene invocato quando l'utente seleziona la voce del
         * menù che permette di aggiungere un'associazione uscente dal nodo
         * selezionato.
         * @param {String} sourceId - Parametro contenente l'id del nodo
         * sorgente della descrizione.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.startAddAssociation = function (sourceId){
            console.log('startAddAssociation - withSourceId: '+sourceId);
            //Creo lo scope isolato da passare al dialog
            var dialogScope = $scope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.associableNodeList = $scope.associableNodeList;
            dialogScope.addAssociationClicked = $scope.addAssociationClicked;
            $mdDialog.show({
                scope: dialogScope,
                template:
                '<md-dialog aria-label="aggiungi associazione">' +
                '  <md-dialog-content>'+
                ' <premi-association-adder nodes="associableNodeList"'+
                'on-node-selected="addAssociationClicked(nodeId)">'+
                '</premi-association-adder>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });
        };
        /**
         * @function addAssociationClicked
         * @instance
         * @desc Metodo che gestisce l'evento di creazione di un'associazione
         * tra due nodi. Per creare l'associazione è necessario utilizzare
         * <tt>AssociationService</tt>, l'informazione riguardante l'origine è
         * disponibile nell'oggetto <tt>$scope.currentNode</tt>.
         * @param {String} destId - Parametro contenente l'id del nodo
         * destinazione dell'associazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.addAssociationClicked = function (destId){
            mindmapService.addAssociation($scope.currentNode.getId(), destId)
                .catch(function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function deleteRelationClicked
         * @instance
         * @desc Metodo che gestisce l'evento di cancellazione di
         * un'associazione. Utilizza <tt>MindmapService</tt> per cancellare
         * l'associazione dato l'id.
         * @param {String} associationId - Parametro contenente l'id
         * dell'associazione da cancellare.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.deleteRelationClicked = function (associationId){
            console.log('delete relation clicked '+associationId);
            mindmapService.deleteAssociation(associationId)
                .catch(function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        // --- Metodi relativi ai nodi
        /**
         * @function nodeSelected
         * @instance
         * @desc Metodo che gestisce l'evento di selezione di un nodo, viene
         * invocato come gestore dell'evento sollevato da
         * <tt>MindmapService</tt>. Si occupa di aggiornare lo <tt>$scope</tt>
         * con i dati del nodo selezionato dall'utente e di visualizzare il menù
         * contestuale in modo da permettere all'utente di modificare il nodo.
         * @param {MouseEvent} e - Parametro contenente i dati dell'evento
         * @param {String} nodeId - Parametro contenente l'id del nodo
         * selezionato dall'utente.
         * click sollevato dal browser.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        function nodeSelected(e,nodeId){
            $scope.currentNode = mindmapService.getNode(nodeId);
            $scope.associableNodeList = mindmapService
                                            .getAssociableNodeList(nodeId);

            var functions;
            if (nodeId === projectService.getCurrentProject().getRootId()){
                functions = [editNodeFun, addChildFun, addAssociationFun];
            }else{
                functions = [editNodeFun, addChildFun, deleteNodeFun,
                    addAssociationFun];
            }

            showContextMenu(nodeId,functions);

        }
        /**
         * @function nodeDeselected
         * @instance
         * @desc Metodo che deseleziona il nodo corrente.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        function nodeDeselected() {
            $scope.currentNode = null;
        }
        /**
         * @function addNodeClicked
         * @instance
         * @desc Metodo che gestisce l'evento di aggiunta di un nuovo nodo alla
         * mappa mentale. Utilizza <tt>MindmapService</tt> per aggiungere un
         * nodo vuoto alla mappa mentale, come figlio del nodo passato per
         * parametro.
         * @param {String} parentId - Parametro contenente l'id del nodo al
         * quale bisogna aggiungere un nuovo figlio.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.addNodeClicked = function (parentId){
            console.log('add node to:' +parentId);
            mindmapService.addNode(parentId)
                .catch(function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function deleteNodeClicked
         * @instance
         * @desc Metodo che gestisce l'evento di cancellazione di un nodo.
         * Utilizza <tt>MindmapService</tt> per cancellare il nodo dalla mappa
         * mentale.
         * @param {String} nodeId - Parametro contenente l'id del nodo da
         * cancellare.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.deleteNodeClicked = function (nodeId){
            console.log('Delete node clicked '+nodeId);
            mindmapService.deleteNode(nodeId)
                .then(function (){
                    mindmapService.drawMap();
                }, function (error){
                    $scope.$emit('premi-error',error);
                });
        };
        /**
         * @function editNodeClicked
         * @instance
         * @desc Metodo che gestisce l'evento <tt>click</tt> sul pulsante che
         * permette di modificare il contenuto del nodo presente nel campo dati
         * <tt>currentNode</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.editNodeClicked = function (){
            var dialogScope = $scope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.resetEdit = $scope.resetNodeEdit;
            dialogScope.confirmEdit = $scope.confirmNodeEditClicked;
            dialogScope.node = $scope.currentNode;
            console.log(dialogScope);
            $mdDialog.show({
                scope: dialogScope,
                template:
                '<md-dialog style="width: 90%; height:90%;" ' +
                'aria-label="Modifica nodo">' +
                '  <md-dialog-content style="width: 100%; height:100%;">'+
                '<premi-node-contents-editor node="node"'+
                'on-reset="resetEdit()"'+
                'on-confirm="confirmEdit()">'+
                '</premi-node-contents-editor>'+
                '  </md-dialog-content>' +
                '</md-dialog>'

            });
        };

        /**
         * @function confirmNodeEditClicked
         * @instance
         * @desc Metodo che gestisce l'evento di conferma della modifica di un
         * nodo. Rende permanenti le modifiche subite dall'oggetto nodo
         * presente
         * nello <tt>$scope</tt>. Utilizza <tt>MindmpaService</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.confirmNodeEditClicked = function (){
            //console.log('aggiorno nodo');
            //console.log($scope.currentNode);
            mindmapService.updateNode($scope.currentNode);

        };
        /**
         * @function resetNodeEdit
         * @instance
         * @desc Metodo che gestisce l'evento di reset dei campi di modifica di
         * un nodo. Ripristina il <tt>currentNode</tt> presente nello
         * <tt>$scope</tt> utilizzando i dati recuperati da
         * <tt>MindMapService</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        $scope.resetNodeEdit = function (){
            console.log('reset node edit');
            //ricarico il nodo.
            $scope.currentNode = mindmapService.getNode(
                                    $scope.currentNode.getId());
        };
        // --- Metodi generici ---
        /**
         * @function destructor
         * @instance
         * @desc Metodo che gestisce l'evento <tt>destroy</tt> del controller,
         * viene utilizzato per interrompere l'ascolto degli eventi di
         * <tt>MindmapService</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        function destructor(){
            console.log('distruttore chiamato');
            mindmapService.stopListen('node-select',nodeSelected);
            mindmapService.stopListen('node-deselect', nodeDeselected);
            mindmapService.stopListen('association-select',relationSelected);
        }
        /**
         * @function showContextMenu
         * @instance
         * @desc Metodo che visualizza il menù contestuale.
         * @param {String} id - Parametro che rappresenta l'<tt>id</tt>
         * dell'oggetto sul quale viene visualizzato il menù.
         * @param {Array} functions - Parametro che contiene un <tt>Array</tt>
         * di oggetti rappresentanti le voci del menù. Ogni oggetto ha due campi
         * dati: <tt>name</tt> e <tt>callback</tt>, il primo campo dati
         * specifica il testo associato alla voce del menù e il secondo
         * rappresenta la funzione da chiamare quando l'utente seleziona la
         * voce.
         * @returns {void}
         * @memberOf Front-End::Controllers.MindmapEditorController
         */
        function showContextMenu(id, functions) {
            console.log('showContextMenu');
            //Creo lo scope isolato da passare al dialog
            var dialogScope = $scope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.id = id;
            dialogScope.functions = functions;
            dialogScope.node = $scope.currentNode;
            console.log(dialogScope);

            var template = '<md-dialog id="contextMenu" ' +
                'aria-label="Mindmap context menu" layout-padding>' +
                '  <md-dialog-content class="sticky-container" ' +
                'layout="column" layout-align="center center">'+
                ' <premi-context-menu object-id="{{id}}"'+
                'operations="functions" node="node">'+
                '</premi-context-menu>'+
                '  </md-dialog-content>' +
                '</md-dialog>';
            console.log(template);
            $mdDialog.show({
                scope: dialogScope,
                template:template
            });
        }
        /* Dati per i menù*/
        var editNodeFun = {};
        editNodeFun.name='Modifica nodo';
        editNodeFun.callback = $scope.editNodeClicked;
        editNodeFun.image='assets/img/edit_node.svg';

        var addChildFun = {};
        addChildFun.name = 'Aggiungi nodo figlio';
        addChildFun.callback = $scope.addNodeClicked;
        addChildFun.image = 'assets/img/add_node.svg';
        
        var deleteNodeFun = {};
        deleteNodeFun.name = 'Cancella nodo';
        deleteNodeFun.callback = $scope.deleteNodeClicked;
        deleteNodeFun.image = 'assets/img/delete_node.svg';
        
        var addAssociationFun = {};
        addAssociationFun.name = 'Aggiungi associazione';
        addAssociationFun.callback = $scope.startAddAssociation;
        addAssociationFun.image = 'assets/img/add_association.svg';
        var deleteAssociationFun = {};
        deleteAssociationFun.name = 'Cancella associazione';
        deleteAssociationFun.callback = $scope.deleteRelationClicked;
        deleteAssociationFun.image = 'assets/img/delete_node.svg';
    }
})();
