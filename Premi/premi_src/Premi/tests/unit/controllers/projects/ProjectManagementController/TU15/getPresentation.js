/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 03/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU15 - getPresentation()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.project=
            {
                _id : "555c3bfe7e9caf422910868e",
                root : "555c3bfe7e9caf422910868f",
                userId : "55599238e1c47fdd02e31523",
                name : "pippo",
                fontFamily : "sans-serif",
                fontColor : "default",
                bkgColor : "default",
                paths : [
                    {
                        _id : "555c3bfe7e9caf4229108691",
                        name : "Default",
                        default : true,
                        nodes : [
                            "555c3bfe7e9caf422910868f"
                        ]
                    }
                ],
                relations : [ ],
                nodes : [
                    {
                        "_id" : "555c3bfe7e9caf422910868f",
                        "contents" : [
                            {
                                "_id" : "555c3bfe7e9caf4229108690",
                                "class" : "title",
                                "width" : 0,
                                "height" : 0,
                                "y" : 5.8,
                                "x" : 28,
                                "content" : "Nuovo nodo"
                            }
                        ]
                    }
                ]
            };//valore preso dal database premi-dev in modo da avere un id valido
        };
        res= function () {
            this.json = function(result){
                should.exist(result);
            };
        };
        done();
    });

    it('Dovrebbe eseguire correttamente passando un progetto valido', function (done) {
        var request= new req();
        var response = new res();
        ProjMgmtCtrl.getPresentation(request, response);//valore preso dal database premi-dev in modo da avere un id valido
        done();
    });
});
