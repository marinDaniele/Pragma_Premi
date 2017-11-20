/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU9 - nodeById()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.objid = '555c3bfe7e9caf422910868e';//valore preso dal database premi-dev in modo da avere un id valido
            var self= this;
            this.project= {
                nodes : [1]
            };
            this.project.nodes.id = function(id){
                if(id === self.objid)
                    return true;
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
        var request= new req();
        var response = new res();
        NodeCtrl.nodeById(request, response, function(err){
            if(err)
                response.error= 1;
        }, 'abc');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId valido', function (done) {
        var request= new req();
        var response = new res();
        NodeCtrl.nodeById(request, response,
            function(err){
                if(err)
                    response.error= 1;
            }, '555c3bfe7e9caf422910868e');
        should.not.exist(response.error);
        done();
    });
});
