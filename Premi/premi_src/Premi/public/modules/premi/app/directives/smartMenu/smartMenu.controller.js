/**
 * @class SmartMenuController
 * @classdesc Classe che gestisce la visibilità della directive premiSmartMenu.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFD7.6, RFD7.6.1, RFD7.6.2
 * @memberOf Premi.Front-End.Controllers
 */

(function () {
    'use strict';
    angular
        .module('premi.controllers')
        .controller('SmartMenuController', smartMenuController);

    smartMenuController.$inject = ['$scope'];

    function smartMenuController($scope) {
        $scope.isOpen = false;
        /**
         * @function toggleSidenav
         * @instance
         * @desc Metodo che inverte il valore del campo dati <tt>isOpen</tt>.
         * @returns {void}
         * @memberOf Front-End::Controllers.SmartMenuController
         */
        $scope.toggle = function (){
            $scope.isOpen = !$scope.isOpen;
        };
    }
})();
