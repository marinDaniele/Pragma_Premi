/**
 * @class premiPathsList
 * @classdesc Rappresenta il componente grafico che si occupa di visualizzare la
 * lista dei percorsi di presentazione
 * presenti nel progetto corrente. Dalla lista dei percorsi l'utente può
 * selezionare un percorso per modificarlo, cancellare un determinato percorso
 * oppure avviare la presentazione di quel percorso. Questo componente contiene
 * anche un pulsante per creare un nuovo progetto.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFD4.3, RFD4.3.3, RFD4.5, RFD7.1,
 * RFD4.5.1, RFD4.7
 * @example  <premi-paths-list ng-if="!pathSelected"
 paths="pathNames"
 select-path="selectPath(path)">
 </premi-paths-list>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiPathsList',premiPathsList);

    function premiPathsList(){
        return {
            restrict:'E',
            scope:{
                selectPath:'&',
                paths:'='
            },
            controller: 'PathsListController',
            templateUrl:'app/directives/pathsList/pathsList.html'
        };
    }
})();
