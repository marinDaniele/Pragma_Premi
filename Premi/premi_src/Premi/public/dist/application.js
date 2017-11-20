'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'premi';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('premi');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
/**
 * app.config.js
 * @author: gmanzoli - giacomo.manzoli@gmail.com
 * Data: 2015-05-05
 * Requisiti: -
 * Descrizione Funzione di configurazione per le impstazioni globali dello stile dell'applicazione
 */
(function(){
    'use strict';

    angular
        .module('premi')
        .config(['$mdThemingProvider',config]);

    function config($mdThemingProvider){
        var lightGreyMap = $mdThemingProvider.extendPalette('grey', {
            '500': 'FAFAFA'
        });
        $mdThemingProvider.definePalette('light-grey', lightGreyMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('light-grey');
    }
})();

/**
 * app.module.js
 * @author: gmanzoli - giacomo.manzoli@gmail.com
 * Data: 2015-05-05
 * Requisiti: -
 * Descrizione Dichiarazione del modulo principale dell'applicazione
 */
(function() {
    'use strict';
    angular
        .module('premi', [
            'ngMaterial',
            'ngRoute',
            'ngTouch',
            'premi.controllers',
            'premi.directives',
            'premi.services'
        ]);
})();

/**
 * app.routes.js
 * @author: gmanzoli - giacomo.manzoli@gmail.com
 * Data: 2015-05-05
 * Requisiti: -
 * Descrizione Impostazione delle route dell'applicazione
 */
(function() {
    'use strict';
    angular
        .module('premi')
        .config(routeProvider);

    routeProvider.$inject = ['$routeProvider'];

    function routeProvider($routeProvider) {
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
                templateUrl: 'app/views/mindmapEditor.html',
                controller: 'MindmapEditorController'
            })
            .when('/paths', {
                templateUrl: 'app/views/pathsEditor.view.html',
                controller: 'PathsEditorController'
            })
            .when('/presentation/:pathId', {
                templateUrl: 'app/views/presentation.view.html',
                controller: 'PresentationViewController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
})();

/**
 * app.run.js
 * @author: gmanzoli - giacomo.manzoli@gmail.com
 * Data: 2015-05-05
 * Requisiti: -
 * Descrizione Funzione da eseguire all'avvio dell'applicazione
 */
(function(){
    'use strict';
    angular
        .module('premi')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$location','$mdDialog', 'projectService','authenticationService'];

    function runBlock($rootScope, $location,$mdDialog, projectService,authenticationService){
        $rootScope.fullscreen = false;

        $rootScope.$on('premi-fullscreen-on', function(){
            $rootScope.fullscreen = true;
            window.dispatchEvent(new Event('resize'));
        });

        $rootScope.$on('premi-fullscreen-off', function(){
            $rootScope.fullscreen = false;
            window.dispatchEvent(new Event('resize'));
        });

        $rootScope.$on('premi-error',function(evt,errorInfo){
            //Creo lo scope isolato da passare al dialog
            var dialogScope = $rootScope.$new(true);
            //Passo i riferimenti che servono al nuovo scope
            dialogScope.errorObj = errorInfo;
            $mdDialog.show({
                scope: dialogScope,
                template:
                '<md-dialog aria-label="aggiungi associazione">' +
                '  <md-dialog-content>'+
                '<premi-error-message error-info="errorObj"></premi-error-message>'+
                '</premi-add-to-path>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });
        });
        /* Codice per il check dell'autenticazione e del progetto caricato.
        Da decommentare una volta reso effettivo il sistema id autenticazione*/
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
        
        $rootScope.$on('$locationChangeStart',function(event, next, current){
            //console.log('$locationChangeStart');

           // console.log(next);
            for(var i in routes) {
                if(next.indexOf(i) !== -1) {
                    if(routes[i].requireLogin && !authenticationService.isLoggedIn()) {
                        event.preventDefault();
                        $location.path('/login');
                    }
                    if(routes[i].requireProject && projectService.getCurrentProject() === null){
                        event.preventDefault();
                        $location.path('/dashboard');
                    }
                }
            }
        });
    }
})();

/**
 * File: TU44-45-46.js
 * @author pragma.swe@gmail.com
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU44, TU45 e TU46 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU44, TU45 e TU46 Premi::Front-End::Model::Path', function(){

    var nr1 = new NodeReference(0, 'titolo1');
    var nr2 = new NodeReference(1, 'titolo2');
    var nr3 = new NodeReference(2, 'titolo2');

    var stepsTest = {
        0 : nr1,
        1 : nr2,
        2 : nr3
    };

    var pathTest;

    describe('Test di unità TU44', function(){

        beforeAll(function(){
            pathTest = new Path(1,'pathName', stepsTest, true);
        });

        it("Verifico addStep", function(){

            var lung = pathTest.getSteps().length;
            // la lunghezza di stepTest è 3 quindi id: 0,1,2

            pathTest.addStep(3, 'titolo3');

            var lungDopo = pathTest.getSteps().length;
            expect(lungDopo).toEqual(lung + 1);

        });

        it("Verifico deleteStep", function(){

            var lung = pathTest.getSteps().length;
            // la lunghezza di stepTest è 4 quindi id: 0,1,2,3

            pathTest.deleteStep(3);

            var lungDopo = pathTest.getSteps().length;
            expect(lungDopo).toEqual(lung - 1);

        });

    });

    describe('Test di unità TU45', function(){

        beforeAll(function(){
            pathTest = new Path(1,'pathName', stepsTest, true);
        });

        it("Verifico getId", function(){

            var id = pathTest.getId();
            expect(id).toEqual(1);

        });

        it("Verifico getName", function(){

            var name = pathTest.getName();
            expect(name).toEqual('pathName');

        });

        it("Verifico getStemp", function(){

            var steps = pathTest.getSteps();
            expect(steps).toEqual(stepsTest);

        });

    });

    describe('Test di unità TU46', function(){

        beforeAll(function(){
            pathTest = new Path(1,'pathName', stepsTest, true);
        });

        it("Verifico setName", function(){

            var newName = 'newPathName';
            pathTest.setName(newName);
            var result = pathTest.getName();
            expect(result).toEqual(newName);

        });

        it("Verifico isDefault", function(){

            var def = pathTest.isDefault();
            expect(def).toBe(true);

        });

    });
});
/**
 * File: TU44.js
 * @author Daniele Marin
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU44 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU44  Premi::Front-End::Model::Path', function(){

    var nr1 = new NodeReference(0, 'titolo1');
    var nr2 = new NodeReference(1, 'titolo2');
    var nr3 = new NodeReference(2, 'titolo2');

    var stepsTest = [
        nr1,
        nr2,
        nr3
    ];

    var pathTest;

    beforeEach(function(){
        pathTest = new Path(1,'pathName', stepsTest, true);
    });

    it("Verifico addStep", function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 3 quindi id: 0,1,2
        pathTest.addStep(3, 'titolo3');
        var lungDopo = pathTest.getSteps().length;
        expect(lungDopo).toEqual(lung + 1);
    });

    it("Verifico deleteStep", function(){
        var lung = pathTest.getSteps().length;
        // la lunghezza di stepTest è 4 quindi id: 0,1,2,3
        pathTest.deleteStep(3);
        var lungDopo = pathTest.getSteps().length;
        expect(lungDopo).toEqual(lung - 1);
    });

});

/**
 * File: TU45.js
 * @author Daniele Marin
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU45 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU45 Premi::Front-End::Model::Path', function(){

    var nr1 = new NodeReference(0, 'titolo1');
    var nr2 = new NodeReference(1, 'titolo2');
    var nr3 = new NodeReference(2, 'titolo2');

    var stepsTest = [
        nr1,
        nr2,
        nr3
    ];

    var pathTest;

    beforeEach(function(){
        pathTest = new Path(1,'pathName', stepsTest, true);
    });

    it("Verifico getId", function(){
        var id = pathTest.getId();
        expect(id).toEqual(1);
    });

    it("Verifico getName", function(){
        var name = pathTest.getName();
        expect(name).toEqual('pathName');
    });

    it("Verifico getStemp", function(){
        var steps = pathTest.getSteps();
        expect(steps).toEqual(stepsTest);
    });

});
/**
 * File: TU46.js
 * @author Daniele Marin
 * Data: 25-05-2015
 *
 * Descrizione: Test di unità TU46 Premi::Front-End::Model::Path
 *
 */

describe('Test di unità TU46 Premi::Front-End::Model::Path', function(){

    //costruisco riferimenti ai figli
    var child1 = new NodeReference(0, 'titolo1');
    var child2 = new NodeReference(1, 'titolo2');
    var child3 = new NodeReference(2, 'titolo2');

    var childNodes = [child1, child2, child3];

    //costruisco riferimenti alle associazioni
    var associated1 = new NodeReference(3, 'titolo3');
    var associated2 = new NodeReference(4, 'titolo4');
    var associated3 = new NodeReference(5, 'titolo5');

    var associatedNodes = [associated1, associated2, associated3];

    // riferimento nodo padre
    var parentNode = new NodeReference(6, 'titolo6');

    //costruisco contenuti di un nodo
    var nodeContent1 = new NodeContent(0,'text_content',1,2,100,200,'text');
    var nodeContent2 = new NodeContent(1,'img_content',3,4,100,200,'imgUrl');
    var nodeContent3 = new NodeContent(2,'title_content',5,6,100,200,'title');

    var content = [nodeContent1, nodeContent2, nodeContent3];

    //costruisco un PresentationNode
    var presentationNode;

    //inizio il test
    beforeEach(function(){
        presentationNode = new PresentationNode('nodeId', content, parentNode, childNodes, associatedNodes);
    });

    it("Verifico getParentNode", function(){

        var parent = presentationNode.getParentNode();
        expect(parent).toEqual(parentNode);

    });

    it("Verifico getChildNodes", function(){

        var childs = presentationNode.getChildNodes();
        expect(childs).toEqual(childNodes);

    });

    it("Verifico getAssociatedNodes", function(){

        var associated = presentationNode.getAssociatedNodes();
        expect(associated).toEqual(associatedNodes);

    });

});
describe('PasswordController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('PasswordController', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    it('sets the strength to "weak" if the password length <3 chars', function() {
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
  });
});
/**
  * Name: LoginControllerTest
  * Package: Authentication
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per LoginController
  *
  */

describe('AuthService Test', function () {
    var httpBackend, BACKEND_URL, authService, cookies, scope;
    var email, password, dataReceived, success, failure;

    email = 'test@test.it';
    password = 'pwd';
    
    var callback = function (response, data) {
	dataReceived = data;
	if (response == true) {
	    success = true;
	} else {
	    failure = true;
	}
    }	

    beforeEach(function () {
	angular.mock.module('ngCookies');
	module('authentication');
    });

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
    }));

    beforeEach(inject(function ($httpBackend, $cookies, $rootScope,
				BACKEND_URL, _AuthService_) {
	httpBackend = $httpBackend;
	authService = _AuthService_;
	cookies = $cookies;
	scope = $rootScope;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully loginUser', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(cookies.shike_user).not.toBeDefined();
	expect(cookies.shike_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();

	httpBackend.whenGET(BACKEND_URL + "/user/token").respond(
	    201, 'authenticated', '', '', '');
	authService.loginUser(email, password, callback);
	httpBackend.flush();
	
	expect(dataReceived).toBe(null);
	expect(success).toBe(true);
	expect(failure).toBe(false);
	expect(cookies.shike_user).toBe('test@test.it');
	expect(cookies.shike_token).toBe('authenticated');
	expect(scope.userLogged).toBe(true);
    });

    it('Wrong loginUser', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);
	expect(cookies.shike_user).not.toBeDefined();
	expect(cookies.shike_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();

	httpBackend.whenGET(BACKEND_URL + "/user/token").respond(
	    404, 'error', '', '', '');
	authService.loginUser(email, password, callback);
	httpBackend.flush();
	
	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
	expect(cookies.shike_user).not.toBeDefined();
	expect(cookies.shike_token).not.toBeDefined();
	expect(scope.userLogged).not.toBeDefined();
    });

    it('Successfully logoutUser', function () {
	scope.userLogged = true
	cookies.shike_user = 'user01';
	cookies.shike_token = 'authenticated';
	authService.logoutUser(function () {});

	expect(scope.userLogged).toBe(false);
	expect(cookies.shike_user).not.toBeDefined();
	expect(cookies.shike_token).not.toBeDefined();
    });

    it('User not logged', function () {
	var logged = authService.isLogged();
	expect(logged).toBe(false);
    });

    it('User logged', function () {
	cookies.shike_user = 'user01';
	var logged = authService.isLogged();
	expect(logged).toBe(true);
    });

    it ('AuthRequest', function () {
	cookies.shike_token = 'authenticated';
	var authResponse;
	var authcall = function (value) {
	    authResponse = value;
	}
	expect(authResponse).not.toBeDefined();
	authService.authRequest(authcall);
	expect(authResponse).toBe('authenticated');
    });
});

