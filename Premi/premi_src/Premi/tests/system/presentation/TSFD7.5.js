/**
 * @author Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-06-13
 */
var path = require('path');
var DashboardPage = require(path.resolve('./tests/system/pages/DashboardPage'));
var LoginPage = require(path.resolve('./tests/system/pages/LoginPage'));
var PresentationPage = require(path.resolve('./tests/system/pages/' +
	'PresentationPage'));

describe('TSFD7.5 - Viene verificato che il sistema chiuda correttamente la' +
	' presentazione corrente.', function (){

	var dashboardPage = new DashboardPage();
	var loginPage = new LoginPage();
	var presentationPage = new PresentationPage();

	beforeEach(function () {
		browser.get('#/login');
		loginPage.login('giacomo2@pragma.it','qwerty12');
	});

	it('Viene aperta una presentazione e successivamente viene' +
		' termianta' , function () {
		//Controllo di essere nella dashboard
		expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

		//Sono sulla dashboard
		//prendo il primo elemento della lista dei progetti
		dashboardPage.playProjectDefault('PremiWars');
		expect(browser.getLocationAbsUrl()).toMatch('/presentation');
		//Cerco il titolo del percorso di presentazione
		//e controllo che sia quello corretto ('Default')
		var currentPath = presentationPage.getPathName();
		expect(currentPath).toEqual('Default');

		presentationPage.btnBurger.click();
		presentationPage.btnQuitPresentation.click();

		expect(browser.getLocationAbsUrl()).toMatch('/paths');
	});
});
