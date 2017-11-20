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
