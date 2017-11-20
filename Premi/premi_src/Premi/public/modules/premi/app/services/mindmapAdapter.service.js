/**
 * @class MindmapAdapterService
 * @classdesc Questa classe si occupa di incapsulare le funzionalità offerte
 * dalla libreria Cytoscape.js.
 * Permette di rappresentare graficamente una mappa mentale e di accedere
 * agevolmente ai dati in essa contenuti.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-13 Requisiti:RFO1, RFO1.2, RFO4, RFO4.2, RFO4.2.1,
 * RFO4.2.2, RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.5.2,
 * RFO4.2.3.5.1, RFO4.2.3.7, RFO4.2.5, RFO4.2.6, RFO4.2.7, RFO5, RFD6, RFD22,
 * RFO4.2.8, RFD4.2.3.15, RFD4.2.3.16,
 * RFD4.2.3.18, RFD4.2.3.19, RFD4.2.3.20, RFO7.7
 * @memberOf Front-End::Services
 */
(function (){
    'use strict';
    angular
        .module('premi.services')
        .factory('mindmapAdapterService', mindmapAdapterService);

    mindmapAdapterService.$inject = ['$q'];

    function mindmapAdapterService($q) {

        var cy = null;
        var mapNodes = [];
        var mapEdges = [];
        var layout = {
            name: 'breadthfirst'
        };
        var listeners = {};

        return {
            listen:listen,
            stopListen:stopListen,
            zoom: zoom,
            fit: fit,
            loadMap: loadMap,
            addAssociation: addAssociation,
            deleteAssociation: deleteAssociation,
            getAssociableNodeList: getAssociableNodeList,
            addNode: addNode,
            getNode: getNode,
            setNode: setNode,
            drawMap: drawMap
        };
        // ----- Funzioni private -----
        /* Solleva l'evento e invocando i vari gestiori con parametri args*/
        /**
         * @function fire
         * @instance
         * @desc Metodo che notifica agli <i>observer</i> dell'evento <tt>e</tt>
         * con i parametri presenti nell'oggetto <tt>args</tt>.
         * @param {String} e - Parametro che rappresenta il nome dell'evento
         * che si è verificato.
         * @param {Array} args - Parametro contenente le informazioni
         * associate all'evento.
         * @returns {void}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function fire(e, args){
            for(var i = 0; listeners[e] && i < listeners[e].length; i++){
                var fn = listeners[e][i];
                fn.apply(fn, args);
            }
        }
        // ----- Funzioni pubbliche -----
        /**
         * @function listen
         * @instance
         * @desc Metodo che permette di registrare una funzione come callback
         * da invocare quando si verifica l'evento <tt>eventName</tt>. Per
         * registrare le callback viene utilizzato l'omonimo metodo di
         * <tt>MindmapAdapterService</tt>. Gli eventi disponibili e i relativi
         * parametri con cui viene invocata la funzione di callback sono
         * escritti nell'appendice \ref{cytoApp}.
         * @param {String} eventName - Parametro che rappresenta il nome
         * dell'evento per il quale si vuole registrare la funzione di callback.
         * @param {Function} callback - Parametro che rappresenta la funzione di
         * callback da associare all'evento.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function listen(eventName, callback){
            if (listeners[eventName] === null ||
                listeners[eventName] === undefined
                ){
                listeners[eventName] = [];
            }
            listeners[eventName].push(callback);
        }
        /**
         * @function stopListen
         * @instance
         * @desc Metodo che permette di rimuovere una callback precendetemente
         * registrata come gestore dell'evento <tt>eventName</tt>. Viene
         * ritornato un valore <tt>Boolean</tt> che specifica se l'operazione
         * è avvenuta con successo o meno.
         * @param {Function} callback - Parametro che rappresenta la callback
         * da rimuovere.
         * @param {String} eventName - Parametro che rappresenta il nome
         * dell'evento che si vuole smettere di ascoltare.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function stopListen(eventName,callback){
            if (listeners[eventName] !== null){
                listeners[eventName] = listeners[eventName].filter(
                    function (item) {
                        if (item !== callback) {
                            return item;
                        }
                    }
                );
            }
        }
        /**
         * @function zoom
         * @instance
         * @desc Metodo che effettua lo zoom sulla mappa mentale.
         * @param {Number} increment - Parametro che rappresenta di quanto
         * incrementare (o decrementare, se il valore è negativo) lo zoom della
         * mappa mentale.
         * @returns {void}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function zoom(increment){
            cy.zoom({
                level: cy.zoom() + increment,
                renderedPosition: {x: 500, y: 250}
            });
            cy.resize();
        }
        /**
         * @function fit
         * @instance
         * @desc Metodo che adatta lo zoom della mappa mentale in modo che
         * venga visualizzata completamente.
         * @returns {void}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function fit(){
            cy.fit();
        }
        /**
         * @function loadMap
         * @instance
         * @desc Metodo che legge i dati presenti nei due array <tt>nodes</tt>
         * e <tt>edges</tt> e li trasforma nel formato di <tt>cytoscape</tt>.
         * Una volta trasformati questi dati vengono memorizzati nei due array
         * <tt>mapNodes</tt> e <tt>mapEdges</tt>.
         * @param {Array} nodes - Parametro che rappresenta la collezione di
         * nodi da caricare nella mappa mentale. Gli oggetti presenti
         * nell'array sono definiti con il <tt>JSON</tt> ricevuto dalle API
         * del back-end.
         * @param {Array} edges - Parametro che rappresenta la collezione
         * le relazioni tra nodi da caricare nella mappa mentale. Gli oggetti
         * presenti nell'array sono definiti con il <tt>JSON</tt> ricevuto
         * dalle API del back-end.
         * @param {String} rootId - Parametro che rappresenta l'<tt>id</tt>
         * del nodo radice della mappa mentale.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function loadMap(nodes, edges, rootId){
            mapNodes = [];
            mapEdges = [];
            for(var i = 0; i < nodes.length; i++){
                //costruisco il nodo
                var node  = new Node(nodes[i]._id,nodes[i].contents);
                var cyNode = {
                    group: 'nodes',
                    data: {
                        id: node.getId(),
                        title: node.getTitle(),
                        weight: 80,
                        contents: node.getContents()
                    }
                };
                //Se il nodo corrente è la root della mappa aggiungo
                // l'informazione
                if (rootId === node.getId()){
                    cyNode.data.root='true';
                }
                mapNodes.push(cyNode);
            }
            if(edges !== undefined){
                for(var j = 0; j < edges.length; j++){
                    mapEdges.push({
                        group: 'edges',
                        data: {
                            source: edges[j].source,
                            target: edges[j].destination,
                            associationId: edges[j]._id,
                            'class': edges[j].class
                        }
                    });
                }
            }
        }
        /**
         * @function addAssociation
         * @instance
         * @desc Metodo che aggiunge un'associazione tra il nodo identificato
         * da <tt>sourceNodeId</tt> e il nodo destinazione avente come
         * <tt>id</tt> <tt>destinationNodeId</tt>. Se l'operazione va a buon
         * fine restituisce <tt>true</tt>, altrimenti <tt>false</tt>.
         * @param {String} sourceNodeId - Parametro che rappresenta
         * l'<tt>id</tt> del nodo sorgente dell'associazione.
         * @param {String} destinationNodeId - Parametro che rappresenta
         * l'<tt>id</tt> del nodo destinazione dell'associazione.
         * @param {String} associationId - Parametro che rappresenta
         * l'<tt>id</tt> dell'associazione da inserire nella mappa mentale.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function addAssociation(sourceNodeId, destinationNodeId, associationId){
            var cyEdge = {
                group: "edges",
                data: {
                    source: sourceNodeId,
                    target: destinationNodeId,
                    associationId : associationId,
                    'class': "association"
                }
            };
            cy.add(cyEdge);
            mapEdges.push(cyEdge);
        }
        /**
         * @function deleteAssociation
         * @instance
         * @desc Metodo che rimuove l'associazione avente come <tt>id</tt>
         * il valore del parametro <tt>associationId</tt>. Se l'operazione va
         * a buon fine restituisce <tt>true</tt>, altrimenti <tt>false</tt>.
         * @param {String} associationId - Parametro che rappresenta
         * l'<tt>id</tt> dell'associazione da eliminare.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function deleteAssociation(associationId){
            //recupero lo spigolo
            var cyEdge =cy.edges("[associationId = '"+associationId+"']" +
                "[class='association']");
            if (cyEdge !== null){
                //Lo rimuovo dall'array degli spigoli
                var deleteIndex = -1;
                for (var i = 0; i < mapEdges.length;i++){
                    var e = mapEdges[i];
                    if (e.data.source===cyEdge.data('source') &&
                        e.data.target===cyEdge.data('target') &&
                        e.data.class===cyEdge.data('class')){
                        deleteIndex = i;
                        i =mapEdges.length+1; //esco dal ciclo
                    }
                }
                if (deleteIndex >= 0){
                    //Se l'ho trovato lo cancello prima dall'array e poi
                    // dalla mappa
                    mapEdges.splice(deleteIndex,1);
                    cyEdge.remove();
                    return true;
                }
            }
            return false;
        }
        /**
         * @function getAssociableNodeList
         * @instance
         * @desc Metodo che dato l'<tt>id</tt> di un nodo fornisce l'insieme
         * dei nodi che possono essere associati ad esso. Tra due nodi può
         * essere definita una sola associazione e, se tra un nodo e l'altro
         * è già presente una relazione gerarchica, non è possibile aggiungere
         * un'associazione. Le informazioni dei nodi sono memorizzate
         * all'interno dell'oggetto ritornato sotto forma di coppie
         * chiave/valore, usando come chiave l'<tt>id</tt> del nodo
         * associabile e come valore il titolo del nodo.
         * @param {String} nodeId - Parametro che rappresenta
         * l'<tt>id</tt> del nodo per il quale si vuole recuperare la lista
         * dei nodi associabili.
         * @returns {Object}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function getAssociableNodeList(nodeId){
            var list = {};
            mapNodes.forEach(function (item){
                list[item.data.id] = item.data.title;
            });
            delete list[nodeId];

            mapEdges.forEach(function (edge){
                if (edge.data.source === nodeId){
                    //tolgo l'altro nodo dalla lista
                    delete list[edge.data.target];
                }else if(edge.data.target === nodeId){
                    //tolgo l'altro nodo dalla lista
                    delete list[edge.data.source];
                }
            });
            return list;
        }
        /**
         * @function addNode
         * @instance
         * @desc Metodo aggiungere il nodo <tt>node</tt> all'interno
         * dell'oggetto <tt>$\_$cy</tt> e successivamente crea una relazione
         * gerarchica tra il nodo identificato da <tt>parentId</tt> e il nodo
         * appena aggiunto. Sia il nodo, sia la relazione vengono poi aggiunti
         * anche nelle due collezioni <tt>mapNodes</tt> e <tt>mapEdges</tt>.
         * Ritorna un <tt>Booleano</tt> che specifica se l'operazione è
         * andata a buon fine.
         * @param {String} parentId - Parametro che rappresenta l'id del
         * nodo padre della mappa mentale al quale aggiungere il nuovo nodo
         * figlio.
         * @param {Node} node - Parametro che rappresenta il nodo da
         * aggiungere alla mappa mentale.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function addNode(parentId, node){
            //Crea il JSON da inserire su cytoscape
            var cyNode = {
                group: "nodes",
                data: {
                    id: node.getId(),
                    title: node.getTitle(),
                    weight: 80,
                    contents: node.getContents()
                },
                position: {x: 250, y: 250}
            };
            var cyEdge = {
                group: 'edges',
                data: {
                    source: parentId,
                    target: node.getId(),
                    associationId: parentId + node.getId(),
                    'class':'hierarchical'
                }
            };
            //Aggiunge il JSON su cytoscape
            cy.add(cyNode);
            cy.add(cyEdge);
            //Aggiunge il JSON a mapNodes e mapEdges, in questo modo se viene
            // fatto il cambio di vista non vengono persi dati
            mapNodes.push(cyNode);
            mapEdges.push(cyEdge);
            cy.makeLayout({name: 'breadthfirst'}).run();
            cy.reset();
        }
        /**
         * @function getNode
         * @instance
         * @desc Metodo che crea un oggetto di tipo <tt>Node</tt> a partire i
         * dati memorizzati dentro <tt>$\_$cy</tt> con l'<tt>id</tt> uguale a
         * <tt>nodeId</tt>. Se <tt>nodeId</tt> non è associato a nessun nodo di
         * Cytoscape viene ritornato <tt>null</tt>.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt> del
         * nodo del quale si vuole restituire il contenuto.
         * @returns {Node}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function getNode(nodeId){
            var cyNode = cy.nodes('#'+nodeId);
            //Per recuperare i dati devo usare il metodo .data('attributo');
            var nodeContents = cyNode.data('contents');
            return new Node(nodeId, nodeContents);
        }
        /**
         * @function setNode
         * @instance
         * @desc Metodo che legge dall'oggetto <tt>node</tt> l'<tt>id</tt> e
         * va ad aggiornare i dati presenti nell'oggetto <tt>$\_$cy</tt>,
         * associati all'<tt>id</tt> del nodo, con quelli presenti in
         * <tt>node</tt>. Se l'operazione va a buon fine restituisce
         * <tt>true</tt>, altrimenti, se non è presente alcun nodo con
         * l'<tt>id</tt> uguale a quello del nodo ricevuto per parametro
         * restituisce <tt>false</tt>.
         * @param {Node} node - Parametro contente l'oggetto da aggiornare
         * all'interno di Cytoscape.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function setNode(node){
            //Le modifiche effettuate da questa riga hanno un side effect
            // sulla collezione mapData
            //Dato che dentro cytoscape viene memorizzato un riferimento
            // agli oggetti che sono su mapData
            cy.nodes('#'+node.getId())
                .data('contents',node.getContents())
                .data('title',node.getTitle());
        }
        /**
         * @function drawMap
         * @instance
         * @desc Metodo che si occupa di inizializzare l'oggetto
         * <tt>$\_$cy</tt> con i dati presenti nelle collezioni
         * <tt>mapNodes</tt> e <tt>mapEdges</tt>. Una volta inizializzato
         * l'oggetto <tt>$\_$cy</tt> la mappa mentale diventerà visibile
         * all'interno del \dpCyDiv presente nella view correntemente attiva.
         * Il metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto
         * o rifiutato. Nel caso la promessa venga rifiutata, verrà fornita
         * come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapAdapterService
         */
        function drawMap(){
            var deferred = $q.defer();
            cy = cytoscape({
                container: $('#cy')[0],
                style: cytoscape.stylesheet()
                    .selector('node')
                    .css({
                        'content': 'data(title)',
                        'height': 80,
                        'width': 'mapData(weight, 1, 200, 1, 200)',
                        'text-valign': 'center',
                        'color': '#000000',
                        'border-width': 0.5,
                        'border-color': '#000',
                        'border-opacity': '1',
                        'background-color': '#FFFFFF'
                    })
                    .selector('node[root]')
                    .css({
                        'height': 90,
                        'width' : 90,
                        'background-color': '#FFE082',
                        'background-opacity': '1',
                        'color': '#00000',
                        'border-width': 3,
                        'border-color': '#FFC107'
                    })
                    .selector('edge')
                    .css({
                        'line-color': '#616161',
                        'width' : 4,
                        'opacity': 1,
                        'target-arrow-color': '#616161',
                        'source-arrow-color': '#616161'
                    })
                    .selector('edge[class = "association"]')
                    .css({
                        'line-color':'#FF5722',
                        'line-style':'dotted',
                        'target-arrow-shape':'triangle',
                        'target-arrow-color':'#FF5722'
                    }),
                layout: layout,
                elements: mapNodes.concat(mapEdges),
                ready: function (){
                    deferred.resolve(this);
                    window.cy = cy;
                    cy.reset();
                    /* Solleva l'evento 'mouseup' su un nodo
                     * Conviene utilizzare mouseup e touchend piuttosto che
                     * 'tap' perché con quest'ultimo
                     * si verificano dei problemi*/
                    /* mouseup su un nodo, serve per selezionare un nodo*/
                    cy.on('tap','node', function (e){
                        var mouseEvent = e.originalEvent;
                        var node = e.cyTarget;
                        var nodeId = node.data().id;
                        fire('node-select', [mouseEvent, nodeId]);
                    });
                    /* mouseup su un edge, serve per selezionare uno spigolo*/
                    cy.on('tap','edge', function (e){
                        var mouseEvent = e.originalEvent;

                        var edge = e.cyTarget;

                        if (edge.data().class==='association'){
                            var edgeId = edge.data().associationId;
                            fire('association-select', [mouseEvent, edgeId]);
                        }
                    });
                    /* mouseup generico, se il tap avviene sullo sfondo deve
                    fatto un fire del deselezionamento*/
                    cy.on('tap', function (e){
                        var mouseEvent = e.originalEvent;
                        if (e.cyTarget === cy){
                            fire('node-deselect', [mouseEvent]);
                            fire('association-deselect', [mouseEvent]);
                        }
                    });
                }
            });
            return deferred.promise;
        }
    }
})();
