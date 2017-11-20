/**
 * @class premiMindmap
 * @classdesc Rappresenta il componente grafico che disegna la mappa mentale.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFD22
 * @example <premi-mindmap></premi-mindmap>
 * @memberOf Front-End::Directives
 */
(function () {
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiMindmap', mindmapDirective);


    mindmapDirective.$inject = ['$document','$timeout','mindmapService'];

    function mindmapDirective($document, $timeout, mindmapService) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'app/directives/mindmap/mindmap.html',
            link:link
        };
        /**
         * @function link
         * @instance
         * @desc Funzione che viene invocata da Angular durante la fase di
         * compilazione della pagina. Permette manipolare il DOM,
         * aggiungendo nuovi elementi o definendo un comportamento per
         * l’elemento.  Viene utilizzata per disegnare la mappa mentale.
         * @memberOf Front-End::Directives.premiMindmap
         */
        function link(){
            $document.ready(function (){
                $timeout(function (){
                    console.log('MMC drawmap');
                    mindmapService.drawMap().then(function (){
                        console.log('--- Mappa disegnata');
                    });
                },0);
            });
        }
    }
})();
