/**
 * @class PathsEditorController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante la gestione dei
 * percorsi di presentazione definiti sulla mappa mentale.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-16 Requisiti: RFD4.4
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('PathsEditorController', pathsEditorController);

    pathsEditorController.$inject = ['$scope','pathService','mindmapService',
        '$mdDialog'];

    function pathsEditorController($scope, pathService, mindmapService,
                                   $mdDialog){
        //Inizializzazione
        $scope.currentPath = null;
        $scope.currentNode = null;
        $scope.pathNames = [];
        $scope.pathSelected = false;

        $scope.$on('$destroy',destructor);

        pathService.getPathNames()
            .then(function (paths){
                $scope.pathNames = paths;
            },function (error){
                $scope.$emit('premi-error',error);
            });

        mindmapService.listen('node-select',nodeSelected);
        mindmapService.listen('node-deselect', nodeDeselected);
        /**
         * @function nodeSelected
         * @instance
         * @desc Metodo che gestisce l'evento di selezione di un nodo, viene
         * invocato come gestore dell'evento sollevato da
         * <tt>MindmapService</tt>. Si occupa di aggiornare lo <tt>$scope</tt>
         * con i dati del nodo selezionato dall'utente e di rendere visibile la
         * directive per l'aggiunta del nodo selezionato ad un percorso di
         * presentazione.
         * @param {String} nodeId - Parametro contenente l'id del nodo
         * selezionato.
         * @param {MouseEvent} e - Parametro contenente i dati dell'evento
         * click sollevato dal browser.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        function nodeSelected(e,nodeId){
            console.log('node selected');
            $scope.currentNode = mindmapService.getNode(nodeId);
            console.log($scope.currentNode);
            $scope.$broadcast('show-add-to-path',[]);
            //Creo lo scope isolato da passare al dialog
            var dialogScope = $scope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.currentNode = $scope.currentNode;
            dialogScope.pathNames = $scope.pathNames;
            console.log($scope.pathNames);
            dialogScope.addNodeToPathClicked = addNodeToPathClicked;

            $mdDialog.show({
                scope: dialogScope,
                template:
                '<md-dialog aria-label="aggiungi associazione">' +
                '  <md-dialog-content>'+
                ' <premi-add-to-path node="currentNode"'+
                'paths="pathNames"'+
                'on-add="addNodeToPathClicked(pathId,nodeId)">'+
                '</premi-add-to-path>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });
        }
        /**
         * @function nodeDeselected
         * @instance
         * @desc Metodo che deseleziona il nodo corrente, impostato l'oggetto
         * <tt>currentNode</tt> a <tt>null</tt>. Questo metodo viene invocato
         * come gestore dell'evento <tt>node-delesect</tt> di
         * <tt>MindmapService</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        function nodeDeselected() {
            $scope.currentNode = null;
        }
        /**
         * @function destructor
         * @instance
         * @desc Metodo che gestisce l'evento <tt>destroy</tt> del controller,
         * viene utilizzato per interrompere l'ascolto degli eventi di
         * <tt>MindmapService</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        function destructor(){
            console.log('pathsEditorController - distruttore chiamato');
            mindmapService.stopListen('node-select',nodeSelected);
            mindmapService.stopListen('node-deselect', nodeDeselected);
        }
        /**
         * @function addNodeToPathClicked
         * @instance
         * @desc Metodo che gestisce l'evento di aggiunta di un nodo ad un
         * percorso di presentazione. Aggiunge il nodo identificato da
         * <tt>nodeId</tt> in coda al percorso con <tt>id</tt> uguale a
         * <tt>pathId</tt>.
         * @param {String} nodeId - Parametro contenente l'id del nodo da
         * aggiungere al percorso di presentazione.
         * @param {String} pathId - Parametro contenente l'<tt>id</tt> del
         * percorso di presentazione al quale aggiungere il nodo.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        function addNodeToPathClicked(pathId, nodeId){
            pathService.addNodeToPath(nodeId,pathId)
                .then(function (){
                    //Controllo se devo aggiornare il percorso corrente
                    if ($scope.currentPath !== null &&
                        $scope.currentPath.getId() === pathId){
                        var addedNode = mindmapService.getNode(nodeId);
                        $scope.currentPath.addStep(nodeId,
                                                   addedNode.getTitle());
                    }
                },function (error){
                    $scope.$emit('premi-error',error);
                });
        }
        /* --- PARTE RELATIVA ALLA LISTA DEI PERCORSI --- */
        /**
         * @function selectPath
         * @instance
         * @desc Metodo che imposta il percorso corrente come riferimento al
         * parametro <tt>path</tt>.
         * @param {Path} path - Parametro che rappresenta il percorso di
         * presentazione selezionato dall'utente.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        $scope.selectPath = function (path){
            $scope.currentPath = path;
            $scope.pathSelected = true;
        };
        /**
         * @function deselectPath
         * @instance
         * @desc Metodo che deseleziona il percorso di presentazione
         * precedentemente selezionato.
         * @returns {void}
         * @memberOf Front-End::Controllers.PathsEditorController
         */
        $scope.deselectPath = function (){
            //aggiorno il nome dei percorsi
            var editedName = $scope.currentPath.getName();
            var currentId = $scope.currentPath.getId();
            //Aggiorno il nome del percorso nella lista
            for (var i = 0; i < $scope.pathNames.length; i++){
                //Se l'ho trovato aggiorno il nome ed esco dal ciclo
                if ($scope.pathNames[i]._id === currentId){
                    $scope.pathNames[i].name = editedName;
                    i = $scope.pathNames.length+1; //Forzo l'uscita dal ciclo
                }
            }
            $scope.currentPath = null;
            $scope.pathSelected = false;
        };
    }
})();
