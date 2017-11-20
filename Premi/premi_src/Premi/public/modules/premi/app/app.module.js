/**
 * app.module.js
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * Data: 2015-05-05
 * Requisiti: -
 * Descrizione Dichiarazione del modulo principale dell'applicazione
 */
(function() {
    'use strict';
    angular
        .module('premi', [
            'ngMaterial',
            'ngRoute',
            'ngTouch',
            'premi.controllers',
            'premi.directives',
            'premi.services'
        ]);
})();
