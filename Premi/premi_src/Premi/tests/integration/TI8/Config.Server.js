/**
 * File: Config.Server.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 12/06/2015
 * Descrizione: Test di integrazione TI8 - Creazione e configurazione del server
 */

'use strict';

describe('TI8 - Creazione e configurazione del server', function(){
    var browser,
        server,
        phantom = require('phantom'),
        should = require('should'),
        path = require('path');

    this.timeout(5000);
    before(function (done) {
        phantom.create(function (ph) {
            ph.createPage(function (tab) {
                browser = tab;
                server = require(path.resolve('server'));//default is listening on port 3001, check the config.js file for testing enviroment
                done();
            });
        });
    });
    it('Viene verificato che il server si avvii correttamente, utilizzando Config per effettuare le ' +
        'configurazioni dell’applicazione, mediante App', function (done) {
        browser.open('http://localhost:3001/', function (status) {
            status.should.be.exactly('success');
            browser.evaluate(function () { return document.title; }, function (result) {
                should.exist(result);
            });
        });
        done();
    });
});
