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
