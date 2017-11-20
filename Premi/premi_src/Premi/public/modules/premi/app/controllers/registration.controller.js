/**
 * @class RegistrationController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante la registrazione di un utente.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-15 Requisiti: RFO30, RFO30.1, RFO30.1.1,
 * RFO30.1.2, RFO30.1.3
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('RegistrationController', registrationController);

    registrationController.$inject = ['$scope', '$location', 'authenticationService'];
    /**
     * @class RegistrationController
     * @classdesc Classe che gestisce le operazioni e la logica applicativa
     * riguardante la registrazione di un utente.
     * @memberOf Front-End::Controllers
     */
    function registrationController ($scope, $location, authenticationService){
        $scope.user = {
            'email': '',
            'password': '',
            'passwordCheck': ''
        };
        /**
         * @function logIn
         * @instance
         * @desc Metodo che gestisce l'evento click sul pulsante di login.
         * Effettua il redirect alla pagina di login.
         * @returns {void}
         * @memberOf Front-End::Controllers.RegistrationController
         */
        $scope.logIn = function (){
            $location.path('/login');
        };
        /**
         * @function createAccount
         * @instance
         * @desc Metodo che gestisce l'evento di pressione del pulsante per la
         * registrazione. Legge dallo <tt>$scope</tt> i valori inseriti
         * all'utente e prova a registrare un account sul server, utilizzando
         * <tt>AuthenticationService</tt>. Se la registrazione va a buon fine,
         * effettua in modo automatico il login e reindirizza l'utente alla
         * <tt>DashboardView</tt>, altrimenti mostra un messaggio d'errore che
         * spiega perché non è stato possibile eseguire la registrazione.
         * @returns {void}
         * @memberOf Front-End::Controllers.RegistrationController
         */
        $scope.createAccount= function (){
            authenticationService.signUp($scope.user.email,$scope.user.password,
                                         $scope.user.passwordCheck)
                .then(function (){
                    return authenticationService.logIn($scope.user.email,
                                                       $scope.user.password);
                })
                .then(function (){
                    $location.path('/dashboard');
                })
                .catch(function (error){
                    $scope.$emit('premi-error', error);
                });
        };
    }
})();
