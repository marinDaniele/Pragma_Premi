/**
 * @class PathService
 * @classdesc Questa classe si occupa del recupero e della modifica delle
 * informazioni relative ai percorsi
 * di presentazione relativi al progetto corrente.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-14 Requisiti: RFO4, RFD4.3, RFD4.3.1, RFD4.3.3,
 * RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.5, RFO5, RFD6, RFD23, RFD4.5.1, RFF25.1,
 * RFD4.7, RFD4.4.5
 * @memberOf Front-End::Services
 */

(function (){
    'use strict';
    angular
        .module('premi.services')
        .factory('pathService', pathService);

    pathService.$inject = ['$http', '$q', 'SERVER_URL','projectService'];

    function pathService($http, $q, SERVER_URL,projectService){

        return {
            addPath: addPath,
            deletePath: deletePath,
            finalizePathUpdates: finalizePathUpdates,
            getPath: getPath,
            getPathNames: getPathNames,
            addNodeToPath: addNodeToPath,
            removeNodeFromPath: removeNodeFromPath
        };
        // ----- Metodi privati di utilità -----
        // Gestione di una generica richiesta al server sfociata in un errore
        /**
         * @function handleError
         * @instance
         * @desc Metodo di utilità che si occupa di gestire il fallimento di
         * una chiamata HTTP verso il server.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta ad una chiamata HTTP effettuata con
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
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
                'questo può essere dovuto ad un problema della connessione ad' +
                    ' internet oppure ad un problema del nostro' +
                ' server', 0));
            }
            //altrimenti si usa il messaggio d'errore ricevuto dal server
            return $q.reject(new ErrorInfo(response.data.title,
                response.data.message,
                response.data.code));
        }
        // Gestione di una generica richiesta al server andata a buon fine
        /**
         * @function handleSuccess
         * @instance
         * @desc Metodo di utilità che si occupa di gestire il successo di
         * una chiamata HTTP verso il server e che non ritorna dati.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta ad una chiamata HTTP effettuata con
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function handleSuccess(response){
            return response.data;
        }
        /**
         * @function buildPath
         * @instance
         * @desc Metodo di utilità che costruisce un oggetto di tipo
         * <tt>Path</tt> a partire dai dati ricevuti come parametro.
         * @param {String} pathId - Parametro che rappresenta l'identificativo
         * del percorso da creare.
         * @param {Array} data - Parametro contenente un array di oggetti
         * definiti con il JSON ottenuto in risposta dall'API
         * <tt>/projects/:projectId/paths/:pathId</tt>.
         * @returns {Path}
         * @memberOf Front-End::Services.PathService
         */
        function buildPath(pathId,data){
            var isDefault = data.default;
            var name = data.name;
            var newPath = new Path(pathId,name,[],isDefault);
            data.nodes.forEach(function (nodeJson){
                var node = new Node(nodeJson._id, nodeJson.contents);
                newPath.addStep(node.getId(), node.getTitle());
            });
            return newPath;
        }
        // ----- Metodi pubblici -----
        /**
         * @function addNodeToPath
         * @instance
         * @desc Metodo che richiede al back-end di aggiungere in coda il
         * nodo identificato da <tt>nodeId</tt> al percorso <tt>pathId</tt>.
         * Il metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto
         * o rifiutato. Nel caso la promessa venga risolta, verrà fornito come
         * risultato un oggetto <tt>Path</tt> contenente le informazioni del
         * percorso aggiornate. Se invece la promessa viene rifiutata, sarà
         * fornita come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte
         * le informazioni relative all’errore che si è verificato.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt> del
         * nodo da aggiungere.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt> del
         * percorso a cui aggiungere il nodo.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function addNodeToPath(nodeId, pathId){
            var projectId = projectService.getId();
            return $http.post(SERVER_URL+'/projects/'+projectId+'/paths/'
                                +pathId+'/'+nodeId)
                .then(handleSuccess,handleError);
        }
        /**
         * @function removeNodeFromPath
         * @instance
         * @desc Metodo che richiede al back-end di rimuovere il nodo
         * identificato da <tt>nodeId</tt> dal percorso <tt>pathId</tt>.
         * Il metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto
         * o rifiutato. Nel caso la promessa venga risolta, verrà fornito come
         * risultato un oggetto <tt>Path</tt> contenente le informazioni del
         * percorso aggiornate. Se invece la promessa viene rifiutata, sarà
         * fornita come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte
         * le informazioni relative all’errore che si è verificato.
         * @param {String} nodeId - Parametro che rappresenta l'<tt>id</tt> del
         * nodo da rimuovere.
         * @param {String} pathId - Parametro che rappresenta l'<tt>id</tt> del
         * percorso a cui aggiungere il nodo.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function removeNodeFromPath(nodeId, pathId){
            var projectId = projectService.getId();
            return $http.delete(SERVER_URL+'/projects/'+projectId+
                '/paths/'+pathId+'/'+nodeId)
                .then(function (response){
                    return buildPath(pathId,response.data);
                },handleError);
        }
        /**
         * @function addPath
         * @instance
         * @desc Metodo che richiede al back-end la creazione di un nuovo
         * percorso di presentazione di nome <tt>name</tt> all'interno del
         * progetto corrente. Il metodo ritorna un oggetto <tt>Promise</tt>
         * che può venire risolto o rifiutato. Nel caso la promessa venga
         * risolta, verrà fornito come risultato un oggetto <tt>Path</tt>
         * creato con i dati ricevuti in risposta dal back-end. Se invece la
         * promessa viene rifiutata, sarà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} name - Parametro che rappresenta il nome del nuovo
         * percorso di presentazione da creare.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function addPath(name){
            var projectId = projectService.getId();
            return $http.post(SERVER_URL+'/projects/'+projectId+'/paths',
                            {'name':name})
                .then(
                    function (response) {
                        return new Path(response.data.id, name, [], false);
                    }, handleError);
        }
        /**
         * @function deletePath
         * @instance
         * @desc Metodo che richiede al server l'eliminazione del percorso di
         * presentazione avente <tt>id</tt> pari al valore del parametro
         * <tt>pathId</tt> dal progetto corrente. Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o rifiutato. Nel caso la
         * promessa venga rifiutata, verrà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} pathId - Parametro che rappresenta il nome del
         * percorso di presentazione da eliminare.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function deletePath(pathId){
            var projectId = projectService.getId();
            return $http.delete(SERVER_URL+'/projects/'+projectId+
                                '/paths/'+pathId)
                .then(handleSuccess, handleError);
        }
        /**
         * @function finalizePathUpdates
         * @instance
         * @desc Metodo che richiede al back-end il salvataggio delle modifiche
         * subite dall'oggetto <tt>path</tt> ricevuto come parametro. Il metodo
         * ritorna un oggetto <tt>Promise</tt> che può venire risolto o
         * rifiutato. Nel caso la promessa venga rifiutata, verrà fornita come
         * ragione un oggetto <tt>ErrorInfo</tt> contenente tutte
         * le informazioni relative all’errore che si è verificato.
         * @param {Path} path - Parametro che rappresenta l'oggetto modificato
         * da salvare nel back-end.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function finalizePathUpdates(path){
            var projectId = projectService.getId();
            return $http.put(SERVER_URL+'/projects/' + projectId +
                '/paths/' + path.getId(), {'name': path.getName()})
                    .then(handleSuccess, handleError);
        }
        /**
         * @function getPath
         * @instance
         * @desc Metodo che richiede al back-end i dati del percorso di
         * presentazione identificato da <tt>pathId</tt>. Il metodo ritorna un
         * oggetto <tt>Promise</tt> che può venire risolto o rifiutato.
         * Nel caso la promessa venga risolta, verrà fornito come risultato
         * un oggetto <tt>Path</tt> contenente le informazioni ricevute dal
         * back-end. Se invece la promessa viene rifiutata, sarà fornita come
         * ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} pathId - Parametro che rappresenta <tt>id</tt>
         * del percorso di presentazione da ottenere.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function getPath(pathId){
            var projectId = projectService.getId();
            return $http.get(SERVER_URL+'/projects/'+projectId+'/paths/'+pathId)
                .then(function (response){
                    return buildPath(pathId, response.data);
                },handleError);
        }
        /**
         * @function getPathNames
         * @instance
         * @desc Metodo che richiede al back-end la lista dei nomi dei
         * percorsi di presentazione presenti nel progetto corrente. Il
         * metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto o
         * rifiutato. Nel caso la promessa venga risolta, verrà fornito come
         * risultato un array associativo contenente i nomi dei percorsi,
         * associati al relativo id. Se invece la promessa viene rifiutata,
         * sarà fornita come ragione un oggetto <tt>ErrorInfo</tt> contenente
         * tutte le informazioni relative all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.PathService
         */
        function getPathNames(){
            var projectId = projectService.getId();
            return $http.get(SERVER_URL+'/projects/'+projectId+'/paths')
                .then(function (response){
                    return response.data.paths;
                },handleError);
        }
    }
})();
