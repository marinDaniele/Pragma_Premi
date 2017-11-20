/**
 * @class premiSmartMenu
 * @classdesc Rappresenta il menù che durante la presentazione permette di
 * navigare la mappa mentale seguendo le associazioni definite tra i vari nodi.
 * Questo componente consiste in una lista di elementi selezionabili
 * dall’utente, ogni elemento corrisponde ad un'associazione presente tra il
 * nodo corrente ed un altro nodo della mappa.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFD7.6, RFD7.6.1, RFD7.6.2
 * @example <premi-smart-menu class="menu"
 relations="currentNode.getAssociatedNodes()"
 on-click="jumpToNode(nodeId)"></premi-smart-menu>
 * @memberOf Front-End::Directives
 */
(function () {
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiSmartMenu', smartMenuDirective);

    function smartMenuDirective() {
        return {
            restrict: 'E',
            scope : {
                relations:'=',
                onClick:'&' //da invocare con id del nodo
            },
            templateUrl: 'app/directives/smartMenu/smartMenu.html',
            controller: 'SmartMenuController'
        };
    }
})();
