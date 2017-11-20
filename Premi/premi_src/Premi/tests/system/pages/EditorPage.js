/**
 * Created by gmanzoli on 13/06/15.
 */
function EditorPage() {
	this.btnSettings = element(by.css('[ng-click="' +
		'showProjectSettingsEditor($event)"]'));
	this.txtName = element(by.model('project.name'));
	//Bottone per la conferma delle modifiche al progetto
	this.btnConferma = element(by.css('[ng-click="confirm()"]'));
	this.projectName = element( by.id('toolbar-title') );

	this.nodeCanvas =  element(by.css('[data-id="layer2-node"]'));

	this.contextMenu = {
		btnClose: element(by.css('[ng-click="cancel()"]'))
	};
	this.editWindow = {
		btnSalva: element(by.css('[ng-click="saveClicked()"]')),
		btnAddText: element(by.css('[ng-click="addTextContent()"]')),
		btnAddImage: element(by.css('[ng-click="addImageContent()"]')),
		btnDelete: element(by.css('[ng-click="deleteNodeContent()"]')),
		txtContent: element(by.model('selectedNodeContent.content')),
		getContentList: function () {
			return element.all(by.repeater('nodeContent in ' +
				'node.getContents()'));
		}
	};
}

EditorPage.prototype.editNode = function () {
	element.all(by.css('[ng-click="call(fun)"]'))
		.filter(function(elem) {
			return elem.getText().then(function(text) {
				return text === 'MODIFICA NODO';
			});
		}).then(function(filteredElements) {
			filteredElements[0].click();
		});
};

EditorPage.prototype.createChildNode = function () {
	element.all(by.css('[ng-click="call(fun)"]'))
		.filter(function(elem) {
			return elem.getText().then(function(text) {
				return text === 'AGGIUNGI NODO FIGLIO';
			});
		}).then(function(filteredElements) {
			filteredElements[0].click();
		});
};

EditorPage.prototype.getProjectName = function (){
	return this.projectName.getText();
};

EditorPage.prototype.setProjectName = function (name) {
	this.btnSettings.click();
	var btnConferma = this.btnConferma;
	var txtName = this.txtName;
	this.txtName.clear().then(function () {
		txtName.sendKeys(name);
		btnConferma.click();
	});

};

module.exports = EditorPage;
