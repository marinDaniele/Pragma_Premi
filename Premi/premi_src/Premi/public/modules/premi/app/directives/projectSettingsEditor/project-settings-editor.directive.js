/**
 * @class premiProjectSettingsEditor
 * @classdesc Rappresenta il componente grafico che permette di modificare i
 * dati del progetto aperto. Questo componente presenta i vari campi per
 * interagire con i parametri del progetto e due pulsanti che l'utente
 * utilizza per confermare o annullare le modifiche.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFD4.1, RFF4.6, RFF4.6.1,
 * RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFF4.6.3
 * @example <premi-project-settings-editor></premi-project-settings-editor>
 * @memberOf Front-End::Directives
 */
(function () {
	'use strict';
	angular
		.module('premi.directives')
		.directive('premiProjectSettingsEditor', projectSettingsEditor);

	function projectSettingsEditor() {
		return {
			restrict: 'E',
			scope: {},
			replace:true,
			templateUrl: 'app/directives/projectSettingsEditor/projectSettingsEditor.html',
			controller: 'ProjectSettingsEditorController'
		};
	}
})();
