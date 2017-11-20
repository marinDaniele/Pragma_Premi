/**
 * @class ErrorMessageController
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @classdesc Classe che gestisce la logica di visualizzazione della directive
 * premiErrorMessage.
 * @description Data: 2015-05-11 Requisiti: RFO30.3, RFO30.4, RFD33
 * @memberOf Front-End::Controllers
 */

(function (){
    'use strict';

    angular
        .module('premi.controllers')
        .controller('ErrorMessageController', errorMessageController);

    errorMessageController.$inject = ['$scope','$mdDialog'];

    function errorMessageController($scope,$mdDialog){
        /**
         * @function hide
         * @instance
         * @desc Metodo che nasconde la directive.
         * @returns {void}
         * @memberOf Front-End::Controllers.ErrorMessageController
         */
        $scope.hide = function (){
            $mdDialog.cancel();
        };
    }
})();
