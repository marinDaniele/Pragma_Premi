/**
 * @class PresentationService
 * @desc Questa classe si occupa del recupero e della modifica delle
 * informazioni relative alle presentazioni del progetto corrente.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFO7, RFD7.1, RFO8, RFO9, RFD4.7,
 * RFD7.4.1, RFD7.4.2, RFD7.6.2, RFD16.4, RFO7.7
 * @memberOf Front-End::Services
 */
(function (){
    'use strict';
    angular
        .module('premi.services')
        .factory('presentationService', presentationService);

    presentationService.$inject = ['$http', '$q', 'SERVER_URL',
        'pathService', 'projectService'];

    function presentationService($http, $q, SERVER_URL, pathService,
                                 projectService){

        return {
            getNodes: getNodes,
            getPath: getPath
        };
        // ------ funzioni private
        /**
         * @function handleError
         * @instance
         * @desc Metodo di utilità che si occupa di gestire il fallimento di
         * una chiamata HTTP verso il server.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta da una richiesta HTTP effettuata utilizzando
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.PresentationService
         */
        function handleError(response){
            // L'API response dal server deve essere ritornato in un formato
            // normalizzato.
            // Tuttavia, se la richiesta non è stata gestita dal server
            // (esempio a causa di un errore server), allora è necessario
            // effettuare una normalizzazione a questo livello.
            if (response.data === null){
                //Server offline
                return $q.reject(new ErrorInfo('Impossibile contattare ' +
                    'il server', 'Ci sono dei problemi di comnicazione con ' +
                    'il server' +
                'questo può essere dovuto ad un problema della connessione ' +
                    'ad ' +
                    'internet oppure ad un problema del nostro' +
                ' server', 0));
            }
            //altrimenti si usa il messaggio d'errore ricevuto dal server
            return $q.reject(new ErrorInfo(response.data.title,
                                            response.data.message,
                                            response.data.code));
        }
        /**
         * @function buildNodes
         * @instance
         * @desc Metodo d'utilità che a partire da un percorso di presentazione
         * organizza i nodi della mappa mentale, in modo che sia possibile
         * generare facilmente una presentazione.
         * @param {Path} path - Parametro che rappresenta il percorso secondo
         * il quale deve essere costruita la presentazione.
         * @returns {Promise}
         * @memberOf Front-End::Services.PresentationService
         */
        function buildNodes(path){
            var projectId = projectService.getId();
            return $http.get(SERVER_URL+'/projects/'+projectId+'/presentations')
                .then(function (response){
                    var result = {};
                    var nodeArray = response.data.frames;
                    for (var i = 0;i < nodeArray.length;i++){
                        var parent = new NodeReference(
                            nodeArray[i].family.parent.id,
                            nodeArray[i].family.parent.title);
                        var children = [];
                        var associated = [];

                        nodeArray[i].family.children.forEach(function (node){
                            children.push(new NodeReference(node.id,
                                node.title));
                        });
                        nodeArray[i].associations.forEach(function (node){
                            associated.push(new NodeReference(node.id,
                                node.title));
                        });
                        var presentationNode = new PresentationNode(
                            nodeArray[i].node._id,
                            nodeArray[i].node.contents,
                            parent,
                            children,
                            associated);
                        result[presentationNode.getId()] = presentationNode;
                    }
                    return {path:path,nodes: result};
                },handleError);
        }
        //Funzioni pubbliche
        /**
         * @function getNodes
         * @instance
         * @desc Metodo che richiede al back-end un array tutti i nodi
         * presenti nella mappa mentale del progetto corrente e li ordina in
         * modo che i primi nodi dell'array siano quelli presenti nel percorso
         * <tt>pathId</tt>. Il metodo ritorna un oggetto <tt>Promise</tt> che
         * può venire risolto o rifiutato. Nel caso la promessa venga risolta,
         * verrà fornito come risultato un <tt>Array</tt> di
         * <tt>PresentationNode</tt> da utilizzare per generare la
         * presentazione. Se invece la promessa viene rifiutata, sarà fornita
         * come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt>
         * del percorso da presentare.
         * @returns {Promise}
         * @memberOf Front-End::Services.PresentationService
         */
        function getNodes(pathId){
            /*
            * 1) prendi il percorso
            * 2) builda i nodi e organizza in un array associativo
            * 3) per ogni elemento del percorso
            *       - trova il nodo tra nodeSrc
            *       - aggiungi il nodo in coda ai risulatit
            *       - aggiorna tabella indici
            *       - togli il nodo da nodeSrc
            * 4) per ogni nodo rimasto in nodeSrc
            *       - aggiungilo in coda al risultato
            *       - aggiorna tabella inidici*/
            return pathService.getPath(pathId)
                .then(buildNodes)
                .then(function (data){
                    //data.path = oggetto percorso da presentare
                    //data.nodes = array associativo con i nodi da presentare
                    var nodeIndex = {};
                    var nodeArray = [];
                    data.path.getSteps().forEach(function (step){
                        //aggiungo il nodo all'array
                        nodeArray.push(data.nodes[step.getId()]);
                        /*Tengo le posizioni dei nodi in un array i*/
                        if (!nodeIndex.hasOwnProperty(step.getId())) {
                            nodeIndex[step.getId()] = [];
                        }
                        nodeIndex[step.getId()].push(nodeArray.length - 1);
                        //rimuovo il nodo dall'array associativo
                        //delete data.nodes[step.getId()]; non posso fare il
                        // delete dall'array associativo perché
                        //altrimenti se compare più volte ho dei problemi.
                    });
                    //teoricamente data.nodes contiene solo i nodi che non sono
                    // nel percorso
                    for (var nodeId in data.nodes){
                        /*
                        * Se il nodeId corrente è presente nell'array
                        * associativo e il nodo identificato da nodeId non è
                        * stato indicizzato, aggiungno il nodo in coda
                        * all'array.
                        * Serve per evitare problemi con i nodi duplicati.
                        * */
                        if (data.nodes.hasOwnProperty(nodeId) &&
                                nodeIndex[nodeId] === undefined){
                            nodeArray.push(data.nodes[nodeId]);
                            //viene messo dentro un'array per conformità con il
                            // resto dell'oggetto nodeIndex
                            nodeIndex[nodeId] = [nodeArray.length - 1];
                        }
                    }
                    return {nodes: nodeArray, index: nodeIndex};
                    //la prossima promessa in catena viene invocata con
                    // questo oggetto
                });
        }
        /**
         * @function getPath
         * @instance
         * @desc Metodo che richiede al back-end il percorso di presentazione
         * avente come <tt>id</tt> il valore presente nel parametro
         * <tt>pathId</tt> appartenente al progetto corrente. Il metodo
         * ritorna un oggetto <tt>Promise</tt> che può venire risolto o
         * rifiutato. Nel caso la promessa venga risolta, verrà fornito come
         * risultato un oggetto <tt>Path</tt> contenente i dati del percorso.
         * Se invece la promessa viene rifiutata, sarà fornita come ragione un
         * oggetto <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt> del
         * percorso di presentazione da ottenere.
         * @returns {Promise}
         * @memberOf Front-End::Services.PresentationService
         */
        function getPath(pathId){
            return pathService.getPath(pathId);
        }
    }
})();
