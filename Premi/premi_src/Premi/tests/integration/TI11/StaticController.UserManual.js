/**
 * File: StaticController.UserManual.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 14/06/2015
 * Descrizione: Test di integrazione TI11 - Integrazione view-controller
 * StaticController-UserManual
 */

'use strict';

var path = require('path'),
    should = require('should'),
    StaticController = require(path.resolve('./app/controllers/StaticController')),
    send = require('express/node_modules/send');

describe('TI11 - Viene verificato che le View si integrino con i Controller per fornire pagine web statiche.', function(){
    var req= function()
    {
        this.next= function(){};
    }
    var res= function ()
    {
        this.status= null;
        this.req= new req();
        var self=this;
        this.sendFile = function sendFile(path, options, fn) {
              var req = self.req;
              var res = self;
              var next = req.next;

              if (!path) {
                throw new TypeError('path argument is required to res.sendFile');
              }

              // support function as second arg
              if (typeof options === 'function') {
                fn = options;
                options = {};
              }

              options = options || {};

              // create file stream
              var pathname = encodeURI(path);
              var file = send(req, pathname, options);
              self.status='file sent';
            };
    }
    it('dovrebbe seguire il flusso di esecuzione atteso per getUserManual a partire da StaticController',
     function(done){
       var request= new req(); 
       var result= new res(); 
       StaticController.getUserManual(request,result);
       result.status.should.be.exactly('file sent');
       done();
    });
});
