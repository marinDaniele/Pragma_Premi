/**
 * File: AppRouter.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-07
 * Descrizione: Test di unità TU33 Premi::Front-End::AppRouter
 */
'use strict';
describe('TU33 Premi::Front-End::AppRouter', function(){
    var $route, $rootScope, $location, $httpBackend, 
    loggedIn = false, 
    projectLoaded = true,
    defaultPath = '/login',
    defaultTemplateUrl = 'app/views/logIn.view.html',
    defaultController = 'LogInController',
    defaultPathLoggedInUser = '/dashboard',
    defaultTemplateUrlLoggedInUser = 'app/views/dashboard.view.html',
    defaultControllerLoggedInUser = 'DashboardController'

    beforeEach(function(){
        module('premi');

        module(function($provide){
            $provide.factory('authenticationService', function(){
                return {
                    isLoggedIn: jasmine.createSpy('authenticationService').and.callFake(function(){
                        return loggedIn;
                    })
                };
            });
        });

        module(function($provide){
            $provide.factory('projectService', function(){
                return {
                    getCurrentProject: jasmine.createSpy('getCurrentProject').and.callFake(function(){
                        if(projectLoaded)
                            return '';
                        else
                            return null;
                    })
                };
            });
        });

        inject(function(_$route_, _$rootScope_, _$location_, _$httpBackend_){
            $route = _$route_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'app/views/logIn.view.html').respond('login');
            $httpBackend.when('GET', 'app/views/registration.view.html').respond('signup');
            $httpBackend.when('GET', 'app/views/dashboard.view.html').respond('dashboard');
            $httpBackend.when('GET', 'app/views/mindmapEditor.view.html').respond('editor');
            $httpBackend.when('GET', 'app/views/pathsEditor.view.html').respond('paths');
            $httpBackend.when('GET', 'app/views/presentation.view.html').respond('/presentation/:pathId');
        });
    });

    it("Dovrebbe navigare alla pagina dedicata al log in", function(){
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/login');
        });
        expect($location.path()).toBe('/login');
        expect($route.current.templateUrl).toBe('app/views/logIn.view.html');
        expect($route.current.controller).toBe('LogInController');
    });

    it("Dovrebbe navigare alla pagina dedicata alla registrazione di un nuovo account utente", function(){
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/signup');
        });
        expect($location.path()).toBe('/signup');
        expect($route.current.templateUrl).toBe('app/views/registration.view.html');
        expect($route.current.controller).toBe('RegistrationController');
    });

    it("Dovrebbe navigare alla dashboard dell'utente, nel caso abbia effettuato il login", function(){
        loggedIn = true;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/dashboard');
        });
        expect($location.path()).toBe('/dashboard');
        expect($route.current.templateUrl).toBe('app/views/dashboard.view.html');
        expect($route.current.controller).toBe('DashboardController');
    });

    it("Dovrebbe effettuare il redirect alla pagina di login, nel caso l'utente cerchi di accedere alla dashboard senza prima aver effettuato il login", function(){
        loggedIn = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/dashboard');
        });
        expect($location.path()).toBe(defaultPath);
        expect($route.current.templateUrl).toBe(defaultTemplateUrl);
        expect($route.current.controller).toBe(defaultController);
    });

    it("Dovrebbe navigare alla pagina dedicata all'editazione della mappa mentale associata ad un progetto dell'utente", function(){
        loggedIn = true;
        projectLoaded = true;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/editor');
        });
        expect($location.path()).toBe('/editor');
        expect($route.current.templateUrl).toBe('app/views/mindmapEditor.view.html');
        expect($route.current.controller).toBe('MindmapEditorController');
    });

    it("Dovrebbe effettuare il redirect alla pagina di login, nel caso l'utente cerchi di accedere alla pagina per l'editazione di mappe mentali senza prima aver effettuato il login", function(){
        loggedIn = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/editor');
        });
        expect($location.path()).toBe(defaultPath);
        expect($route.current.templateUrl).toBe(defaultTemplateUrl);
        expect($route.current.controller).toBe(defaultController);
    });

    it("Dovrebbe effettuare il redirect al dashboard dell'utente, nel caso cerchi di accedere alla pagina per l'editazione della mappa mentale associata ad un progetto, senza prima aver caricato lo stesso", function(){
        loggedIn = true;
        projectLoaded = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/editor');
        });
        expect($location.path()).toBe(defaultPathLoggedInUser);
        expect($route.current.templateUrl).toBe(defaultTemplateUrlLoggedInUser);
        expect($route.current.controller).toBe(defaultControllerLoggedInUser);
    });

    it("Dovrebbe navigare alla pagina dedicata all'editazione dei percorsi di presentazione associati ad un progetto dell'utente", function(){
        loggedIn = true;
        projectLoaded = true;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/paths');
        });
        expect($location.path()).toBe('/paths');
        expect($route.current.templateUrl).toBe('app/views/pathsEditor.view.html');
        expect($route.current.controller).toBe('PathsEditorController');
    });

    it("Dovrebbe effettuare il redirect alla pagina di login, nel caso l'utente cerchi di accedere alla pagina per l'editazione di percorsi di presentazione senza prima aver effettuato il login", function(){
        loggedIn = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/paths');
        });
        expect($location.path()).toBe(defaultPath);
        expect($route.current.templateUrl).toBe(defaultTemplateUrl);
        expect($route.current.controller).toBe(defaultController);
    });

    it("Dovrebbe effettuare il redirect alla dashboard dell'utente, nel caso cerchi di accedere alla pagina per l'editazione dei percorsi di presentazione associati ad un progetto, senza prima aver caricato lo stesso", function(){
        loggedIn = true;
        projectLoaded = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/paths');
        });
        expect($location.path()).toBe(defaultPathLoggedInUser);
        expect($route.current.templateUrl).toBe(defaultTemplateUrlLoggedInUser);
        expect($route.current.controller).toBe(defaultControllerLoggedInUser);
    });

    it("Dovrebbe navigare alla pagina dedicata alla visualizzazione di una presentazione dell'utente", function(){
        loggedIn = true;
        projectLoaded = true;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/presentation/:pathId');
        });
        expect($location.path()).toBe('/presentation/:pathId');
        expect($route.current.templateUrl).toBe('app/views/presentation.view.html');
        expect($route.current.controller).toBe('PresentationViewerController');
    });

    it("Dovrebbe effettuare il redirect alla pagina di login, nel caso l'utente cerchi di accedere alla pagina per la visualizzazione di una presentazione, senza prima aver effettuato il login", function(){
        loggedIn = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/editor');
        });
        expect($location.path()).toBe(defaultPath);
        expect($route.current.templateUrl).toBe(defaultTemplateUrl);
        expect($route.current.controller).toBe(defaultController);
    });

    it("Dovrebbe effettuare il redirect alla dashboard dell'utente, nel caso cerchi di accedere alla pagina per la visualizzazione di una presentazione, senza prima aver caricato un progetto", function(){
        loggedIn = true;
        projectLoaded = false;
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/editor');
        });
        expect($location.path()).toBe(defaultPathLoggedInUser);
        expect($route.current.templateUrl).toBe(defaultTemplateUrlLoggedInUser);
        expect($route.current.controller).toBe(defaultControllerLoggedInUser);
    });

    it("Dovrebbe effettuare il redirect di tutti gli url non registrati alla pagina di login", function(){
        // navigare utilizzando $apply permette l'avanzamento del $digest cycle
        $rootScope.$apply(function() {
            $location.path('/other');
        });
        expect($location.path()).toBe(defaultPath);
        expect($route.current.templateUrl).toBe(defaultTemplateUrl);
        expect($route.current.controller).toBe(defaultController);
    });
});
