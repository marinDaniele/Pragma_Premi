/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */

'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    PathCtrl = require(path.resolve('./app/controllers/projects/PathController'));

describe('TU13 - updatePath()', function() {
    var req, res;

    before(function (done) {
        req = function (pId,name,mode) {
            var self = this;
            this.mode = mode;
            //finto percorso con progetti
            this.project= {
                paths : []
            };
            //id del nuovo percorso
            this._path = {
                _id : pId
            };
            //body della richiesta
            this.body= {
                name : name
            };
            //stub del metodo da invocare
            this.project.setPathName = function(pId,name,callback,errback)
            {
                if(self.mode == 'callback')
                    callback();
                else
                    errback(1);

            };
        };
        res = function () {
            this.error = null;
            this.json = function (messagge) {};
        };
        done();
    });
    it('Dovrebbe fallire quando viene passato un nome vuoto', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','','callback');
        var response = new res();
        PathCtrl.updatePath(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente quando viene passato un nome valido', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','path','callback');
        var response = new res();
        PathCtrl.updatePath(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
