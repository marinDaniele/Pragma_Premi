/**
 * @class premiAssociationAdder
 * @classdesc Rappresenta il componente grafico che permette all’utente di
 * creare un'associazione tra il nodo
 * selezionato e un altro nodo della mappa.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFO4.2, RFO4.2.6
 * @example <premi-association-adder nodes="demoNodes"
 on-node-selected="addAssociationClicked(destId)">
 </premi-association-adder>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';

    angular
        .module('premi.directives')
        .directive('premiAssociationAdder', associationAdderDirective);

    function associationAdderDirective(){
        return {
            restrict:'EA',
            scope:{
                nodes:'=',
                onNodeSelected:'&'
            },
            controller: 'AssociationAdderController',
            templateUrl:'app/directives/associationAdder/associationAdder.html'
        };
    }
})();
