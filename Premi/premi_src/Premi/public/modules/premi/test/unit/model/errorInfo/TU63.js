/**
 * File: TU63.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-17
 * Descrizione: Test di unità  TU63 Premi::Front-End::Model::ErrorInfo
 */
'use strict';
describe('TU63 ErrorInfo', function() {
	var errorInfo;

	beforeEach(module('premi'));

	beforeEach(function(){
		errorInfo = new ErrorInfo('Errore','Messaggio',404);
	});

	it('Il costruttore deve costruire l\'oggetto', function() {
		expect(errorInfo).toBeDefined();
	});

	it('Il metodo getTitle() deve funzionare ritornare il titolo corretto',function(){
		var titolo = errorInfo.getTitle();
		expect(titolo).toBe('Errore');
	});

	it('Il metodo getMessagge() deve funzionare ritornare il messaggio corretto',function(){
		var messaggio = errorInfo.getMessage();
		expect(messaggio).toBe('Messaggio');
	});

	it('Il metodo getCode() deve funzionare ritornare il codice corretto',function(){
		var codice = errorInfo.getCode();
		expect(codice).toBe(404);
	});

});
