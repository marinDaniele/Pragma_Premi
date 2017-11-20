/**
 * @class AppConfig
 * @classdesc Classe che si occupa di definire la configurazione
 * dell'applicazione.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-05  Requisiti: -
 * @memberof Front-End
 */
(function (){
    'use strict';

    angular
        .module('premi')
        .config(AppConfig);

    AppConfig.$inject = ['$mdThemingProvider'];

    function AppConfig($mdThemingProvider){
        var lightGreyMap = $mdThemingProvider.extendPalette('grey', {
            '500': 'FAFAFA'
        });
        $mdThemingProvider.definePalette('light-grey', lightGreyMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('light-grey');
    }
})();
