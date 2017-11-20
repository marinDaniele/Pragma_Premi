/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    PathCtrl = require(path.resolve('./app/controllers/projects/PathController'));

describe('TU12 - pathById()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.objid = '555c3bfe7e9caf422910868a';
            var self= this;
            this.project= {
                paths : [1]
            };
            this.project.paths.id = function(id){
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
        PathCtrl.pathById(request, response, function(err){
            if(err)
                response.error= 1;
        }, 'abc');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId valido', function (done) {
        var request= new req();
        var response = new res();
        PathCtrl.pathById(request, response,
            function(err){
                if(err)
                    response.error= 1;
            }, '555c3bfe7e9caf422910868a');
        should.not.exist(response.error);
        done();
    });
});
