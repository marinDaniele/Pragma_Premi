/**
 * @class premiErrorMessage
 * @classdesc Rappresenta il componente grafico che permette di mostrare
 * messaggi d’errore all’utente all’interno dell’applicazione. Questo componente
 * fornisce anche un pulsante che permette di nascondere il messaggio.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO30.3, RFO30.4, RFD33
 * @example <premi-error-message errorInfo="error">
 </premi-error-message>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiErrorMessage',premiErrorMessage);

    function premiErrorMessage(){
        return {
            restrict:'E',
            scope:{
                errorInfo:'='
            },
            controller:'ErrorMessageController',
            templateUrl:'app/directives/errorMessage/errorMessage.html'
        };
    }

})();
