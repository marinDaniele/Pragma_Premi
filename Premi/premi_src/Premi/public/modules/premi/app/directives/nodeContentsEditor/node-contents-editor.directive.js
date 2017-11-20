/**
 * @class premiNodeContentsEditor
 * @classdesc Rappresenta il componente grafico che permette all’utente di
 * modificare il contenuto di un nodo.
 * Questo componente fornisce all’utente sia dei campi per inserire/modificare
 * il contenuto del nodo, sia un’anteprima di come questo verrà visualizzato.
 * Dall’anteprima sarà anche possibile spostare e ridimensionare i vari
 * componenti. Saranno presenti inoltre due pulsanti, uno per confermare le
 * modifiche e l’altro per annullarle e ripristinare
 * lo stato del nodo.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5,
 * RFO4.2.3.5.2, RFO4.2.3.5.1, RFO4.2.3.7, RFO4.2.3.12, RFO4.2.3.13,
 * RFD4.2.3.15, RFD4.2.3.16
 * @example <premi-mindmap-node-contents-editor node='currentNode'
 on-reset='resetNodeEdit()'
 on-confirm='doSomething()'>
 </premi-mindmap-node-contents-editor>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';

    angular
        .module('premi.directives')
        .directive('premiNodeContentsEditor',nodeContentsEditorDirective);

    nodeContentsEditorDirective.$inject = ['$window'];

    function nodeContentsEditorDirective($window){
        return {
            restrict:'E',
            scope:{
                node:'=',
                onReset:'&',
                onConfirm:'&'
            },
            replace:true,
            controller: 'NodeContentsEditorController',
            link: link,
            templateUrl: 'app/directives/nodeContentsEditor/' +
            'nodeContentsEditor.html'
        };

        /**
         * @name link
         * @desc Funzione che viene invocata da Angular durante la fase di
         * compilazione della pagina. Permette manipolare il DOM, aggiungendo
         * nuovi elementi o definendo un comportamento per l’elemento.
         * Viene utilizzata per registrare un gestore per l'evento
         * <tt>resize</tt> del browser, in modo da poter scalare in modo
         * corretto i contenuti del nodo.
         * @param {Scope} scope - Parametro contenente un riferimento allo
         * <tt>scope</tt> della directive.
         * @param {DOMElement} element - Parametro contenente un oggetto della
         * libreria jQuery rappresentante l'elemento del DOM contenente la
         * directive.
         * @memberOf Front-End::Directives.premiNodeContentsEditor
         */
        function link(scope,element){
            /*N Oggetto jQuery rappresentante l'elemento che contiene i vari
             * oggetti drag'n'droppabili, rappresenta anche il frame del nodo
             * durente l'editing*/
            var dragContainer = element.find('#dragContainer');

            // Chiamate di funzioni per il drag n drop
            /* Aggiorno il contenitore degli oggetti drag'n'droppabili
            * registro anche la stessa funzione per essere eseguita con un
            * timeout di 100ms
            * in questo modo è più difficile che ci siano errori di calcolo
            * dovuti alle animazioni */
            updateElementContainer();
            setTimeout(function (){updateElementContainer();},100);
            
            // Chiamata alla funzione per lo scaling della slide
            resizeFrame();

            /* Registro una funzione come gestore dell'evento resize della
            finestra,
            * questa funzione invoca le due funzioni:
            * - updateElementCOntainer
            * - resizeFrame */
            angular.element($window).on('resize', function (){
                updateElementContainer();
                setTimeout(updateElementContainer,100);
                var size = {
                    'h': dragContainer.parent().height(),
                    'w': dragContainer.parent().width()
                };
                resizeFrame(size);
            });


            /* Funzione che aggiorna l'oggetto per il bound-check del
             * drag'n'drop/resieze dei contenuti del nodo */
            function updateElementContainer(){
                // Oggetto contenitore dei premiEditableNodeContents,
                // deve essere passato alle
                // directive premiEditableNodeContent
                // perché altrimenti non riescono a fare il bound check e a
                // scalare correttamente
                scope.elementsContainer = {
                    width: dragContainer.width(),
                    height: dragContainer.height(),
                    adjustToBound: function (nodeContent) {
                        /* I dati in nodeContent sono memorizzati in %
                         * li converto in pixel facendo la proporzione con la
                         * dimensione del contenitore*/
                        var realX = nodeContent.getX() * this.width / 100;
                        var realY = nodeContent.getY() * this.height / 100;
                        var realWidth = nodeContent.getWidth() *
                            this.width / 100;
                        var realHeight = nodeContent.getHeight() *
                            this.height / 100;
                        /* Calcolo l'overflow*/
                        var overflowX = realX + realWidth - this.width;
                        var overflowY = realY + realHeight - this.height;
                        /* Tolgo l'overflow */
                        if (overflowX > 0) {
                            realWidth -= overflowX;
                            nodeContent.setWidth(realWidth * 100 / this.width);
                        }
                        if (overflowY > 0) {
                            realHeight -= overflowY;
                            nodeContent.setHeight(
                                realHeight * 100 / this.height
                            );
                        }
                    }
                };

            }
            /* Funzione che viene invocata per calocare la dimensione della
             * slide dopo l'evento resize della pagina*/
            function resizeFrame(newValue) {
                var containerWidth;
                var presentationHeight;
                if (newValue !== undefined){
                    containerWidth = newValue.w;
                    presentationHeight = newValue.h;
                }
                else{
                    containerWidth = dragContainer.parent().width();
                    presentationHeight = dragContainer.parent().height();
                }
                //4:3 = presentationWidth:presentationHeight
                var presentationWidth = presentationHeight * 4 / 3;
                if (presentationWidth > containerWidth){
                    presentationWidth = containerWidth;
                    //4:3 = presentationWidth:presentationHeight
                    presentationHeight = presentationWidth * 3 / 4;
                }
                dragContainer[0].style.height = presentationHeight + "px";
                dragContainer[0].style.width = presentationWidth + "px";
            }

        }
    }
})();