/**
  * Name: ShikeDataServiceTest
  * Package: Map
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per ShikeDataService
  *
  */
/*
describe('ShikeDataService Test', function () {
    var httpBackend, BACKEND_URL, shikeDataService;
    var dataReceived, failure, success;

    var callback = function (response, data) {
	dataReceived = data;
	if(response) {
	    success = true;
	} else {
	    failure = true;
	}
    };
	
    beforeEach(module('map'));

    beforeEach(module(function($provide) {
	BACKEND_URL = 'localhost';
	$provide.value('BACKEND_URL', BACKEND_URL);
    }));

    beforeEach(inject(function($httpBackend, _ShikeDataService_) {
	httpBackend = $httpBackend;
	shikeDataService = _ShikeDataService_;
    }));

    beforeEach(function () {
	dataReceived = '';
	success = false;
	failure = false;
    });

    it('Successfully getPaths', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;
	var data = {
	    paths: 'Hokuto Road'
	};

	httpBackend.whenGET(BACKEND_URL + "/paths/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(201, data);
	shikeDataService.getPaths(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('Hokuto Road');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getPaths', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;

	httpBackend.whenGET(BACKEND_URL + "/paths/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(404, 'error');
	shikeDataService.getPaths(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });

    it('Successfully getPOIs', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;
	var data = {
	    poi: 'Hokuto Temple'
	};

	httpBackend.whenGET(BACKEND_URL + "/poi/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(201, data);
	shikeDataService.getPOIs(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('Hokuto Temple');
	expect(success).toBe(true);
	expect(failure).toBe(false);
    });

    it('Wrong getPOis', function () {
	expect(dataReceived).toBe('');
	expect(success).toBe(false);
	expect(failure).toBe(false);

	var from = {
	    lat: 21,
	    lng: 33,
	};
	var to = from;

	httpBackend.whenGET(BACKEND_URL + "/poi/" + from.lat + ";" + from.lng
			    + "/" + to.lat + ";" + to.lng)
	    .respond(404, 'error');
	shikeDataService.getPOIs(from, to, callback);
	httpBackend.flush();

	expect(dataReceived).toBe('error');
	expect(success).toBe(false);
	expect(failure).toBe(true);
    });
});
*/

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);