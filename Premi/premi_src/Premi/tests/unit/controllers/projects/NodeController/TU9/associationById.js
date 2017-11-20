/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU9 - associationById()', function() {
    var req, res;

    before(function (done) {
        req = function (rel) {
            this.objid = '555c3bfe7e9caf422910868e';//valore preso dal database premi-dev in modo da avere un id valido
            var self= this;
            this.project= {
                relations : [1]
            };
            this.project.relations.id = function(id){
                if(id === self.objid)
                    return { property : '1', class : rel };
                else
                    return false;
            };
        };
        res= function () {
            this.error= null;
        };
        done();
    });

    it('Dovrebbe fallire passando un ObjectId non valido', function (done) {
        var request= new req('association');
        var response = new res();
        NodeCtrl.associationById(request, response, function(err){
            if(err)
                response.error= 1;
        }, 'abc');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire se non viene specificato il tipo di associazione', function (done) {
        var request= new req('');
        var response = new res();
        NodeCtrl.associationById(request, response, function(err){
            if(err)
                response.error= 1;
        }, '555c3bfe7e9caf422910868e');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire se il tipo di associazione è diversa da association', function (done) {
        var request= new req('relation');
        var response = new res();
        NodeCtrl.associationById(request, response, function(err){
            if(err)
                response.error= 1;
        }, '555c3bfe7e9caf422910868e');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId valido', function (done) {
        var request= new req('association');
        var response = new res();
        NodeCtrl.associationById(request, response,
            function(err){
                if(err)
                    response.error= 1;
            }, '555c3bfe7e9caf422910868e');
        should.not.exist(response.error);
        done();
    });
});
