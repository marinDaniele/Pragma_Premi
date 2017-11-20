/**
 * @class HierarchicalMenuController
 * @classdesc Classe che gestisce la visibilità della directive
 * premiHierarchicalMenu.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFD7.6, RFD7.6.1, RFD7.6.2
 * @memberOf Front-End::Controllers
 */
(function () {
    'use strict';
    angular
        .module('premi.controllers')
        .controller('HierarchicalMenuController', hierarchicalMenuController);

    hierarchicalMenuController.$inject = ['$scope'];

    function hierarchicalMenuController($scope) {
        $scope.isOpen = false;

        /**
         * @function toggle
         * @instance
         * @desc Metodo che inverte il valore del campo dati <tt>isOpen</tt>
         * @returns {void}
         * @memberOf Front-End::Controllers.HierarchicalMenuController
         */
        $scope.toggle = function (){
            $scope.isOpen = !$scope.isOpen;
        };
    }
})();
