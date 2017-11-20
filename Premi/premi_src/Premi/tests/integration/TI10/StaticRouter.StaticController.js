/**
 * File: StaticRouter.StaticController.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 14/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * StaticRouter-StaticController
 */
'use strict';
var path = require('path'),
    should = require('should'),
    request = require('supertest'),
    server = require(path.resolve('server'));

describe('TI10 - StaticRouter : GET /statics/userManual', function(){

    it('dovrebbe seguire il flusso di esecuzione atteso per getUserManual', function(done){
        request(server)
            .get('/statics/userManual')
            .expect(303,function(err, result) {//303 == redirect status code
                should.not.exist(err);
                should.exists(result);
                result.type.should.be.exactly('text/html');
                result.header.location.should.be.exactly('/statics/userManual/');
                done();
            });
    });
});
