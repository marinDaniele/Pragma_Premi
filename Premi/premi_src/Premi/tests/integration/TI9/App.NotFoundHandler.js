/**
 * File: App.NotFoundHandler.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI9 - Integrazione routers-package "App" - NotFoundHandler
 */

'use strict';

var path = require('path'),
    should = require('should'),
    request = require('supertest'),
    server = require(path.resolve('server'));

describe('TI9 - App.NotFoundHandler', function(){

    it('dovrebbe seguire il flusso di esecuzione atteso per NotFoundHandler ritornando un errore 404', function(done){
        request(server)
            .get('/statics/notfoundhandler')
            .expect(404,function(err, result) {//404 == resource not found
                should.not.exist(err);
                should.exists(result.body);
                done();
            });
    });
});
