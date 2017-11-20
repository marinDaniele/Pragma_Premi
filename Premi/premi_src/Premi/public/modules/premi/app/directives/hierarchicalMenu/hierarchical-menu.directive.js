/**
 * @class premiHierarchicalMenu
 * @classdesc Rappresenta il menù che durante la presentazione permette di
 * navigare la mappa mentale seguendo le relazioni gerarchiche presenti tra i
 * vari nodi della mappa mentale. Questo componente consiste in una lista di
 * elementi selezionabili dall’utente, ogni elemento corrisponde ad una
 * relazione presente tra il nodo corrente ed un altro nodo della mappa.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFD7.6, RFD7.6.1, RFD7.6.2
 * @example <premi-hierarchical-menu class="menu"
 parent="currentNode.getParentNode()"
 relations="currentNode.getChildNodes()"
 on-click="jumpToNode(nodeId)"></premi-hierarchical-menu>
 * @memberOf Front-End::Directives
 */
(function () {
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiHierarchicalMenu', hierarchicalMenuDirective);

    function hierarchicalMenuDirective() {
        return {
            restrict: 'E',
            scope : {
                parent: '=',
                relations:'=',
                onClick:'&' //da invocare con id del nodo
            },
            templateUrl: 'app/directives/hierarchicalMenu/hierarchicalMenu.html',
            controller: 'HierarchicalMenuController'
        };
    }
})();
