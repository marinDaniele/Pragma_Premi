/**
 * @class AppRun
 * @classdesc Classe che si occupa di gestire l'inizializzazione
 * dell'applicazione.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-05  Requisiti: -
 * @memberof Front-End
 */
(function (){
    'use strict';
    angular
        .module('premi')
        .run(AppRun);

    AppRun.$inject = ['$rootScope', '$location', '$mdDialog', 'projectService',
        'authenticationService'];

    function AppRun($rootScope, $location, $mdDialog, projectService,
                    authenticationService){
        $rootScope.fullscreen = false;

        $rootScope.$on('premi-fullscreen-on', function (){
            $rootScope.fullscreen = true;
            window.dispatchEvent(new Event('resize'));
        });

        $rootScope.$on('premi-fullscreen-off', function (){
            $rootScope.fullscreen = false;
            window.dispatchEvent(new Event('resize'));
        });

        $rootScope.$on('premi-error',function (evt,errorInfo){
            //Creo lo scope isolato da passare al dialog
            var dialogScope = $rootScope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.errorObj = errorInfo;
            $mdDialog.show({
                scope: dialogScope,
                template:
                '<md-dialog aria-label="aggiungi associazione">' +
                '  <md-dialog-content>'+
                '<premi-error-message error-info="errorObj">' +
                '</premi-error-message>'+
                '</premi-add-to-path>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });
        });
        /* Codice per il check dell'autenticazione e del progetto caricato*/
        var routes={
            '/login':{
                requireLogin:false,
                requireProject: false
            },
            '/signup':{
                requireLogin:false,
                requireProject: false
            },
            '/dashboard':{
                requireLogin:true,
                requireProject: false
            },
            '/editor':{
                requireLogin:true,
                requireProject: true
            },
            '/paths':{
                requireLogin:true,
                requireProject: true
            },
            '/presentation':{
                requireLogin:true,
                requireProject: true
            }
        };
        
        $rootScope.$on('$locationChangeStart',function (event, next){
            for(var i in routes) {
                if(next.indexOf(i) !== -1) {
                    if(routes[i].requireLogin &&
                        !authenticationService.isLoggedIn()) {
                        event.preventDefault();
                        $location.path('/login');
                    }
                    if(routes[i].requireProject &&
                        projectService.getCurrentProject() === null){
                        event.preventDefault();
                        $location.path('/dashboard');
                    }
                }
            }
        });
    }
})();
