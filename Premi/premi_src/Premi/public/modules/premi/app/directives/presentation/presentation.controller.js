/**
 * @class PresentationController
 * @classdesc Classe che si occupa di gestire la logica della presentazione di
 * un percorso. La gestione della
 * presentazione funziona mediante l'emissione e l'ascolto di determinati
 * eventi.
 * In particolare questa classe registra dei <i>listeners</i> nell'oggetto
 * <tt>$scope</tt> per i seguenti eventi:
 * <ul>
 * <li> <tt>presentation-previousStep</tt>: per tornare alla slide precedente;
 * </li>
 * <li> <tt>presentation-nextStep</tt>: per passare alla slide successiva;</li>
 * <li> <tt>presentation-goToId</tt>: per passare alla slide contenente il nodo
 * avente <tt>id</tt> uguale a quello associato all'evento;</li>
 * <li> <tt>presentation-resumeLinear</tt>: per riprendere la
 * presentazione lineare dopo che si è verificato l'evento
 * <tt>presentation-goToId</tt>.</li>
 * </ul> Viene inoltre  sollevato nello <tt>$scope</tt> l'evento
 * <tt>presentation-goingToNode</tt> con l'identificativo del nodo che sta per
 * essere visualizzato ogni volta che si verifica un cambio slide.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFO7, RFO7.2, RFO7.3, RFD7.6
 * @memberOf Front-End::Controllers
 */
(function () {
    'use strict';
    angular
        .module('premi.controllers')
        .controller('PresentationController', presentationController);

    presentationController.$inject = ['$scope'];

    function presentationController($scope) {
        /* StarWars Audio*/
        /*var audio = document.createElement('audio');
        audio.src = '/assets/starwars/theme.mp3';
        audio.play(); // Start playback of the url
        /**/

        //Variabili che ricevo nello $scope
        //$scope.nodes array di presentationNodes
        //$scope.nodesIndex: {nodeId:[i1, i2...]}
        //$scope.path oggetto path per il boundcheck

        $scope.currentStepIndex = 0;
        var presentationBookmark=0; //Ultima posizione della
        // presentazione visualizzata visualizzato del percorso
        var linearPresentation = true;

        //Per la storia del caricamento asincrono, $scope.nodes delle volte
        // non è definito
        if ($scope.nodes !== undefined && $scope.nodes !== null) {
            emitGoingToNode($scope.currentStepIndex);
        }

        $scope.$on('presentation-init', function (){
            if ($scope.nodes !== undefined && $scope.path !== undefined){
                console.log('inizializzo impress');
                setTimeout($scope.initImpress,100);
            }else{
                console.log('inizializzazione avvenuta troppo presto');
            }
        });

        $scope.$on('presentation-previousStep', function (){
            $scope.previousStep();
        });
        $scope.$on('presentation-nextStep', function (){
            $scope.nextStep();
        });

        $scope.$on('presentation-goToId',function (evt,id){
            if (presentationBookmark === null) {
                presentationBookmark = $scope.currentStepIndex;
            }
            linearPresentation = false;
            setCurrentStepFromId(id);
        });

        //riceve un paramtetro index che è da dove deve riprendere la
        // presentazione
        $scope.$on('presentation-resumeLinear', function (){
            setCurrentStepFromIndex(presentationBookmark);
            presentationBookmark = null;
            linearPresentation = true;
        });

        /**
         * @function emitGoingToNode
         * @instance
         * @desc Metodo d'utilità che solleva l'evento
         * <tt>presentation-goingToNode</tt> utilizzando i dati del nodo
         * correntemente visualizzato.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationController
         */
        function emitGoingToNode(){
            $scope.$emit('presentation-goingToNode', {
                node: $scope.nodes[$scope.currentStepIndex],
                index: $scope.currentStepIndex
            });
        }

        /**
         * @function setCurrentStepFromIndex
         * @instance
         * @desc Metodo che visualizza la slide di indice <tt>index</tt> della
         * sequenza del percorso di presentazione.
         * @param {Number} index - Parametro contenente l'indice della slide da
         * visualizzare.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationController
         */
        function setCurrentStepFromIndex(index){
            console.log('set current index: '+index);
            $scope.currentStepIndex = index;
            $scope.impressGoToSlide($scope.currentStepIndex);
            emitGoingToNode($scope.currentStepIndex);
        }
        /**
         * @function setCurrentStepFromId
         * @instance
         * @desc Metodo che visualizza la slide di contenente il nodo avente
         * <tt>id</tt> uguale a <tt>nodeId</tt> presente nella sequenza della
         * presentazione.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt> del
         * nodo da visualizzare.
         * @returns {void}
         * @memberOf Front-End::Controllers.PresentationController
         */
        function setCurrentStepFromId(nodeId){
            //console.log('set current node: '+nodeId);
            //vado alla prima occorrenza del nodo
            $scope.currentStepIndex = $scope.nodesIndex[nodeId][0];
            $scope.impressGoToSlide($scope.currentStepIndex);
            emitGoingToNode($scope.currentStepIndex);
        }
        /**
         * @function previousStep
         * @instance
         * @desc Metodo che mostra la slide precedente.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.PresentationController
         */
        $scope.previousStep = function (){
            if (linearPresentation){
                if($scope.currentStepIndex > 0) {
                    --$scope.currentStepIndex;

                }else {
                    $scope.currentStepIndex = $scope.path.getSteps().length-1;
                }
                $scope.impressGoToSlide($scope.currentStepIndex);
                emitGoingToNode($scope.currentStepIndex);
                return true;
            }
            return false;
        };
        /**
         * @function nextStep
         * @instance
         * @desc Metodo che visualizza la slide successiva.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.PresentationController
         */
        $scope.nextStep = function (){
            console.log($scope.path);
            if (linearPresentation){
                if($scope.currentStepIndex+1 < $scope.path.getSteps().length) {
                    ++$scope.currentStepIndex;
                } else {
                    $scope.currentStepIndex = 0;
                }
                $scope.impressGoToSlide($scope.currentStepIndex);
                emitGoingToNode($scope.currentStepIndex);
                return true;
            }
            return false;
        };
    }
})();
