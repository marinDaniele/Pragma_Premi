/**
 * @class MindmapService
 * @classdesc Questa classe si occupa del recupero e della modifica delle
 * informazioni relative ai nodi e alle associazione presenti nella mappa
 * mentale del progetto corrente.
 * Utilizza $http per comunicare con il back-end e MindmapAdapterService per
 * memorizzare i dati in locale.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-13 Requisiti: RFO30, RFO30.2, RFO30.2.1,
 * RFO30.2.2, RFO30.2.3
 * @memberOf Front-End::Services
 */

(function (){
    'use strict';
    angular
        .module('premi.services')
        .factory('mindmapService', mindmapService);

    mindmapService.$inject =  ['$q','$http','mindmapAdapterService',
        'projectService','SERVER_URL'];

    function mindmapService($q,$http,mindmapAdapterService,
                            projectService,SERVER_URL){

        return {
            drawMap: drawMap, //chiamata dai controller per disegnare la mappa
            addNode: addNode,
            deleteNode: deleteNode,
            updateNode: updateNode,
            getNode: getNode,
            addAssociation: addAssociation,
            deleteAssociation: deleteAssociation,
            listen: listen,
            stopListen: stopListen,
            getAssociableNodeList: getAssociableNodeList
        };

        // -------- funzioni private
        /**
         * @function handleError
         * @instance
         * @instance
         * @desc Metodo di utilità che si occupa di gestire il fallimento di
         * una chiamata HTTP verso il server.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta ad una chiamata HTTP effettuata con
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function handleError(response){
            // L'API response dal server deve essere ritornato in un
            // formato normalizzato.
            // Tuttavia, se la richiesta non è stata gestita dal server
            // (esempio a causa di un errore server), allora è necessario
            // effettuare una normalizzazione a questo livello.
            if (response.data === null){
                //Server offline
                return $q.reject(new ErrorInfo('Impossibile contattare il ' +
                    'server', 'Ci sono dei problemi di comnicazione c' +
                    'on il server' +
                'questo può essere dovuto ad un problema della ' +
                    'connessione ad internet oppure ad un problema del nostro' +
                ' server', 0));
            }
            //altrimenti si usa il messaggio d'errore ricevuto dal server
            return $q.reject(new ErrorInfo(response.data.title,
                                           response.data.message,
                                           response.data.code));
        }

        // -------- funzioni pubbliche
        /**
         * @function getAssociableNodeList
         * @instance
         * @desc Metodo che dato l'<tt>id</tt> di un nodo fornisce l'insieme
         * dei nodi che possono essere associati ad esso. Tra due nodi può
         * essere definita una sola associazione e, se tra un nodo e l'altro è
         * già presente una relazione gerarchica, non è possibile aggiungere
         * un'associazione. Le informazioni dei nodi sono memorizzate
         * all'interno dell'oggetto ritornato sotto forma di coppie
         * chiave/valore, usando come chiave l'<tt>id</tt> del nodo
         * associabile e come valore il titolo del nodo.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt>
         * del nodo per il quale si vuole recuperare la lista dei nodi
         * associabili.
         * @returns {Object}
         * @memberOf Front-End::Services.MindmapService
         */
        function getAssociableNodeList(nodeId){
            return mindmapAdapterService.getAssociableNodeList(nodeId);
        }
        /**
         * @function addNode
         * @instance
         * @desc Metodo che aggiunge un nuovo nodo alla mappa mentale del
         * progetto corrente. Il nuovo nodo verrà aggiunto come figlio di del
         * nodo avente <tt>id</tt> pari al valore del parametro
         * <tt>parentId</tt>.
         * Il metodo come prima cosa richiede la creazione del nodo al
         * back-end, dopodiché utilizza
         * <tt>MindmapAdapterService</tt> per aggiungere il nodo in locale.
         * Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o rifiutato. Nel caso la
         * promessa venga risolta, verrà fornito come
         * risultato un oggetto di tipo <tt>Node</tt> contenente tutte le
         * informazioni del nuovo nodo. Se invece la
         * promessa viene rifiutata, sarà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} parentNodeId - Parametro che rappresenta l'id del
         * nodo padre a cui aggiungere il nuovo nodo
         * figlio.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function addNode(parentNodeId){
            var projectId = projectService.getId();
            return $http.post(SERVER_URL+'/projects/'+projectId+'/nodes/'+
                                parentNodeId)
                .then(
                function (response){
                    var node = new Node(response.data._id,
                                        response.data.contents);
                    return mindmapAdapterService.addNode(parentNodeId,node);
                }, handleError);
        }
        /**
         * @function deleteNode
         * @instance
         * @desc Metodo che che richiede al back-end l'eliminazione del nodo
         * avente l'<tt>id</tt> ricevuto come parametro dal progetto corrente.
         * Una volta ricevuta la risposta <tt>JSON</tt> dal back-end vengono
         * aggiornati i dati presenti di <tt>MindmapService</tt>. Il metodo
         * ritorna un oggetto <tt>Promise</tt> che può venire risolto o
         * rifiutato. Nel caso la promessa venga rifiutata, verrà fornita
         * come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} nodeId - Parametro che rappresenta l'id del nodo da
         * eliminare.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function deleteNode(nodeId){
            var projectId = projectService.getId();
            return $http.delete(SERVER_URL+'/projects/'+projectId+
                                '/nodes/'+nodeId)
                .then(function (response) {
                    return mindmapAdapterService.loadMap(response.data.nodes,
                        response.data.relations,
                        projectService.getCurrentProject().getRootId());
                }, handleError);
        }
        /**
         * @function updateNode
         * @instance
         * @desc Metodo che rende permanenti le modifiche subite dall'oggetto
         * <tt>node</tt> ricevuto come parametro utilizzando
         * <tt>MindmapAdapterService</tt> e inviando i dati al back-end con
         * <tt>$http</tt>. Il metodo ritorna un oggetto <tt>Promise</tt>
         * che può venire risolto o rifiutato. Nel caso la promessa venga
         * rifiutata, verrà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {Node} node - Parametro contenente l'oggetto nodo modificato
         * e da salvare sul back-end.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function updateNode(node){
            var projectId = projectService.getId();
            mindmapAdapterService.setNode(node);
            var jsonData={};
            jsonData.contents=[];
            node.getContents().forEach(
                function (item){
                    var nc = {
                        content:item.getContent().toString(),
                        x:item.getX().toString(),
                        y:item.getY().toString(),
                        height:item.getHeight().toString(),
                        width:item.getWidth().toString(),
                        'class':item.getType().toString()
                    };
                    jsonData.contents.push(nc);
                }
            );
            return $http.put(SERVER_URL+'/projects/' + projectId + '/nodes/' +
                             node.getId(), jsonData)
                .then(function (response){
                    return response.data;
                }, handleError);
        }
        /**
         * @function addAssociation
         * @instance
         * @desc Metodo che aggiunge un'associazione tra un nodo sorgente
         * avente come <tt>id</tt> il valore del
         * parametro <tt>sourceNodeId</tt> e un nodo destinazione avente come
         * <tt>id</tt> il valore del parametro
         * <tt>destinationNodeId</tt>. La creazione dell'associazione viene
         * effettuata sia in locale sia sul back-end,
         * utilizzando rispettivamente <tt>MindmapAdapterService</tt> e
         * <tt>$http</tt>. Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o rifiutato. Nel caso la
         * promessa venga rifiutata, verrà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} sourceNodeId - Parametro che rappresenta
         * l'<tt>id</tt> del nodo sorgente dell'associazione
         * da creare.
         * @param {String} destinationNodeId - Parametro che rappresenta
         * l'<tt>id</tt> del nodo destinazione
         * dell'associazione da creare.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function addAssociation(sourceNodeId, destinationNodeId){
            var projectId = projectService.getId();
            var requestData = {
                sourceId: sourceNodeId,
                destinationId: destinationNodeId
            };
            return $http.post(SERVER_URL+'/projects/'+projectId+
                              '/associations',requestData)
                .then(function (response){
                    mindmapAdapterService.addAssociation(sourceNodeId,
                        destinationNodeId, response.data._id);
                }, handleError);
        }
        /**
         * @function deleteAssociation
         * @instance
         * @desc Metodo che rimuove l'associazione avente come <tt>id</tt> il
         * valore del parametro <tt>associationId</tt>. La cancellazione
         * dell'associazione viene effettuata sia in locale sia sul back-end,
         * utilizzando rispettivamente <tt>MindmapAdapterService</tt> e
         * <tt>$http</tt>. Il metodo ritorna un oggetto <tt>Promise</tt>
         * che può venire risolto o rifiutato. Nel caso la promessa venga
         * rifiutata, verrà fornita come ragione un oggetto <tt>ErrorInfo</tt>
         * contenente tutte le informazioni relative all’errore che si è
         * verificato.
         * @param {String} associationId - Parametro che rappresenta
         * l'<tt>id</tt> dell'associazione da eliminare.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function deleteAssociation(associationId){
            var projectId = projectService.getId();
            if (mindmapAdapterService.deleteAssociation(associationId)) {
                return $http.delete(SERVER_URL+'/projects/'+projectId+
                    '/associations/'+associationId)
                    .then(function (response){
                        return response.data;
                    }, handleError);
            } else {
                return $q.reject(new ErrorInfo('Errore','Non è stato ' +
                    'possibile aggiungere l\'associazione','data'));
            }
        }

        // Metodi che non usano $http
        /**
         * @function getNode
         * @instance
         * @desc Metodo che restituisce il nodo avente <tt>id</tt> pari al
         * valore del parametro <tt>nodeId</tt>. Se non è possibile creare il
         * nodo viene restituito <tt>null</tt>. Utilizza
         * <tt>MindmapService</tt> per richiedere la creazione dell'oggetto.
         * La chiamata di questo metodo comporta l'aggiornamento del campo
         * dati <tt>node</tt> della classe.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt>
         * del nodo da recuperare.
         * @returns {Node}
         * @memberOf Front-End::Services.MindmapService
         */
        function getNode(nodeId){
            return mindmapAdapterService.getNode(nodeId);
        }

        /**
         * @function drawMap
         * @instance
         * @desc Metodo che i controllers invocano per disegnare la mappa
         * mentale. Questo metodo si occupa di chiamare l'omonimo metodo
         * offerto da <tt>MindmapAdapterService</tt>. Il metodo ritorna un
         * oggetto <tt>Promise</tt> che può venire risolto o rifiutato. Nel
         * caso la promessa venga rifiutata, verrà fornita come ragione un
         * oggetto <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.MindmapService
         */
        function drawMap(){
            //disegna la mappa mentale
            return mindmapAdapterService.drawMap();
        }

        /**
         * @function listen
         * @instance
         * @desc Metodo permette di associare la funzione di callback ricevuta
         * come parametro, all'evento <tt>eventName</tt>. Per registrare le
         * callback viene utilizzato l'omonimo metodo di
         * <tt>MindmapAdapterService</tt>. Gli eventi disponibili e i relativi
         * parametri con cui viene invocata la funzione di callback sono
         * descritti nell'appendice \ref{cytoApp}.
         * @param {String} eventName - Parametro che rappresenta il nome
         * dell'evento per il quale si vuole registrare la funzione di callback.
         * @param {Function} callback - Parametro che rappresenta la
         * funzione di callback da associare all'evento.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapService
         */
        function listen(eventName, callback){
            //registra la callback per l'evento eventName con la chiave key
            mindmapAdapterService.listen(eventName,callback);
        }
        /**
         * @function stopListen
         * @instance
         * @desc Metodo che permette di rimuovere callback precendetemente
         * registrata come gestore dell'evento <tt>eventName</tt>. Per
         * rimuovere la funzione è necessario fornire la <tt>key</tt> con la
         * quale è stata registrata. Viene ritornato un valore <tt>Boolean</tt>
         * che specifica se l'operazione è avvenuta con successo o meno.
         * @param {String} eventName - Parametro che rappresenta il nome
         * dell'evento che si vuole smettere di ascoltare.
         * @param {Function} callback - Parametro che rappresenta la callback
         * da rimuovere.
         * @returns {Boolean}
         * @memberOf Front-End::Services.MindmapService
         */
        function stopListen(eventName,callback){
            //rimuove la callback registrata per l'evento 'eventName'
            // associata alla chiave key.
            mindmapAdapterService.stopListen(eventName,callback);
        }
    }
})();
