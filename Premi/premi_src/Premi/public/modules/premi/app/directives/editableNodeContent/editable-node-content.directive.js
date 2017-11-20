/**
 * @class premiEditableNodeContent
 * @classdesc Rappresenta un elemento contenuto nel frame di un nodo. Questo
 * elemento è spostabile e ridimensionabile.
 * Le modifiche effettuate su questo elemento vengono riportate direttamente sull’oggetto nodeContent.
 * Questo componente deve essere in grado di rappresentare le varie tipologie di contenuto che possono essere presenti
 * all’interno di un nodo. La discriminazione del tipo del contenuto deve essere fatta in base ai campi dati
 * dell’oggetto nodeContent.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFD4.2.3.9, RFD4.2.3.10,
 * RFF4.2.3.11, RFD4.2.3.18, RFD4.2.3.19, RFD4.2.3.20
 * @example <div premi-mindmap-editable-node-content
 node-content="nodeContent"
 container="object">
 </div>
 * @memberOf Front-End::Directives
 */
(function (){
    'use strict';
    angular
        .module('premi.directives')
        .directive('premiEditableNodeContent',editableNodeContentDirective);


    editableNodeContentDirective.$inject = ['$document', '$compile', '$window'];

    function editableNodeContentDirective($document,$compile,$window){
        return{
            restrict:'EA',
            scope: {
                nodeContent:'=',
                container: '='
            },
            controller: 'EditableNodeContentController',
            link: link
        };

        /**
         * @function link
         * @instance
         * @desc Funzione che viene invocata da Angular durante la fase di
         * compilazione della pagina. Permette manipolare il DOM, aggiungendo
         * nuovi elementi o definendo un comportamento per l’elemento. Viene
         * utilizzata per registrare i vari gestori degli eventi del mouse in
         * modo da poter effettuare il \textit{drag'n'drop} e vengono aggiunti
         * ulteriori elementi al DOM per poter effettuare il ridimensionamento
         * dell'elemento.
         * @param {Scope} scope - Parametro che contiene un riferimento
         * all'oggetto <tt>scope</tt> della directive.
         * @param {DOMElement} elem - Parametro contenente un oggetto della
         * libreria jQuery che rappresenta l'oggetto del DOM sul quale è
         * definita la directive.
         * @memberOf Front-End::Directives.premiEditableNodeContent
         */
        function link(scope, elem){
            //console.log(scope.container);
            //Riferimento al nodeContent, utilizzato per semplicità.
            var nodeContent = scope.nodeContent;

            /* Gestione del resize delle pagina, viene utilizzata una funzione
             * per regolare lo scaling del font.
             */
            function resizeFont() {
                var width =  elem.parent().width();
                elem[0].style.fontSize = width * 0.2 +'%';
            }
            resizeFont();
            angular.element($window).on('resize', resizeFont);

            //Creazione dell'elemento che conterrà i dati
            var htmlElement = '<div class="content draggable-content ' +
                '{{ nodeContent.getType() }}" ' +
                'ng-click="selected($event)"> ' +
                '{{ nodeContent.content }}' +
                '</div>';
            if (nodeContent.getType() === 'imgUrl'){
                htmlElement = '<img class="content draggable-content ' +
                    '{{ nodeContent.getType() }}" ' +
                'src="{{nodeContent.content}}" ng-click="selected($event)"/>';
            }
            var element = angular.element(htmlElement);
            var compiledElement = $compile(element);
            elem.append(element);
            compiledElement(scope);


            /*-- PARTE DEDICATA ALLA GESTIONE DEL DRAG'N'DROP DELL'ELEMENTO --*/

            //Coodrinate finali (nella posizione dello schermo)
            var startX, startY;

            /* Funzione che si occupa di gestire l'evento 'mousedown',
             * viene impostato tutto il necessario per
             * una corretta gestione del drag'n'drop */
            element.on('mousedown', function (mouseEvent) {
                mouseEvent.preventDefault();
                startX = mouseEvent.clientX - elem.position().left;
                startY = mouseEvent.clientY - elem.position().top;
                $document.on('mousemove', dndMousemove);
                $document.on('mouseup', dndMouseup);
            });
            /* Funzione che si occupa di gestire il drag
             * (mousedown + mousemove).
             * Viene calcolata la nuova posizione dell'elemento, vengono
             * aggioranti i campi dati di nodeContent e viene effettuato il
              * riposizionamento grafico.
             * mouseEvent - Oggetto contenente le informazioni relative alla
             * posizione del mouse.
             * */
            function dndMousemove(mouseEvent) {
                /* startX e startY rappresentano il punto dove è iniziato il dnd
                 * Vengono valorizzate quando si verifica l'evento 'mousedown */
                var x = mouseEvent.clientX - startX;
                var y = mouseEvent.clientY - startY;
                //Dimensioni dell'elemento che si sposta
                var width  = elem.width(),
                    height = elem.height();
                if (scope.container) {
                    if (x < 0) {
                        x = 0;
                    } else if (x > scope.container.width - width) {
                        x = scope.container.width- width;
                    }
                    if (y < 0) {
                        y = 0;
                    } else if (y > scope.container.height - height) {
                        y = scope.container.height - height;
                    }
                }
                /* (x,y) è dove deve essere possizionato l'angolo in alto a
                 * sinistra dell'elemento. Viene fatta una proporzione per
                  * ottenere la posizione espressa in percentuale %*/
                var xPerc = 100*x/scope.container.width;
                var yPerc = 100*y/scope.container.height;
                nodeContent.setY(yPerc);
                nodeContent.setX(xPerc);

                //Aggiorno la posizione grafica
                elem.css(nodeContent.getStyle());
            }

            /* Funzione che gestisce la conclusione del drag'n'drop, si
             * occupa di rimuovere i listner precedentemente
             * definiti.*/
            function dndMouseup() {
                $document.off('mousemove', dndMousemove);
                $document.off('mouseup', dndMouseup);
            }

            /*-- PARTE DEDICATA ALLA GESTIONE DEL RESIZE DELL'ELEMENTO --*/
            // $event è di tipo MouseEvent, movementX e movementY è lo
            // spostamento fatto dal mouse

            /* Funzione che si occupa di gestire l'evento di resize verso
             l'alto.
             * Si occupa di modificare l'altezza e la posizione dell'elemento.
             * $event - Oggetto contenente le informazioni relative al movimento
              * del mouse*/
            var resizeUp = function (movement) {
                /* È necessario fare questo controllo perché, se l'elemento non
                 * è mai stato ridimentsionato ha dimensione 0
                 * e non è possibile calcolare la dimensione a mano.
                 * Viene quindi usata l'altezza calcolata dal browser,
                 * opportunamente convertita in percentuale.
                 * */
                if (nodeContent.getHeight() === 0){
                    nodeContent.setHeight(
                        elem.height()*100/scope.container.height);
                }
                /* Trasformo lo spostamento da 'px' a '%'*/

                var ratioY = 100*(movement.y)/scope.container.height;
                nodeContent.setHeight(nodeContent.getHeight() - ratioY);
                nodeContent.setY(nodeContent.getY() + ratioY);

                if (nodeContent.getY() < 0) {
                    nodeContent.setY(0);
                    nodeContent.setHeight(nodeContent.getHeight()+ratioY);
                }
                if (nodeContent.getHeight()<1){
                    nodeContent.setHeight(1);
                    /* Dato che il ridimensionamento viene annulalto evito di
                     * spostare l'elemento*/
                    nodeContent.setY(nodeContent.getY() - ratioY);
                }
                /* Controllo se l'elemento, dopo essere stato ridimensionato, è
                * ancora all'interno del contenitore.
                * Nel caso esca dal contenitore, viene opportunamente modificato
                * per fare in modo che rimanga all'interno dei margini
                * previsti */
                scope.container.adjustToBound(nodeContent);
                /* Aggiorno i CSS dell'elemento*/
                elem.css(nodeContent.getStyle());
            };

            /* Funzione che si occupa di gestire l'evento di resize verso il
            * basso.Si occupa di modificare l'altezza dell'elemento.*/
            var resizeDown = function (movement) {
                //var movement = calculateMouseMovement($event);

                /* È necessario fare questo controllo perché, se l'elemento non
                 * è mai stato ridimentsionato ha dimensione 0
                 * e non è possibile calcolare la dimensione a mano.
                 * Viene quindi usata l'altezza calcolata dal browser,
                 * opportunamente convertita in percentuale.
                 * */
                if (nodeContent.getHeight() === 0){
                    nodeContent.setHeight(elem.height()*100/scope.container.height);
                }
                /* Trasformo lo spostamento da 'px' a '%'*/
                var ratioY = 100*movement.y/scope.container.height;

                nodeContent.setHeight(nodeContent.getHeight() + ratioY);

                if (nodeContent.getHeight()<1) {
                    nodeContent.setHeight(1);
                }
                /* Controllo se l'elemento, dopo essere stato ridimensionato, è
                 * ancora all'interno del contenitore.
                 * Nel caso esca dal contenitore, viene opportunamente
                 * modificato per fare in modo che rimanga
                 * all'interno dei margini previsti */
                scope.container.adjustToBound(nodeContent);
                /* Aggiorno i CSS dell'elemento*/
                elem.css(nodeContent.getStyle());
            };

            /* Funzione che si occupa di gestire l'evento di resize verso
             * sinistra.
             * Si occupa di modificare la larghezza e la posizione
             * dell'elemento.*/
            function resizeLeft (movement) {
                /* È necessario fare questo controllo perché, se l'elemento non
                 * è mai stato ridimentsionato ha dimensione 0
                 * e non è possibile calcolare la dimensione a mano.
                 * Viene quindi usata l'altezza calcolata dal browser,
                 * opportunamente convertita in percentuale.
                 * */
                if (nodeContent.getWidth() === 0){
                    nodeContent.setWidth(
                        elem.width()*100/scope.container.width);
                }
                /* Trasformo lo spostamento da 'px' a '%'*/
                var ratioX = 100*movement.x/scope.container.width;
                nodeContent.setWidth(nodeContent.getWidth() - ratioX);
                nodeContent.setX(nodeContent.getX() + ratioX);

                if (nodeContent.getX() < 0) {
                    nodeContent.setX(0);
                    nodeContent.setWidth(nodeContent.getWidth()+ratioX);
                }
                if (nodeContent.getWidth()<1) {
                    nodeContent.setWidth(1);
                    /*Dato che il ridimensionamento viene annulalto evito di
                    spostare l'elemento*/
                    nodeContent.setX(nodeContent.getX() - ratioX);
                }
                /* Controllo se l'elemento, dopo essere stato ridimensionato, è
                 * ancora all'interno del contenitore.
                 * Nel caso esca dal contenitore, viene opportunamente
                 * modificato per fare in modo che rimanga
                 * all'interno dei margini previsti */
                scope.container.adjustToBound(nodeContent);
                /* Aggiorno i CSS dell'elemento*/
                elem.css(nodeContent.getStyle());
            }
            /* Funzione che si occupa di gestire l'evento di resize verso
             * destra.
             * Si occupa di modificare l'altezza dell'elemento.
             * $event - Oggetto contenente le informazioni relative al movimento
             * del mouse*/
            var resizeRight = function (movement) {
                /* È necessario fare questo controllo perché, se l'elemento non
                 * è mai stato ridimentsionato ha dimensione 0
                 * e non è possibile calcolare la dimensione a mano.
                 * Viene quindi usata l'altezza calcolata dal browser,
                 * opportunamente convertita in percentuale.
                 * */
                if (nodeContent.getWidth() === 0){
                    nodeContent.setWidth(
                        elem.width()*100/scope.container.width);
                }
                /* Trasformo lo spostamento da 'px' a '%'*/
                var ratioX = 100*movement.x/scope.container.width;
                nodeContent.setWidth(nodeContent.getWidth() + ratioX);

                if (nodeContent.getWidth()<1) {
                    nodeContent.setWidth(1);
                }
                /* Controllo se l'elemento, dopo essere stato ridimensionato, è
                 * ancora all'interno del contenitore.
                 * Nel caso esca dal contenitore, viene opportunamente
                 * modificato per fare in modo che rimanga
                 * all'interno dei margini previsti */
                scope.container.adjustToBound(nodeContent);
                /* Aggiorno i CSS dell'elemento*/
                elem.css(nodeContent.getStyle());
            };


            function calculateMouseMovement($event){
                var movement = {};

                movement.y = $event.originalEvent.clientY -
                    previousMouseEvent.originalEvent.clientY;
                movement.x = $event.originalEvent.clientX -
                    previousMouseEvent.originalEvent.clientX;
                previousMouseEvent = $event;

                return movement;
            }

            /* Funzione che si occupa di creare un div che permette di
             * effettuare il resize dell'elemento
             * className - Nome della classe CSS da dare all'elemento
             * handlers - Array di funzioni che si occupano di gestire
             * l'evento di resize*/

            var previousMouseEvent = null;

            var createResizer = function ( className , handlers ){
                //Viene creato l'elemento da inserire nel DOM
                var resizePointHtml = '<div class="' + className +
                    ' resize-color" ng-show="isSelected"></div>';
                var resizePointElement = angular.element(resizePointHtml);
                elem.append(resizePointElement);
                var resizePointCompiled = $compile(resizePointElement);
                resizePointCompiled(scope);

                /* Event handler per 'mousedown'. Inizia il resize dell'elemento
                 * principale.
                 * $event - Oggetto di Angular contenente le informazioni
                 * riguardanti l'evento */
                resizePointElement.on('mousedown', function ($event) {
                    $event.preventDefault();
                    previousMouseEvent = $event;

                    $document.on('mousemove', resizeMousemove);
                    $document.on('mouseup', resizeMouseup);

                    /* Funzione che si occupa di invocare gli opportuni handler
                     * quando l'utente effettua un drag (mousedown + mousemove)
                     * $event - Oggetto di Angular contenente le informazioni
                     * riguardanti l'evento*/
                    function resizeMousemove($event) {
                        $event.preventDefault();
                        var movement = calculateMouseMovement($event);
                        //Chiama i vari handler per il resize
                        for( var i = 0 ; i < handlers.length ; i++){
                            handlers[i](movement );
                        }
                    }
                    /* Funzione che si occupa di rimuovere i vari listener
                     * quando l'utente termina il drag'n'drop */
                    function resizeMouseup() {
                        $document.off('mousemove', resizeMousemove);
                        $document.off('mouseup', resizeMouseup);
                    }
                });
            };

            //Creazione dei vari resizer
            createResizer( 'sw-resize' , [ resizeDown , resizeLeft ] );
            createResizer( 'ne-resize' , [ resizeUp   , resizeRight ] );
            createResizer( 'nw-resize' , [ resizeUp   , resizeLeft ] );
            createResizer( 'se-resize' , [ resizeDown ,  resizeRight ] );
            createResizer( 'w-resize' , [ resizeLeft ] );
            createResizer( 'e-resize' , [ resizeRight ] );
            createResizer( 'n-resize' , [ resizeUp ] );
            createResizer( 's-resize' , [ resizeDown ] );
        }//fine link
    }
})();
