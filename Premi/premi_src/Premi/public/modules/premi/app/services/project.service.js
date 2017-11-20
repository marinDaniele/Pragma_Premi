/**
 * @class ProjectService
 * @desc Questa classe si occupa del recupero e della modifica delle
 * informazioni riguardanti i progetti.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-12 Requisiti: RFO1, RFO1.1, RFO1.2, RFO2, RFD3,
 * RFO4, RFD4.1, RFF4.6, RFF4.6.3, RFO5, RFD6, RFO11, RFO11.2, RFO11.1,
 * RFF25.1, RFO10, RFO10.1, RFO10.2, RFO11.3
 * @memberOf Front-End::Services
 */

(function (){
    'use strict';
    angular
        .module('premi.services')
        .factory('projectService', projectService);

    projectService.$inject = ['$http', '$q', 'SERVER_URL',
        'mindmapAdapterService'];

    function projectService($http, $q, SERVER_URL, mindmapAdapterService){
        //Riferifmento al progetto corrente
        var _currentProject = null;

        return {
            createProject: createProject,
            deleteProject: deleteProject,
            finalizeProjectUpdates: finalizeProjectUpdates,
            getCurrentProject: getCurrentProject,
            getId: getId,
            getProjects: getProjects,
            getStyle: getStyle,
            loadProject: loadProject
        };

        // ------- funzioni private
        /**
         * @function handleError
         * @instance
         * @desc Metodo di utilità che si occupa di gestire il fallimento di
         * una chiamata HTTP verso il server.
         * @param {Object} response - Parametro che rappresenta l'oggetto
         * ricevuto in risposta ad una chiamata HTTP effettuata con
         * <tt>$http</tt>.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
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
                    'server', 'Ci sono dei problemi di comnicazione con il ' +
                    'server' +
                'questo può essere dovuto ad un problema della connessione' +
                    ' ad internet oppure ad un problema del nostro' +
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
         * @memberOf Front-End::Services.ProjectService
         */
        function handleSuccess(response){
            console.log('asdasdasd');
            return response.data;
        }

        // ------- funzioni pubbliche
        /**
         * @function createProject
         * @instance
         * @desc Metodo che richiede al back-end la creazione di un nuovo
         * progetto usando il nome ricevuto per parametro. Il metodo ritorna un
         * oggetto <tt>Promise</tt> che può venire risolto o rifiutato.
         * Nel caso la promessa venga risolta, verrà fornito come risultato un
         * oggetto <tt>Project</tt> contenente i dati del nuovo progetto. Se
         * invece la promessa viene rifiutata, sarà fornita come ragione un
         * oggetto <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @param {String} name - Parametro che rappresenta il nome del nuovo
         * progetto da creare.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
         */
        function createProject(name){
            console.log('post '+SERVER_URL+'/projects');

            return $http.post(SERVER_URL+'/projects',{'name':name})
                .then(function (response){
                    console.log('creo progetto');
                    console.log(response);
                    if (response.data.hasOwnProperty('_id') &&
                        response.data.hasOwnProperty('name') &&
                        response.data.hasOwnProperty('paths')){
                        return {
                            _id: response.data._id,
                            name: response.data.name,
                            paths: response.data.paths
                        };
                    }else{
                        return $q.reject(new ErrorInfo("Errore",
                            "Dati ricevuti non validi","data"));
                    }
                }, handleError);
        }
        /**
         * @function deleteProject
         * @instance
         * @desc Metodo che richiede al back-end l'eliminazione del progetto
         * avente <tt>id</tt> pari al valore del parametro <tt>projectId</tt>.
         * Il metodo ritorna un oggetto <tt>Promise</tt> che può venire risolto
         * o rifiutato. Nel caso la promessa venga rifiutata, verrà fornita
         * come ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} projectId - Parametro che rappresenta il nome del
         * progetto da eliminare.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
         */
        function deleteProject(projectId){
            console.log('delete '+SERVER_URL+'/projects/'+projectId);
            return $http.delete(SERVER_URL+'/projects/'+projectId)
                .then(handleSuccess, handleError);
        }
        /**
         * @function finalizeProjectUpdates
         * @instance
         * @desc Metodo che richiede al back-end il salvataggio delle modifiche
         * subite dai parametri dell'oggetto <tt>currentProject</tt>.
         * Restituisce un valore <tt>Boolean</tt> che specifica se
         * l'operazione è andata a buon fine. Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o rifiutato. Nel caso la
         * promessa venga rifiutata, verrà fornita come ragione un oggetto
         * <tt>ErrorInfo</tt> contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
         */
        function finalizeProjectUpdates(){
            var jsonData = {};
            jsonData.name = _currentProject.getName();
            jsonData.bkgColor = _currentProject.getBackgroundColor();
            jsonData.fontColor = _currentProject.getTextColor();
            jsonData.fontFamily = _currentProject.getFontFamily();
            console.log('put '+SERVER_URL+'/projects/'+_currentProject.getId());
            console.log(jsonData);
            return $http.put(SERVER_URL+'/projects/' + _currentProject.getId(),
                jsonData)
                .then(handleSuccess, handleError);

        }
        /**
         * @function getCurrentProject
         * @instance
         * @desc Metodo che restituisce un riferimento all'oggetto presente
         * in <tt>currentProject</tt>. Se <tt>currentProject</tt> non è
         * istanziato, restituisce <tt>null</tt>.
         * @returns {Project}
         * @memberOf Front-End::Services.ProjectService
         */
        function getCurrentProject(){
            return _currentProject;
        }
        /**
         * @function getId
         * @instance
         * @desc Metodo che restituisce l'<tt>id</tt> dell'oggetto
         * <tt>currentProject</tt>. Se questa non esiste restituisce una
         * stringa vuota.
         * @returns {String}
         * @memberOf Front-End::Services.ProjectService
         */
        function getId(){
            return _currentProject.getId();
        }
        /**
         * @function getProjects
         * @instance
         * @desc Metodo che richiede al back-end l'<tt>id</tt>, il nome e
         * percorsi di presentazione (solo id e nomi) di
         * tutti i progetti creati dall'utente. Il metodo ritorna un oggetto
         * <tt>Promise</tt> che può venire risolto o
         * rifiutato. Nel caso la promessa venga risolta, verrà fornito come
         * risultato un <tt>Array</tt> di oggetti
         * instanziati utilizzando il <tt>JSON</tt> ricevuto in risposta dal
         * back-end. Se invece la promessa viene
         * rifiutata, sarà fornita come ragione un oggetto <tt>ErrorInfo</tt>
         * contenente tutte le informazioni relative
         * all’errore che si è verificato.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
         */
        function getProjects(){
            //console.log(SERVER_URL+'/projects');
            return $http.get(SERVER_URL+'/projects', {})
                .then(function (response){
                    console.log(response.data);
                    return response.data;
                }, handleError);

        }
        /**
         * @function getStyle
         * @instance
         * @desc Metodo che restituisce una stringa contente le classi CSS
         * che definiscono stile generale di
         * <tt>currentProject</tt>. Se <tt>currentProject</tt> non è stato
         * istanziato restituisce una stringa vuota.
         * @returns {String}
         * @memberOf Front-End::Services.ProjectService
         */
        function getStyle(){
            var bkgC = _currentProject.getBackgroundColor()+'Bkg';
            var txtC = _currentProject.getTextColor()+'Text';
            return _currentProject.getFontFamily() +' '+ bkgC + ' ' + txtC;
        }
        /**
         * @function loadProject
         * @instance
         * @desc Metodo che carica in memoria il progetto avente <tt>id</tt>
         * pari al valore del parametro <tt>projectId</tt>. Viene effettuata
         * una richiesta alle API del back-end e con i dati ricevuti viene prima
         * creato un oggetto <tt>Project</tt> che sarà memorizzato nel campo
         * dati <tt>currentProject</tt>, dopodiché, sempre con gli stessi dati,
         * viene inizializzato <tt>MindmapService</tt>. Il metodo ritorna un
         * oggetto <tt>Promise</tt> che può venire risolto o rifiutato. Nel
         * caso la promessa venga rifiutata, verrà fornita come
         * ragione un oggetto <tt>ErrorInfo</tt> contenente tutte le
         * informazioni relative all’errore che si è verificato.
         * @param {String} id - Parametro che rappresenta l'<tt>id</tt> del
         * progetto da caricare in memoria.
         * @returns {Promise}
         * @memberOf Front-End::Services.ProjectService
         */
        function loadProject(id){

            /* togliere commento appena sarà disponibile il back-end */
            //console.log('GET '+SERVER_URL+'/projects/'+id);
            return $http.get(SERVER_URL+'/projects/'+id)
                .then(function (response){
                    //console.log(response);
                    _currentProject = new Project(id,
                                                  response.data.name,
                                                  response.data.bkgColor,
                                                  response.data.fontFamily,
                                                  response.data.fontColor,
                        /*id del nodo radice*/    response.data.root);

                    mindmapAdapterService.loadMap(response.data.nodes,
                        response.data.relations,
                        _currentProject.getRootId());
                }, handleError);
        }
    }
})();
