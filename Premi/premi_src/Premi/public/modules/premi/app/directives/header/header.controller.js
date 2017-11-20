/**
 * @class HeaderController
 * @classdesc Classe che gestisce le operazioni e la logica applicativa
 * della directive premiHeader.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFF4.6, RFD15, RFF15.1, RFF15.2,
 * RFD15.3, RFF25, RFO27, RFO32
 * @memberOf Front-End::Controllers
 */
(function (){
    'use strict';
    angular
        .module('premi.controllers')
        .controller('HeaderController', headerController);

    headerController.$inject = ['$scope', '$location', 'projectService',
     '$window', 'authenticationService', 'mindmapAdapterService', 
     '$mdDialog'];

    function headerController($scope, $location, projectService, 
        $window, authenticationService, mindmapAdapterService, 
        $mdDialog){
        $scope.sidenavOpen = false;
        /**
         * @function zoomMindmap
         * @instance
         * @desc Metodo che regola lo zoom della mappa mentale, usa
         * <tt>MindmapAdapterService</tt> per effettuare il ridimensionamento
         * della mappa.
         * @param {Number} value - Parametro che rappresenta la quantità di
         * incremento o di decremento dello zoom.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.zoomMindmap = function (value){
            mindmapAdapterService.zoom(value);
        };
        /**
         * @function fitMindmap
         * @instance
         * @desc Metodo che tramite <tt>MindmapAdapterService</tt> adatta le
         * dimensioni della mappa mentale a quelle dello schermo.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.fitMindmap = function (){
            mindmapAdapterService.fit();
        };
        /**
         * @function printPage
         * @instance
         * @desc Metodo che, utilizzando il servizio <tt>$window</tt>, invoca la
         * funzionalità di stampa del browser.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.printPage = function (){
            $window.print();
        };
        /**
         * @function getTitle
         * @instance
         * @desc Metodo che, in base alla view corrente, ritorna il titolo da
         * visualizzare.
         * @returns {String}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.getTitle = function (){
            var currentProject = projectService.getCurrentProject();
            //Se non c'è un progetto corrente oppure non è
            //nell'editor/presentazione ritorna 'Premi'
            if(currentProject !== null && (
                $scope.currentLocationContains('/editor') ||
                $scope.currentLocationContains('/presentation') ||
                $scope.currentLocationContains('/paths')
                )){
                return currentProject.getName();
            }else{
                //Altrimenti ritorno il nome del progetto
                return 'Premi';
            }
        };
        /**
         * @function mapClicked
         * @instance
         * @desc Metodo che gestisce l'evento di click sul pulsante per passare
         * alla view che permette di modificare la mappa mentale, reindirizzando
         * l'utente all'opportuna view.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.mapClicked = function (){
            if (!$scope.currentLocationContains('/editor')){
                $scope.setCurrentLocation('/editor');
            }
        };
        /**
         * @function pathClicked
         * @instance
         * @desc Metodo che gestisce l'evento di click sul pulsante per passare
         * alla view che permette di modificare i percorsi di presentazione,
         * reindirizzando l'utente all'opportuna view.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.pathClicked = function (){
            if (!$scope.currentLocationContains('/paths')){
                $scope.setCurrentLocation('/paths');
            }
        };
        /**
         * @function setCurrentLocation
         * @instance
         * @desc Metodo che reindirizza l'utente alla view identificata dall'URL
         * ricevuto come parametro.
         * @param {String} url - Parametro che rappresenta l'URL da utilizzare
         * per il reindirizzamento.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.setCurrentLocation = function (url){
            $scope.sidenavOpen = false;
            $location.url(url);
        };
        /**
         * @function currentLocationContains
         * @instance
         * @desc Metodo che controlla se l'URL corrente contiene la stringa
         * ricevuta come parametro.
         * @param {String} content - Parametro che rappresenta il contenuto da
         * cercare.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.currentLocationContains = function (content){
            return $location.url().search(content) !== -1;
        };
        /**
         * @function logout
         * @instance
         * @desc Metodo che gestisce l'evento <tt>click</tt> sul pulsante per il
         * logout.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.logout = function (){
            authenticationService.logOut();
            $location.url('/login');
        };
        /**
         * @function showProjectSettingsEditor
         * @instance
         * @desc Metodo che utilizzando il servizio <tt>$mdDialog</tt>
         * visualizza la directive per la modifica delle impostazioni del
         * progetto sotto forma di finestra a pop-up.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.showProjectSettingsEditor = function () {
            $mdDialog.show({
                template:
                '<md-dialog aria-label="List dialog" style="height: 100%;">' +
                '  <md-dialog-content style="height: 100%;">'+
                    '<premi-project-settings-editor>' +
                '</premi-project-settings-editor>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });
        };
        /**
         * @function toggleSidenav
         * @instance
         * @desc Metodo che inverte il valore del campo dati
         * <tt>sidenavOpen</tt>.
         * @returns {Boolean}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.toggleSidenav = function () {
            $scope.sidenavOpen = !$scope.sidenavOpen;
        };
        /**
         * @function showManual
         * @instance
         * @desc Metodo che visualizza il pop-up contenente il manuale utente.
         * @param {MouseEvent} ev - Parametro contenente le informazioni
         * relative all'evento del browser che ha portato all'invocazione del
         * metodo.
         * @returns {void}
         * @memberOf Front-End::Controllers.HeaderController
         */
        $scope.showManual = function (ev){
            var templateUrl = '';
            $scope.sidenavOpen = false;
            if ($scope.currentLocationContains('login')){
                templateUrl = '/app/views/manuale/login.tmpl.html';
            } else if ($scope.currentLocationContains('signup')){
                templateUrl = '/app/views/manuale/registration.tmpl.html';
            } else if ($scope.currentLocationContains('dashboard')){
                templateUrl = '/app/views/manuale/dashboard.tmpl.html';
            } else if ($scope.currentLocationContains('editor')){
                templateUrl = '/app/views/manuale/editProgetto.tmpl.html';
            } else if ($scope.currentLocationContains('paths')){
                templateUrl = '/app/views/manuale/editPercorsi.tmpl.html';
            } else if ($scope.currentLocationContains('presentation')){
                templateUrl = '/app/views/manuale/presentation.tmpl.html';
            }

            $mdDialog.show({
                controller: function ($scope, $mdDialog) {
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: ev
            });
        };
    }
})();
