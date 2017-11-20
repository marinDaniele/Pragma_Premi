/**
 * @author Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-06-13
 */
var path = require('path');
var DashboardPage = require(path.resolve('./tests/system/pages/DashboardPage'));
var LoginPage = require(path.resolve('./tests/system/pages/LoginPage'));
var PresentationPage = require(path.resolve('./tests/system/pages/' +
	'PresentationPage'));

describe('TSFO7 - Viene verificato che il sistema esegua correttamente la ' +
	'presentazione di un progetto.', function () {

	var dashboardPage = new DashboardPage();
	var loginPage = new LoginPage();
	var presentationPage = new PresentationPage();

	beforeEach(function () {
		browser.get('#/login');
		loginPage.login('giacomo2@pragma.it','qwerty12');
	});

	it ('Viene aperta una presentazione',function () {
		expect(browser.getLocationAbsUrl()).toMatch('/dashboard');

		//Sono sulla dashboard
		//prendo il primo elemento della lista dei progetti
		dashboardPage.playProjectDefault('PremiWars');
		expect(browser.getLocationAbsUrl()).toMatch('/presentation');
	});

	it ('Viene effettuato un passaggio di slide in avanti e un passaggio' +
		' all\'indietro', function () {
		dashboardPage.playProjectDefault('PremiWars');

		var currentPath = presentationPage.getPathName();
		//Controllo se sto presentando il percoso giusto
		expect(currentPath).toEqual('Default');

		var nextSlideId = presentationPage.getNextSlide().getAttribute('id');
		presentationPage.btnNext.click();
		var currentSlideId = presentationPage.getCurrentSlide()
			.getAttribute('id');

		//Controllo che la slide corrente sia la stessa che prima di passare
		// avanti era la successiva
		expect(currentSlideId).toBe(nextSlideId);

		var prevSlideId = presentationPage.getPrevSlide().getAttribute('id');
		presentationPage.btnPrev.click();

		currentSlideId = presentationPage.getCurrentSlide().getAttribute('id');

		expect(currentSlideId).toBe(prevSlideId);
	});
});
