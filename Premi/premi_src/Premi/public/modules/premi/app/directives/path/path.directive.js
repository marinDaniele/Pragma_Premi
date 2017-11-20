/**
 * @class premiPath
 * @classdesc  Rappresenta il componente grafico che permette all’utente di
 * modificare il percorso selezionato:
 * togliendo dei nodi oppure rinominandolo. Questo componente visualizza la
 * lista dei nodi presenti nel percorso.
 * Per ogni nodo viene visualizzato il titolo del nodo ed un pulsante che
 * permette di rimuoverlo dal percorso.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFD4.3.1, RFD4.4, RFD4.4.3, RFD4.4.5
 * @example  <premi-path selected-path="currentPath"
 deselect-path="deselectPath()">
 </premi-path>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';

    angular
        .module('premi.directives')
        .directive('premiPath', pathDirective);

    function pathDirective(){
        return {
            restrict:'E',
            scope:{
                selectedPath: '=',
                deselectPath: '&'
            },
            controller: 'PathController',
            templateUrl:'app/directives/path/path.html'
        };
    }
})();
