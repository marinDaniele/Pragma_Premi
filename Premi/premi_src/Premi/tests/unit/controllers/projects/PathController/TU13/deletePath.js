/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */

'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    PathCtrl = require(path.resolve('./app/controllers/projects/PathController'));

describe('TU13 - deletePath()', function() {
    var req, res;

    before(function (done) {
        req = function (pId, mode) {
            var self = this;
            this.mode = mode;
            //finto progetto con percorsi
            this.project= {
                paths : [{_id: pId, name:'path', nodes: []}]
            };
            //id del percorso
            this._path = {
                _id : pId
            };
            //stub del metodo da invocare
            this.project.removePath = function(pId,callback,errback)
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

    it('Dovrebbe eseguire correttamente ed eliminare il percorso', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','callback');
        var response = new res();
        PathCtrl.deletePath(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
