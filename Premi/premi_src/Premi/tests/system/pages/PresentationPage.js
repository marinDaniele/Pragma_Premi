/**
 * Created by gmanzoli on 14/06/15.
 */
function PresentationPage () {
	this.pathName = element(by.binding('currentPath'));//.getText();
	this.presentation = element(by.id('presentation'));
	this.btnNext = element(by.css('[ng-click="nextStep()"]'));
	this.btnPrev = element(by.css('[ng-click="previousStep()"]'));
	this.btnBurger = element(by.id('presentationViewer'))
		.element(by.css('[ng-click="toggleSidenav()"]'));

	this.btnQuitPresentation = element(by.css('[ng-click="' +
		'quitPresentation()"]'));

}

PresentationPage.prototype.getCurrentSlide = function () {
	return element(by.className('active'));
};

PresentationPage.prototype.getNextSlide = function () {
	return element(by.className('nextStep'));
};

PresentationPage.prototype.getPrevSlide = function () {
	return element(by.className('prevStep'));
};

PresentationPage.prototype.getPathName = function () {
	return this.pathName.getText();
};

module.exports = PresentationPage;
