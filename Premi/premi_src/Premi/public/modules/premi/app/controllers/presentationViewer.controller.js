/**
 * @class PresentationViewerController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante l’esecuzione di un percorso di presentazione.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-15 Requisiti: RFO7, RFD7.1, RFO7.2, RFO7.3,
 * RFD7.5, RFO8, RFO9, RFD17, RFD7.6, RFD7.6.1, RFD7.6.2
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('PresentationViewerController', presentationViewerController);

    presentationViewerController.$inject = ['$scope','$location','$q',
        '$routeParams', 'presentationService','projectService', '$mdDialog'];

    function presentationViewerController($scope, $location, $q,
                                          $routeParams, presentationService,
                                          projectService, $mdDialog) {

        $scope.nodes = null;
        $scope.nodesIndex = null;
        $scope.currentPath = null;
        $scope.currentNode = null;

        $scope.fullscreen = false;
        $scope.linearPresentation = true; //Presentazione lineare o meno
        $scope.sidenavOpen = false;

        $scope.currentIndex = 0;
        $scope.presentationLength = 0;



        //Caricamento dei dati
        //Promessa per il caricamento dei nodi
        var nodePromise = presentationService.getNodes($routeParams.pathId)
            .then(function (presentationData){
                $scope.nodes = presentationData.nodes;
                $scope.nodesIndex = presentationData.index;
                $scope.currentNode = $scope.nodes[0];
            });
        //Promessa per il caricamento del percorso
        var pathPromise = presentationService.getPath($routeParams.pathId)
            .then(function (path){
                $scope.currentPath=path;
                $scope.presentationLength = path.getSteps().length;
                console.log(path);
            });
        //Quando entrambe le promesse sono state risolte inizializzo la
        //presentazione.
        $q.all([nodePromise,pathPromise])
            .then(function (){
                if ($scope.currentPath.getSteps().length === 0){
                    var confirm = $mdDialog.confirm()
                        .parent(angular.element(document.body))
                        .title('Percorso di presentazione vuoto')
                        .content('È stato selezionato un percoso di' +
                        ' presentazione vuoto, non è possibile avviare la' +
                        ' presentazione')
                        .ariaLabel('Percorso di presentazione vuoto')
                        .ok('Torna alla dashboard');
                    $mdDialog.show(confirm).finally(function () {
                        $location.path('/dashboard');
                    });
                }else{
                    $scope.$broadcast('presentation-init',[]);
                    /* Codice per lo scroll automatico
                     setInterval(function (){
                     $scope.$broadcast('presentation-nextStep');
                     },2000);
                     */
                }

            })
            .catch(function (error){
                $scope.$emit('premi-error',error);
            });

        $scope.$on('presentation-goingToNode',function (evt,args){
            $scope.currentIndex = args.index;
            $scope.nodeChanged(args.node);
        });

        /**
         * @function resumePresentation
         * @instance
         * @desc Funzione che ripristina la presentazione lineare dopo che
         * l'utente ha navigato ad un frame fuori dalla presentazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.resumePresentation = function (){
            $scope.linearPresentation = true;
            $scope.$broadcast('presentation-resumeLinear');
        };

        //Funzione per saltare ad un determinato nodo dato l'id
        /**
         * @function jumpToNode
         * @instance
         * @desc Funzione che gestisce il passaggio da un frame ad un frame
         * correlato, permettendo di ottenere una presentazione non lineare.
         * @param {String} nodeId - Parametro contenente l'id del nodo che sta
         * per essere visualizzato.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.jumpToNode = function (nodeId){
            //console.log('jumping to '+nodeId);
            $scope.$broadcast('presentation-goToId',nodeId);
            $scope.linearPresentation=false;
        };
        /**
         * @function nodeChanged
         * @instance
         * @desc Funzione che gestisce l'evento di passaggio da un frame
         * all'altro, si occupa di aggiornare le informazioni riguardanti il
         * nodo correntemente visualizzato.
         * @param {PresentationNode} node - Parametro contenente il nodo che sta
         * per essere visualizzato.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.nodeChanged = function (node){
            $scope.currentNode = node;
        };
        /**
         * @function nextStep
         * @instance
         * @desc Metodo che fa passare la presentazione alla slide successiva,
         * emettendo l'evento <tt>presentation-nextStep</tt>
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.nextStep = function () {
            if ($scope.linearPresentation) {
                $scope.currentIndex++;
                $scope.$broadcast('presentation-nextStep');
            }
        };
        /**
         * @function previousStep
         * @instance
         * @desc Metodo che fa passare la presentazione alla slide precedente,
         * emettendo l'evento <tt>presentation-previousStep</tt>
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.previousStep = function () {
            if ($scope.linearPresentation) {
                $scope.currentIndex--;
                $scope.$broadcast('presentation-previousStep');
            }
        };
        /**
         * @function printPresentation
         * @instance
         * @desc Metodo che si occupa di visualizzare la pagina di stampa per la
         * presentazione in corso.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.printPresentation = function () {
            //manca il check se $scope.nodes e $scope.currentPath sono caricati
            console.log('print called');

            var windowTop = 100;
            var windowLeft = (window.screen.width / 2) - 150;

            var popupWin = window.open('', '_blank', 'width=300,height=300,' +
                'top='+windowTop+',left='+windowLeft);

            var htmlPageContent = '';

            //recupero le classi css del progetto
            var projectClasses = projectService.getStyle();

            var pathLenght = $scope.currentPath.getSteps().length;
            for(var i=0; i< pathLenght; i++){
                var node = $scope.nodes[i];
                var nodeDiv = '<div class="slide-print '+ projectClasses +'">';
                var nodeContents = node.getContents();
                for (var j = 0; j <nodeContents.length;j++){
                    var content = nodeContents[j];
                    var inlineStyle = '';
                    var styles = content.getStyle();
                    for(var style in styles){
                        if (styles.hasOwnProperty(style)){
                            inlineStyle+=style+':'+ styles[style] +'; ';
                        }
                    }
                    var contentDiv = '<div class="content '+ content.getType() +
                        '" style="'+inlineStyle+'">';
                    //aggiungo il contenuto
                    if (content.getType() === 'imgUrl'){
                        contentDiv += '<img class="content '+content.getType()+
                            '" src="'+content.getContent()+'"/>';
                    } else {
                        contentDiv += content.getContent();
                    }

                    contentDiv += '</div>';
                    nodeDiv += contentDiv;
                }
                nodeDiv += '</div>';


                console.log('creato div');
                console.log(nodeDiv);
                if (i % 2 === 1){
                    console.log('aggiungo pagebreak');
                    nodeDiv += '<div class="print-page-break"></div>';
                }
                htmlPageContent += nodeDiv;
            }
            console.log(htmlPageContent);


            popupWin.document.open();
            popupWin.document.write('<html><head>' +
            '<link rel="stylesheet" type="text/css" ' +
                'href="assets/css/presentationPrint.css" />' +
            '<link rel="stylesheet" type="text/css" ' +
                'href="assets/css/projects.css" />' +
                /*Css per lo stile del progetto*/
            '</head><body onload="window.print(); window.close();">' +
            htmlPageContent +
            '</html>');
            popupWin.document.close();
        };

        /**
         * @function toggleSidenav
         * @instance
         * @desc Metodo che inverte il valore del campo dati
         * <tt>sidenavOpen</tt>.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.toggleSidenav = function () {
            $scope.sidenavOpen = !$scope.sidenavOpen;
        };

        /**
         * @function quitPresentation
         * @instance
         * @desc Metodo che termina la presentazione in corso e che rimanda
         * l'utente alla pagina per la modifica dei percorsi di presentazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.quitPresentation = function (){
            if ($scope.fullscreen) {
                $scope.fullscreen = false;
                $scope.$emit('premi-fullscreen-off');
            }
            $location.path('/paths');
        };

        /**
         * @function quitToDashboard
         * @instance
         * @desc Metodo che termina la presentazione in corso e che rimanda
         * l'utente alla pagina iniziale.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.quitToDashboard = function (){
            if ($scope.fullscreen) {
                $scope.fullscreen = false;
                $scope.$emit('premi-fullscreen-off');
            }
            $location.path('/dashboard');
        };

        /**
         * @function showManual
         * @instance
         * @desc Metodo che visualizza il pop-up contenente il manuale utente.
         * @param {MouseEvent} ev - Parametro contenente le informazioni
         * relative all'evento del browser che ha portato all'invocazione del
         * metodo.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.showManual = function (ev){
            $mdDialog.show({
                controller: function ($scope, $mdDialog) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: '/app/views/manuale/presentation.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev
            });
        };

        /**
         * @function setFullscreen
         * @instance
         * @desc Metodo che permette di entrare oppure uscire dalla modalità a
         * schermo intero, se il parametro ricevuto è <tt>true</tt> viene
         * attivata la modalità a schermo interno, altrimenti se è
         * <tt>false</tt> viene disattivata.
         * @param {Boolean} on - Parametro che specifica se entrare oppure
         * uscire dalla modalità a schermo intero.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationViewerController
         */
        $scope.setFullscreen = function (on) {
            $scope.fullscreen = on;
            if (on) {
                $scope.sidenavOpen = false;
                $scope.$emit('premi-fullscreen-on');
            }
            else {
                $scope.$emit('premi-fullscreen-off');
            }
        };

    }
})();
