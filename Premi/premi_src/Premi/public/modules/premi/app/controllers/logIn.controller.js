/**
 * @class LoginController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * riguardante la pagina di login.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-15 Requisiti: RFO30, RFO30.2, RFO30.2.1,
 * RFO30.2.2, RFO30.2.3
 * @memberOf Front-End::Controllers
 */

(function (){
	'use strict';
	angular
		.module('premi.controllers')
		.controller('LogInController', logInController);

	logInController.$inject = ['$scope','$location','authenticationService'];

	function logInController ($scope, $location, authenticationService){
		$scope.user = {
			'email': '',
			'password': ''
		};
		/**
		 * @function logIn
		 * @instance
		 * @desc Metodo che gestisce l'evento click sul pulsante di login.
		 * Recupera i dati dallo $scope e, mediante AuthenticationService, prova
		 * ad effettuare l'autenticazione.
		 * Se l'autenticazione ha esito positivo, reindirizza l'utente alla
		 * dashboard,
		 * altrimenti visualizza un messaggio d'errore.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.LoginController
		 */
		$scope.logIn = function (){
			authenticationService.logIn($scope.user.email,$scope.user.password)
				.then(function (){
					$location.path('/dashboard');
				}, function (error){
					$scope.$emit('premi-error',error);
				});
		};
		/**
		 * @function signUp
		 * @instance
		 * @desc Metodo che gestisce l'evento click sul pulsante di
		 * registrazione.
		 * Effettua il redirect alla pagina di registrazione.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.LoginController
		 */
		$scope.signUp = function (){
			$location.path('/signup');
		};
	}
})();
