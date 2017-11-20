/**
 * @class premiHeader
 * @classdesc Rappresenta la barra di navigazione che permette all’utente di
 * spostarsi tra le varie views
 * dell'applicazione. Fornisce inoltre i pulsanti per visualizzare il manuale
 * utente, effettuare il logout, chiudere la presentazione e il progetto.
 * Inoltre, quando l'utente si trova nelle views in cui è possibile modificare
 * il progetto, questa directive permette di mostrare la finestra di
 * modifica delle impostazioni del progetto, sia di interagire con
 * la visualizzazione della mappa mentale, modificando lo zoom e
 * permettendo anche di stamparla.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFF4.6, RFD15, RFF15.1, RFF15.2,
 * RFD15.3, RFF25, RFO27
 * @example <premi-header></premi-header>
 * @memberOf Front-End::Directives
 */
(function () {
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiHeader', headerDirective);

    function headerDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/directives/header/header.html',
            controller: 'HeaderController'
        };
    }
})();
