/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */

'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    PathCtrl = require(path.resolve('./app/controllers/projects/PathController'));

describe('TU13 - deleteNodeFromPath()', function() {
    var req, res;

    before(function (done) {
        req = function (pId, nId, mode) {
            var self = this;
            this.mode = mode;
            //finto progetto con percorsi
            this.project= {
                paths : [{_id: pId, name:'path', nodes: [nId]}]
            };
            //id del percorso
            this._path = {
                _id : pId
            };
            //nodo da aggiungere
            this.node = {
                _id : nId
            };
            //stub del metodo da invocare
            this.project.removeNodeFromPath = function(nId,pId,callback,errback)
            {
                if(self.mode == 'callback')
                     callback(self.project.paths[0]);
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

    it('Dovrebbe fallire passando un nodo non presente nel percorso', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','abg','err');
        var response = new res();
        PathCtrl.deleteNodeFromPath(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente ed rimuovere il nodo dal percorso', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','555c3bfe7e9caf422910868e','callback');
        var response = new res();
        PathCtrl.deleteNodeFromPath(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
