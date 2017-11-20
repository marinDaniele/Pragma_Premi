/**
 * @class AuthenticationService
 * @classdesc Questa classe si occupa di gestire il processo di autenticazione e di registrazione di un utente.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO30, RFO30.1, RFO30.1.1,
 * RFO30.1.2, RFO30.1.3, RFO30.2, RFO30.2.1, RFO30.2.2, RFO30.2.3, RFO32
 * @memberOf Front-End::Services
 */
(function (){
    'use strict';

    angular
        .module('premi.services')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http','SERVER_URL','$q'];

    function authenticationService($http, SERVER_URL, $q){
        var logged = false;

        return {
            logIn:logIn,
            logOut:logOut,
            signUp:signUp,
            isLoggedIn:isLoggedIn
        };

        /**
         * @function handleError
         * @instance
         * @description Metodo di utilità che si occupa di gestire il
         * fallimento di una chiamata HTTP verso il server.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta da una richiesta HTTP effettuata utilizzando
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.AuthenticationService
         */
        function handleError(response){
            // L'API response dal server deve essere ritornato in un formato
            // normalizzato.
            // Tuttavia, se la richiesta non è stata gestita dal server
            // (esempio a causa di un errore server), allora è necessario
            // effettuare una normalizzazione a questo livello.
            if (response.data === null){
                //Server offline
                return $q.reject(new ErrorInfo('Impossibile contattare il ' +
                    'server', 'Ci sono dei problemi di comnicazione ' +
                    'con il server' +
                'questo può essere dovuto ad un problema della connessione ' +
                    'ad internet oppure ad un problema del nostro' +
                ' server', 0));
            }
            //altrimenti si usa il messaggio d'errore ricevuto dal server
            return $q.reject(new ErrorInfo(response.data.title,
                                            response.data.message,
                                            response.data.code));
        }

        /**
         * @function logIn
         * @instance
         * @description Metodo che richiede al back-end l'autenticazione
         * dell'utente, utilizzando i valori ricevuti come parametro.
         * Il metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto
         * o rifiutato. Nel caso la promessa venga rifiutata, verrà fornita
         * come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} email - Parametro che rappresenta l'email
         * dell'utente che richiede l'accesso all'applicazione.
         * @param {String} password - Parametro che rappresenta la
         * password dell'utente che richiede l'accesso all'applicazione.
         * @returns {Promise}
         * @memberOf Front-End::Services.AuthenticationService
         */
        function logIn(email, password){
            console.log('login request');
            return $http({
                method: "POST",
                url: SERVER_URL+'/login',
                data: {
                    username:email,
                    password:password
                }
            }).then(function (result){
                    console.log('login effettuato con successo');
                    logged = true;
                    return result.data;
                },handleError);
        }

        /**
         * @function logOut
         * @instance
         * @description Metodo che richiede al back-end la de-autenticazione
         * dell'utente. Il metodo ritorna un oggetto <tt>Promise</tt> che può
         * venire risolto o rifiutato. Nel caso la promessa venga rifiutata,
         * verrà fornita come ragione un oggetto <tt>ErrorInfo</tt> contenente
         * tutte le informazioni relative all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.AuthenticationService
         */
        function logOut(){
            console.log('logout request');

            return $http({
                method: 'GET',
                url: SERVER_URL+'/logout'
            }).then(function (result){
                    console.log('logout effettuato con successo');
                    logged = false;
                    return result.data;
                },handleError);
        }

        /**
         * @function signUp
         * @instance
         * @description Metodo che, medinate $http, richiede al back-end la
         * creazione di un nuovo account con le
         * informazioni ricevute come parametro. Prima di effettuare la
         * richiesta il metodo controlla che le due
         * password ricevuto coincidano. Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o rifiutato. Nel caso la
         * promessa venga rifiutata, verrà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} email - Parametro che rappresenta la mail
         * dell'utente che si vuole registrare.
         * @param {String} password - Parametro che rappresenta la password
         * dell'utente che si vuole registrare.
         * @param {String} passwordCheck - Parametro che rappresenta la
         * conferma della password inserita dall'utente.
         * @returns {Promise}
         * @memberOf Front-End::Services.AuthenticationService
         */
        function signUp(email, password, passwordCheck){
            if (password !== passwordCheck || password.length < 4){
                var error = new ErrorInfo('Errore sui dati inseriti','Le ' +
                    'password non coincidono oppure è stata inserita' +
                'una password troppo corta',503);
                return $q.reject(error);
            }else {
                return $http({
                    method: 'POST',
                    url: SERVER_URL + '/signup',
                    data: {
                        username: email,
                        password: password
                    }
                }).then(function (result) {
                    console.log('registrazione effettuata con successo');
                    return result.data;
                }, handleError);
            }
        }
        /**
         * @function isLoggedIn
         * @instance
         * @description Metodo che ritorna il valore del campo dati logged.
         * @returns {Boolean}
         * @memberOf Front-End::Services.AuthenticationService
         */
        function isLoggedIn(){
            return logged;
        }
    }
})();
