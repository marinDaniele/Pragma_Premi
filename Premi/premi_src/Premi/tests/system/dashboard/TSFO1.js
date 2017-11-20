/**
 * @author Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-06-12
 */
var path = require('path');
var DashboardPage = require(path.resolve('./tests/system/pages/DashboardPage'));
var LoginPage = require(path.resolve('./tests/system/pages/LoginPage'));


describe('TSFO1/TSFO2 - Viene verificato che il sistema crei correttamente un' +
	' nuovo progetto / usando un desktop.', function () {

	var dashboardPage = new DashboardPage();
	var loginPage = new LoginPage();
	beforeEach(function () {
		browser.get('#/login');
	});


	it('Effettua il login e crea un nuovo progetto',function (){
		expect(browser.getTitle()).toEqual('Premi');
		loginPage.login('giacomo2@pragma.it','qwerty12');
		expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
		var count;
		dashboardPage.getProjectsList()
			.then(function (result){
				count=result.length;
				dashboardPage.createNewProject();
				expect(dashboardPage.getProjectsList().count()).toBe(count+1);
			});
	});
});
