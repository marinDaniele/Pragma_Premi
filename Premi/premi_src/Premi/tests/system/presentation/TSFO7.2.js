/**
 * @author Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-06-13
 */
var path = require('path');
var DashboardPage = require(path.resolve('./tests/system/pages/DashboardPage'));
var LoginPage = require(path.resolve('./tests/system/pages/LoginPage'));
var PresentationPage = require(path.resolve('./tests/system/pages/' +
	'PresentationPage'));


describe('TSFO7.2 - Viene verificato che il sistema esegua correttamente il' +
	' passaggio ad un frame successivo in modalità presentazione',function () {

	var dashboardPage = new DashboardPage();
	var loginPage = new LoginPage();
	var presentationPage = new PresentationPage();

	beforeEach(function () {
		browser.get('#/login');
		loginPage.login('giacomo2@pragma.it','qwerty12');
	});

	it('Deve essere caricato il percorso di default e deve essere possibile' +
		' passare alla seconda slide',function () {

		expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

		//Sono sulla dashboard
		//prendo il primo elemento della lista dei progetti
		dashboardPage.playProjectDefault('PremiWars');
		expect(browser.getLocationAbsUrl()).toMatch('/presentation');
		//Cerco il titolo del percorso di presentazione
		//e controllo che sia quello corretto ('Default')
		var currentPath = presentationPage.getPathName();
		expect(currentPath).toEqual('Default');

		var nextSlideId = presentationPage.getNextSlide().getAttribute('id');
		presentationPage.btnNext.click();
		var currentSlideId = presentationPage.getCurrentSlide()
			.getAttribute('id');

		//Controllo che la slide corrente sia la stessa che prima di passare
		// avanti era la successiva
		expect(currentSlideId).toBe(nextSlideId);
	});
});
