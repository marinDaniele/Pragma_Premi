
function DashboardPage() {
	this.btnNuovoProgetto = element(by.id('btn-nuovo-progetto'));
	//Textbox del pop-up per la scelta del nome
	this.txtNomeProgetto = element(by.id('input_003'));
	this.btnAggiungiProgetto = element(by.id('btn-aggiungi-progetto'));
	this.projectsList = element.all(by.repeater('project in projects'));

}

//operazioni

DashboardPage.prototype.createNewProject = function () {
	this.getNewProjectButton().click();
	this.setNewProjectName('2');
	this.getAddProjectButton().click();
};


DashboardPage.prototype.playProjectDefault = function (name) {
	element.all(by.repeater('project in projects'))
		.filter(function (elem) {
			return elem.getText().then(function (text) {
				return text === name;
			});
		})
		.then(function (filteredElements) {
			//Click sul pulsante per la presentazione del progetto
			//PremiWars
			filteredElements[0]
				.element(by.css('[ng-click="showPaths(project._id,' +
				' project.paths)"]')).click();
			element(by.repeater('path in paths').row(0))
				.element(by.css('[ng-click="selectedPath(path._id)"]'))
				.click();

		});
};

DashboardPage.prototype.editProjctWithName = function (name) {
	element.all(by.repeater('project in projects'))
		.filter(function (elem) {
			return elem.getText().then(function (text) {
				return text === name;
			});
		})
		.then(function (filteredElements) {
			//Click sul pulsante per la presentazione del progetto
			//PremiWars
			filteredElements[0]
				.element(by.css('[ng-click="onEdit({projectId:project._id})"]'))
				.click();
		});
};

// ---- getter e setter

DashboardPage.prototype.getEditButtonForIndex = function (index) {

	return element.all(by.css('[ng-click="onEdit({projectId:project._id})"]'))
		.then(function (array){
			return array[index];
		});
};


DashboardPage.prototype.setNewProjectName = function (text){
	this.txtNomeProgetto.sendKeys(text);
};

DashboardPage.prototype.getProjectsList = function () {
	return this.projectsList;
};

DashboardPage.prototype.getNewProjectButton = function () {
	return this.btnNuovoProgetto;
};

DashboardPage.prototype.getAddProjectButton = function () {
	return this.btnAggiungiProgetto;
};
module.exports = DashboardPage;

