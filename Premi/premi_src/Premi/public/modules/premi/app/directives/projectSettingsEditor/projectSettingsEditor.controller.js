/**
 * @class ProjectSettingsEditorController
 * @classdesc Classe che si occupa di gestire la logica di funzionamento della
 * directive premiProjectSettingsEditor.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFD4.1, RFF4.6, RFF4.6.1,
 * RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFF4.6.3
 * @memberOf Front-End::Controllers
 */
(function (){
	'use strict';

	angular
		.module('premi.controllers')
		.controller('ProjectSettingsEditorController', ProjectSettingsEditorController);

	ProjectSettingsEditorController.$inject = ['$scope','$mdDialog',
		'projectService'];

	function ProjectSettingsEditorController($scope, $mdDialog, projectService) {

		/* Colori da visualizzare nelle dropdown box*/
		$scope.colors = ['default','red','violet','blue','green','yellow',
			'orange','white','black'];
		/* Fontfamily da visualizzare nelle dropdown box*/
		$scope.fontFamilies = ['serif','sans-serif','monospace'];

		var currentProject = projectService.getCurrentProject();


		$scope.project = {
			name: currentProject.getName(),
			textColor: currentProject.getTextColor(),
			backgroundColor: currentProject.getBackgroundColor(),
			fontFamily: currentProject.getFontFamily()
		};

		$scope.stylePreview = $scope.project.textColor + 'Text ' +
			$scope.project.backgroundColor +'Bkg ' + $scope.project.fontFamily;

		/**
		 * @function selectChanged
		 * @instance
		 * @desc Metodo che aggiorna l'anteprima dello stile del progetto,
		 * viene invocato ogni volta che l'utente seleziona una nuova opzione
		 * per lo stile del progetto.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.ProjectSettingsEditorController
		 */
		$scope.selectChanged = function (){
			//console.log('selected changed');
			$scope.stylePreview = $scope.project.textColor + 'Text ' +
				$scope.project.backgroundColor +'Bkg ' +
				$scope.project.fontFamily;
		};
		/**
		 * @function cancel
		 * @instance
		 * @desc Metodo che gestisce l'evento di click sul pulsante che nasconde
		 * la directive.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.ProjectSettingsEditorController
		 */
		$scope.cancel = function () {
			$mdDialog.cancel();

		};
		/**
		 * @function confirm
		 * @instance
		 * @desc Metodo che viene invocato quando l'utente conferma le modifiche
		 * al progetto, si occupa di salvare le modifiche utilizzando
		 * <tt>ProjectService</tt>.
		 * @returns {void}
		 * @memberOf Front-End::Controllers.ProjectSettingsEditorController
		 */
		$scope.confirm = function () {
			currentProject.setName($scope.project.name);
			currentProject.setBackgroundColor($scope.project.backgroundColor);
			currentProject.setTextColor($scope.project.textColor);
			currentProject.setFontFamily($scope.project.fontFamily);

			projectService.finalizeProjectUpdates()
				.catch(function (error){$scope.$emit('premi-error',error);});
			$mdDialog.hide();

		};
	}
})();
