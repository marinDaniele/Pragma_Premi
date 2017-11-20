/**
 * @class premiProjectList
 * @classdesc Rappresenta il componente grafico che mostra la lista dei progetti
 * creati dall’utente. Per ogni progetto della lista è presente un pulsante
 * che permette di modificarlo, di cancellarlo e di presentarlo.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO4, RFD7.1, RFO11, RFO11.2,
 * RFO11.1, RFO10, RFO10.1, RFO10.2, RFO11.3
 * @example <premi-project-list projects="demoProjects"
 on-edit="log(projectId)"
 on-delete="log(projectId)"
 on-play="startPresentation(pathId,projectId)">
 </premi-project-list>
 * @memberOf Front-End::Directives
 */

(function (){
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiProjectsList', projectsListDirective);

    function projectsListDirective(){

        return {
            restrict:'E',
            scope: {
                projects:'=',
                onEdit:'&',
                onDelete:'&',
                onPlay:'&'
            },
            replace: true,
            controller: "ProjectsListController",
            templateUrl: 'app/directives/projectsList/projectsList.html'
        };
    }
})();
