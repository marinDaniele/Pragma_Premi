/**
 * @class AppRouter
 * @classdesc Classe che gestisce i routes dell'applicazione, utilizza il
 * servizio <tt>$routeProvider</tt> per associare ad ogni route un controller
 * e una view.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-05  Requisiti: -
 * @memberof Front-End
 */
(function () {
    'use strict';
    angular
        .module('premi')
        .config(AppRouter);

    AppRouter.$inject = ['$routeProvider'];

    function AppRouter($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl:'app/views/logIn.view.html',
                controller: 'LogInController'
            })
            .when('/signup', {
                templateUrl: 'app/views/registration.view.html',
                controller: 'RegistrationController'
            })
            .when('/dashboard', {
                templateUrl: 'app/views/dashboard.view.html',
                controller: 'DashboardController'
            })
            .when('/editor', {
                templateUrl: 'app/views/mindmapEditor.view.html',
                controller: 'MindmapEditorController'
            })
            .when('/paths', {
                templateUrl: 'app/views/pathsEditor.view.html',
                controller: 'PathsEditorController'
            })
            .when('/presentation/:pathId', {
                templateUrl: 'app/views/presentation.view.html',
                controller: 'PresentationViewerController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
})();
