/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU10 - addAssociation()', function() {
    var req, res;

    before(function (done) {
        req = function (sId,dId,mode) {
            var self = this;
            this.mode = mode;
            this.project= {
                nodes : ['555c3bfe7e9caf422910868e','555c3bfe7e9caf422910868d']//valore preso dal database premi-dev in modo da avere un id valido
            };
            this.association = {
                _id : sId
            };
            this.body= {
                sourceId : sId,
                destinationId : dId
            };
            this.project.nodes.id = function(id) {
                var sentry = {
                    _id : ''
                };
                self.project.nodes.forEach(function (el) {
                    if (id === el)
                        sentry._id = id;
                });
                return sentry;
            };
            this.project.addAssociation = function(source,destination,callback,errback)
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

    it('Dovrebbe fallire quando viene passato un ObjectId non valido', function (done) {
        var request = new req('abc','def','callback');
        var response = new res();
        NodeCtrl.addAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire quando vengono passati due ObjectId validi ma che rappresentano lo stesso valore', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','555c3bfe7e9caf422910868e','callback');
        var response = new res();
        NodeCtrl.addAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire quando vengono passati due ObjectId validi ma si verifica un errore mentre si sta aggiungendo l\'associazione', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','555c3bfe7e9caf422910868d','errback');
        var response = new res();
        NodeCtrl.addAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente l\'aggiunta del\'associazione quando vengono passati due ObjectId validi', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','555c3bfe7e9caf422910868d','callback');
        var response = new res();
        NodeCtrl.addAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
