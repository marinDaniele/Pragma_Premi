/**
 * @class premiAddToPath
 * @classdesc Rappresenta il componente grafico che permette all’utente di
 * visualizzare il contenuto di un nodo e di aggiungerlo ad uno dei percorsi di
 * presentazione esistenti. Questo componente visualizza una lista contenente
 * tutti i percorsi disponibili al quale, selezionando quello desiderato, è
 * possibile aggiungere il nodo selezionando.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @classdesc Data: 2015-05-13 Requisiti: RFD4.3.2, RFD4.4.1
 * @example  <premi-add-to-path node="currentNode"
 paths="demoPaths"
 on-add="doSomething(nodeId,pathId)">
 </premi-add-to-path>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiAddToPath', addToPathDirective);

    function addToPathDirective(){
        return {
            restrict:'EA',
            scope:{
                node:'=', //Nodo da visualizzare
                paths:'=',
                onAdd:'&'
            },
            controller:'AddToPathController',
            templateUrl:'app/directives/addToPath/addToPath.html'
        };
    }
})();
