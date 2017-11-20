/**
 * @author Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-06-13
 */
var path = require('path');
var DashboardPage = require(path.resolve('./tests/system/pages/DashboardPage'));
var LoginPage = require(path.resolve('./tests/system/pages/LoginPage'));
var EditorPage = require(path.resolve('./tests/system/pages/EditorPage'));


describe('TSFD4.1 - Viene verificato che il sistema modifichi correttamente ' +
	'il nome di un progetto.',function () {

	var dashboardPage = new DashboardPage();
	var loginPage = new LoginPage();
	var editorPage = new EditorPage();
	beforeEach(function () {
		browser.get('#/login');
		loginPage.login('giacomo2@pragma.it','qwerty12');
	});

	it('Viene verificato che l\'utente riesca ad apreire un progetto e a' +
		' modificare il nome',function () {

		var oldTitle = '';

		expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
		//Sono sulla dashboard
		//prendo il primo elemento della lista dei progetti
		dashboardPage.getEditButtonForIndex(0).then(function (btnEdit){
			btnEdit.click();
			expect(browser.getLocationAbsUrl()).toMatch('/editor');
			oldTitle = editorPage.getProjectName();
			editorPage.setProjectName('Plutone');
			expect(editorPage.getProjectName()).toBe('Plutone');
		});
	});
});
