/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 03/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU14 - projectById()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.user= { _id : "5568d21c7096b5c0017d91dd" };//valore preso dal database premi-dev in modo da avere un id valido
        };
        res= function () {
            this.error= null;
        };
        done();
    });

    it('Dovrebbe fallire passando un ObjectId non valido', function (done) {
        var request= new req();
        var response = new res();
        ProjMgmtCtrl.projectById(request, response, function(err){
            if(err)
                response.error= 1;
        }, 'abc');
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId valido', function (done) {
        var request= new req();
        var response = new res();
        ProjMgmtCtrl.projectById(request, response,
            function(err){
                if(err)
                    response.error= 1;
            }, '555c3bfe7e9caf422910868e');//valore preso dal database premi-dev in modo da avere un id valido
        should.not.exist(response.error);
        done();
    });
});
