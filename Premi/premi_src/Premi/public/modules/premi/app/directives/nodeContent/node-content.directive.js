/**
 * @class premiNodeContent
 * @classdesc Rappresenta un elemento contenuto nel frame di un nodo. Questo
 * componente deve essere in grado di rappresentare le varie tipologie di
 * contenuto che possono essere presenti all’interno di un nodo.
 * La discriminazione del tipo del contenuto deve essere fatta in base ai
 * campi dati dell’oggetto nodeContent.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO7.7
 * @example <premi-node-content node-content="nodeContent"><premi-node-content>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';

    angular
        .module('premi.directives')
        .directive('premiNodeContent', nodeContentDirective);

    nodeContentDirective.$inject = ['$window','$compile'];

    function nodeContentDirective($window,$compile){
        return{
            restrict:'E',
            scope: {
                nodeContent:'='
            },
            link: linkFn,
            template:'<div class="content {{ nodeContent.getType() }}">' +
            '{{ divContent }}</div>'
        };

        /**
         * @function link
         * @instance
         * @desc Funzione che viene invocata da Angular durante la fase di
         * compilazione della pagina. Permette manipolare il DOM, aggiungendo
         * nuovi elementi o definendo un comportamento per l’elemento.
         * Viene utilizzata per creare l'elemento del DOM corretto in base al
         * tipo di contenuto dell'oggetto e per gestire l'evento <tt>resize</tt>
         * della pagina.
         * @param {Scope} scope - Parametro contenente un riferimento allo
         *  <tt>scope</tt> della directive.
         * @param {DOMElement} element - Parametro contenente un oggetto della
         * libreria jQuery rappresentante l'elemento del DOM contenente la
         * directive.
         * @memberOf Front-End::Directives.premiNodeContent
         */
        function linkFn(scope,element){

            /* Gestione del resize delle pagina, viene utilizzata una
             * funzione per regolare lo scaling del font.
             */
            function resizeFont() {
                var width =  element.parent().width();
                element[0].style.fontSize = width * 0.2 +'%';
            }
            resizeFont();
            angular.element($window).on('resize', resizeFont);

            /* Viene utilizzato divContent al posto di content per evitare
            problemi con l'url dell'immagine */
            scope.divContent = scope.nodeContent.getContent();
            if (scope.nodeContent.getType() === 'imgUrl'){
                var htmlElement = '<img class="content ' +
                    '{{ nodeContent.getType() }}" ' +
                    'src="{{nodeContent.content}}" ng-click="selected()"/>';
                var imageElement = angular.element(htmlElement);
                var compiledElement = $compile(imageElement);
                element.html(imageElement);
                compiledElement(scope);
            }
        }
    }

})();
