/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 04/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    PremiError = require(path.resolve('./app/controllers/errors/PremiError'));

describe('TU8 - PremiError() - costruttore', function() {

    it('Dovrebbe creare un errore con codice: 0 e titolo: \"Errore sconosciuto\" se viene passato un errore non definito', function (done) {
        var error= {
            message : ''
            };
        error = new PremiError(error);
        should.exist(error);
        error.code.should.be.exactly(0);
        error.title.should.be.exactly('Errore sconosciuto');
        done();
    });

    it('Dovrebbe creare un errore con titolo: \"Errore sconosciuto\" e messaggio contenente la stringa \"Codice sconosciuto: \" se viene passato un errore definito ma che non corrisponde a nessun codice che identifichi un PremiError', function (done) {
        var error= 404;
        error = new PremiError(error);
        should.exist(error);
        error.message.should.containEql('Codice sconosciuto: ');
        error.title.should.be.exactly('Errore sconosciuto');
        done();
    });

    it('Dovrebbe creare un errore con titolo: \"Progetto corrotto\" e messaggio: \"Errore durante l\'eliminazione del progetto\" se viene passato un errore con codice 8002 che identifica un PremiError', function (done) {
        var error= 8002;
        error = new PremiError(error);
        should.exist(error);
        error.code.should.be.exactly(8002);
        error.message.should.be.exactly('Errore durante l\'eliminazione del progetto');
        error.title.should.be.exactly('Progetto corrotto');
        done();
    });
});
