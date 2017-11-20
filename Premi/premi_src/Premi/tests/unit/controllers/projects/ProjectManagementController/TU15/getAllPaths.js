/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 03/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU15 - getAllPaths()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.project= { _id : "555c3bfe7e9caf422910868e" };//valore preso dal database premi-dev in modo da avere un id valido
        };
        res= function () {
            this.error= null;
            this.json = function(result){};
        };
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId qualsiasi', function (done) {
        var request= new req();
        var response = new res();
        ProjMgmtCtrl.getAllPaths(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });//valore preso dal database premi-dev in modo da avere un id valido
        should.not.exist(response.error);
        done();
    });
});
