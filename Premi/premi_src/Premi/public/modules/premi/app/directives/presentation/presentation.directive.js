/**
 * @class premiPresentation
 * @classdesc Rappresenta il componente grafico che genera la presentazione.
 * @author: Giacomo Manzoli (giacomo.manzoli@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFO7, RFO7.2, RFO7.3, RFD7.6,
 * RFD7.6.1, RFD7.6.2
 * @example <premi-presentation ng-click="closeMenus()"
 nodes="nodes"
 nodes-index="nodesIndex"
 path="currentPath"></premi-presentation>
 * @memberOf Front-End::Directives
 */
'use strict';
(function (){
    angular
        .module('premi.directives')
        .directive('premiPresentation', presentationDirective);


    presentationDirective.$inject = ['$compile','$window'];

    function presentationDirective($compile, $window){
        return {
            restrict : 'E',
            scope : {
                nodes:'=', //Array di nodi
                nodesIndex:'=', //{nodeId: index}
                path:'=' //Oggetto Path per il percorso e per il bound-check.
            },
            replace: true,
            templateUrl : 'app/directives/presentation/presentation.html',
            controller : 'PresentationController',
            link: link
        };
        /**
         * @name link
         * @desc Funzione che viene invocata da Angular durante la fase di
         * compilazione della pagina. Permette manipolare il DOM, aggiungendo
         * nuovi elementi o definendo un comportamento per l’elemento.
         * Viene utilizzata per integrare le funzionaltà di Impress con
         * Angular.
         * @param {Scope} scope - Parametro contenente un riferimento allo
         * \texttt{scope} della directive.
         * @param {DOMElement} elem - Parametro contenente un oggetto della
         * libreria \textit{jQuery} che rappresenta l'elemento del DOM
         * associato alla directive.
         * @memberOf Front-End::Directives.premiPresentation
         */
        function link(scope,elem){
            //---- inizio funzioni helper di Impress
            var pfx = (function () {
                var style = document.createElement('dummy').style,
                    prefixes = 'Webkit Moz O ms Khtml'.split(' '),
                    memory = {};
                return function (prop) {
                    if (typeof memory[prop] === 'undefined') {
                        var ucProp = prop.charAt(0).toUpperCase() +
                                prop.substr(1),
                            props = (prop + ' ' + prefixes.join(ucProp + ' ') +
                            ucProp).split(' ');
                        memory[prop] = null;
                        for (var i in props) {
                            if (style[props[i]] !== undefined) {
                                memory[prop] = props[i];
                                break;
                            }
                        }
                    }
                    return memory[prop];
                };
            })();

            // `translate` builds a translate transform string for given data.
            var translate = function (t) {
                return ' translate3d(' + t.x + 'px,' +
                    t.y + 'px,' + t.z + 'px) ';
            };

            // `rotate` builds a rotate transform string for given data.
            // By default the rotations are in X Y Z order that can be reverted
            // by passing `true`
            // as second parameter.
            var rotate = function (r, revert) {  //c'è'
                var rX = ' rotateX(' + r.x + 'deg) ',
                    rY = ' rotateY(' + r.y + 'deg) ',
                    rZ = ' rotateZ(' + r.z + 'deg) ';

                return revert ? rZ + rY + rX : rX + rY + rZ;
            };

            // `scale` builds a scale transform string for given data.
            var scale = function (s) {
                return ' scale(' + s + ') ';
            };

            // `perspective` builds a perspective transform string for given
            // data.
            var perspective = function (p) {
                return ' perspective(' + p + 'px) ';
            };

            var toNumber = function (numeric, fallback) {
                return isNaN(numeric) ? (fallback || 0) : Number(numeric);
            };

            var prefixer = function (props) {
                var key, pkey, rules = {};
                for (key in props) {
                    if (props.hasOwnProperty(key)) {
                        pkey = pfx(key);
                        if (pkey !== null) {
                            rules[pkey] = props[key];
                        }
                    }
                }
                return rules;
            };
            // `computeWindowScale` counts the scale factor between window size
            // and size defined for the presentation in the config.
            var computeWindowScale = function (config) {
                /* Impress normalmente usa la dimensione della finestra
                 * noi usiamo la dimensione del elem che contiene Impress,
                 * seems legit*/
                /*
                 var hScale = window.innerHeight / config.height,
                 wScale = window.innerWidth / config.width,
                 scale = hScale > wScale ? wScale : hScale;
                 */
                //console.log(elem);
                //console.log('w '+elem.parent().width() + ' h '+
                // elem.parent().height());

                var hScale = elem.parent().height() / config.height,
                    wScale = elem.parent().width() / config.width,
                    scale = hScale > wScale ? wScale : hScale;

                if (config.maxScale && scale > config.maxScale) {
                    scale = config.maxScale;
                }

                if (config.minScale && scale < config.minScale) {
                    scale = config.minScale;
                }

                return scale;
            };

             var throttle = function (fn, delay) {
                 var timer = null;
                 return function () {
                     var context = this,
                         args = arguments;
                     clearTimeout(timer);
                     timer = setTimeout(function () {
                         fn.apply(context, args);
                     }, delay);
                 };
             };

            window.addEventListener('resize', throttle(function () {
                // force going to active step again, to trigger rescaling
                scope.impressGoToSlide(scope.currentStepIndex);
                setTimeout(function (){
                    scope.impressGoToSlide(scope.currentStepIndex);
                },1000);
            }));


            //Fine funzioni helper di impress


            //------ Inizio confugurazioni impress
            var defaults = {
                width: 1024,
                height: 768,
                maxScale: 1,
                minScale: 0,
                perspective: 1000,
                transitionDuration: 1000
            };

            var slides = [],
                data, step, currentState = {
                    scale: 1
                }, activeStep, target = {
                    rotate: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    translate: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    scale: 1
                },
                stepData = [];
            scope.currentStepIndex = 0;

            var duration = 1000,
                zoomin = false;

            var rootStyles = {
                position: 'absolute',
                transformOrigin: 'top left',
                transition: 'transform 100ms ease-out',
                transformStyle: 'preserve-3d'
            };

            var rootData = elem[0].dataset;
            var config = {
                width: toNumber(rootData.width, defaults.width),
                height: toNumber(rootData.height, defaults.height),
                maxScale: toNumber(rootData.maxScale, defaults.maxScale),
                minScale: toNumber(rootData.minScale, defaults.minScale),
                perspective:
                    toNumber(rootData.perspective, defaults.perspective),
                transitionDuration: toNumber(rootData.transitionDuration,
                    defaults.transitionDuration)
            };
            var rootCSS = prefixer(rootStyles);

            //Fine configurazioni Impress



            //Funzione di inizializzazione
            scope.initImpress = function () {
                console.log("impress initialized!");
                //Recupero i div contenenti le slide
                slides = $(elem).find('.step');

                document.documentElement.style.height = '100%';

                $(document.body).css({
                    overflow: 'hidden'
                });

                //Creo il div che andrà a contenere le slide (?forse?)
                scope.canvas = $compile('<div ng-style="canvasStyle()"">' +
                    '</div>')(scope, function (ele) {
                    scope.canvasStyle = function () {
                        ele.css(
                            prefixer({
//transform: rotate({x: 0,y: 0,z: 0},true) + translate(target.translate),
// versione StarWars
                                transform: rotate(target.rotate, true) +
                                translate(target.translate),// Versione classica
                                transitionDuration: duration + 'ms',
                                transitionDelay: '0ms',
                                pointerEvents: 'auto',
                                width:'100%',
                                height:'100%',
                                top: '0',
                                left: '0'
                            }));
                        ele.css(rootCSS);
                    };

                    scope.$on('impress-updateCanvas', scope.canvasStyle);
                });
                scope.canvas.append(elem.children('.step'));
                elem.prepend(scope.canvas);

                elem.css(rootCSS);
                elem.css(prefixer({
                    top: '50%',
                    left: '50%',
                    transform:
                    perspective(config.perspective / scope.windowScale) +
                    scale(scope.windowScale),
                    transition: 'all 0s ease-out'
                }));

                //Assegno alle varie slide una posizione
                console.log("slides --> " + slides);
                for (var i = 0; i < slides.length; i++) {
                    data = slides[i].dataset;
                    /* posizionamento delle slide utilizzando gli attributi
                    data-x,
                     data-y, data-z
                     step = {
                     translate: {
                     x: toNumber(data.x),
                     y: toNumber(data.y),
                     z: toNumber(data.z)
                     },
                     rotate: {
                     x: toNumber(data.rotateX),
                     y: toNumber(data.rotateY),
                     z: toNumber(data.rotateZ || data.rotate)
                     },
                     scale: toNumber(data.scale, 1),
                     el: slides[i]
                     };
                     */
                    //Posizionamento delle slide a cubo che ruota
                    step = {
                        translate: {
                            x: toNumber(0),
                            y: toNumber(0),
                            z: toNumber(0)
                        },
                        rotate: {
                            x: toNumber(0),
                            y: toNumber((90*i)),
                            z: toNumber(0)
                        },
                        scale: toNumber(data.scale, 1),
                        el: slides[i]
                    };
                    //Creo il cubo
                    var k = 512;
                    switch(i%4){
                        case 0: step.translate.z = k; break;
                        case 1: step.translate.x = k; break;
                        case 2: step.translate.z = -k; break;
                        case 3: step.translate.x = -k; break;
                    }
                    /**/
                    //Posizionamento delle slide a stack per viaggi fotonici
                    /*
                     step = {
                     translate: {
                     x: toNumber(0),
                     y: toNumber(0),
                     z: toNumber(-2000*i)
                     },
                     rotate: {
                     x: toNumber(0),
                     y: toNumber(0),
                     z: toNumber(0)
                     },
                     scale: toNumber(data.scale, 1),
                     el: slides[i]
                     };/**/
                    //Posizionamento delle slide in modo classico
                    /*step = {
                     translate: {
                     x: toNumber(1124*i),
                     y: toNumber(0),
                     z: toNumber(0)
                     },
                     rotate: {
                     x: toNumber(0),
                     y: toNumber(0),
                     z: toNumber(0)
                     },
                     scale: toNumber(data.scale, 1),
                     el: slides[i]
                     };*/
                    //Posizionamento alla StarWars
                    /*step = {
                     translate: {
                     x: toNumber(0),
                     y: toNumber(i*543), //verso il basso
                     z: toNumber(i*543)
                     },
                     rotate: {
                     x: toNumber(45),
                     y: toNumber(0),
                     z: toNumber(0)
                     },
                     scale: toNumber(data.scale, 1),
                     el: slides[i]
                     };
                     */

                    stepData.push(step);
                    $(slides[i]).css(prefixer({
                        position: 'absolute',
                        transform: 'translate(-50%,-50%)' +
                        translate(step.translate) +
                        rotate(step.rotate) +
                        scale(step.scale),
                        transformStyle: 'preserve-3d'
                    }));
                }

                scope.windowScale = computeWindowScale(config);
                //Vado alla prima parte della presentazione
                //impressGoToSlide(0);
                scope.impressGoToSlide(0);

                //aggiuno un listener per il keydown in modo da ricevere
                // l'evento dell'utente
                //che usa le frecce per spostarsi
                document.addEventListener('keydown', function (e) {
                    var keyCode = e.keyCode || e.which,
                        arrow = {
                            left: 37,
                            up: 38,
                            right: 39,
                            down: 40
                        };
                    switch (keyCode) {
                        case arrow.left:
                            //Passo allo step precedente
                            console.log('previousSlide');
                            scope.previousStep();
                            scope.$apply();
                            break;
                        case arrow.up:
                            //..
                            break;
                        case arrow.right:
                            //Passo allo step successivo
                            console.log('nextSlide');
                            scope.nextStep();
                            scope.$apply();
                            break;
                        case arrow.down:
                            //..
                            break;
                    }
                });
            };

            // --- ImpressGoToSlide
            scope.impressGoToSlide = function (index) {
                window.scrollTo(0, 0);
                if (typeof index === "undefined") {
                    //se l'index non è settato rimando sulla stessa slide
                    index = scope.currentStepIndex;
                } else {
                    scope.currentStepIndex = index;
                }
                console.log(stepData);

                $('.step').removeClass('active')
                    .removeClass('prevStep')
                    .removeClass('nextStep');
                //se c'è un elemento precedente gli metto la classe prevStep
                if (stepData[index-1] !== undefined){
                    $(stepData[index-1].el).addClass('prevStep');
                }
                //Imposto la classe attiva all'elemento corrente
                $(stepData[index].el).addClass('active');
                //Se c'è un elemento successivo imposto la classe nextStep
                if (stepData[index+1] !== undefined) {
                    $(stepData[index + 1].el).addClass('nextStep');
                }

                var id = stepData[index].el.id;
                console.log(index+' step:'+id);
                console.log(stepData);
                var step = stepData[index];

                //Se voglio tenere l'effetto cubo che ruota potrei dover
                //inventarmi qualche nuova transizione
                //Dato che questa è cumulativa, le slide devono essere tutte
                // sfasate di 90°.
                //Il problema si verifica con un numero di slide molto elevato
                // (>20000)
                target = {
                    rotate: {
                        x: -step.rotate.x,
                        y: -step.rotate.y,
                        z: -step.rotate.z
                    },
                    translate: {
                        x: -step.translate.x,
                        y: -step.translate.y,
                        z: -step.translate.z
                    },
                    scale: 1 / step.scale
                };

                zoomin = target.scale >= currentState.scale;
                currentState = target;
                scope.$emit('impress-updateCanvas');

                if (step === activeStep) {
                    scope.windowScale = computeWindowScale(config);
                }
                activeStep = step;

                var targetScale = target.scale * scope.windowScale;

                elem.css(prefixer({
                    transform: perspective(config.perspective / targetScale) +
                    scale(targetScale),
                    transitionDuration: duration + 'ms',
                    transitionDelay: '0ms'
                }));
            };

            angular.element($window).on('resize', function (){
                scope.windowScale = computeWindowScale(config);
            });
        }
    }

})();
