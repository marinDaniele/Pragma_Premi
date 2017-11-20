'use strict';
/**
 * @class PathController
 * @classdesc Classe che gestisce la logica applicativa riguardante la visualizzazione e la modifica dei percorsi di
 * presentazione di un progetto.
 * @author Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 09/05/2015 - Requisiti: RFO4, RFD4.3, RFD4.3.1, RFD4.3.2, RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.4.5,
RFD4.5, RFD22, RFD35
 * @memberof Back-End::App::Controllers::Projects
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    PremiError = require('../errors/PremiError');
/**
 * @function addPath
 * @instance
 * @description Crea un nuovo percorso di presentazione, con un nome specificato nel parametro req.
 * Restituisce un oggetto JSON contenente l’identificativo, presente nel database, del percorso creato.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.addPath =
    function(req, res, next)
    {
        //verifico che il nuovo nome sia definito nella richiesta dell'utente
        if(!req.body.name)
        {
           return next(new PremiError(10000));
        }
        else
        {
            //aggiungo un percorso vuoto e salva automaticamente nel db
            req.project.addPath(
                req.body.name,
                function(path)
                {
                    res.json(
                        {
                        id : path.id,
                        name : path.name
                        }
                    );
                },
                function(err)
                {
                    next(err);
                }
            );
        }
    };
/**
 * @function deletePath
 * @instance
 * @description Elimina un percorso di presentazione dal database.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.deletePath =
    function(req, res, next)
    {
        //riumovo il percorso
        req.project.removePath(
            req._path._id,
            function()
            {
                res.json({'status' : 'ok'});
            },
            function(err)
            {
                next(err);
            }
        );
    };

/**
 * @function getPath
 * @instance
 * @description Restituisce un oggetto JSON contenente tutti i nodi facenti parte di un percorso di presentazione del
 * progetto correntemente in uso dall’utente che ha effettuato il login.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.getPath =
    function(req, res, next)
    {
        //restituisco la lista dei nodi
        req.project.getPathNodes(
            req._path._id,
            function(json)
            {
                res.json(json);
            },
            function(err)
            {
                next(err);
            }
        );
    };

/**
 * @function updatePath
 * @instance
 * @description Questo metodo viene utilizzato per modificare le impostazioni di un percorso di presentazione nel
 * database. In particolare è utilizzato per rinominare un percorso di presentazione. Ottiene il nuovo nome dal
 * parametro req. Restituisce un messaggio di conferma o un errore, nel formato JSON stabilito.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.updatePath =
    function(req, res, next)
    {
        //verifico che il nuovo nome sia definito nella richiesta dell'utente
        if(!req.body.name)
        {
            next(new PremiError(10000));
        }else
        {
            //rinomino il percorso
            req.project.setPathName(
                req._path._id,
                req.body.name,
                function(json)
                {
                    res.json(
                        {
                            'status' : 'ok'
                        }
                    );
                },
                function(err)
                {
                    next(err);
                }
            );
        }
    };

/**
 * @function addNodeToPath
 * @instance
 * @description Aggiunge un nodo ad un percorso del progetto correntemente in uso dall’utente che ha effettuato il login.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.addNodeToPath =
    function(req, res, next){
        //aggiungo al percorso
        req.project.addNodeToPath(
            req.node._id,
            req._path._id,
            function(updatedPath)
            {
                res.json(updatedPath);
            },
            function(err)
            {
                next(err);
            }
        );

    };

/**
 * @function deleteNodeFromPath
 * @instance
 * @description Rimuove un nodo da un percorso del progetto correntemente in uso dall’utente che ha effettuato il login.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 */
exports.deleteNodeFromPath =
    function(req, res, next){
        req.project.removeNodeFromPath(
            req.node._id,
            req._path._id,
            function(json)
            {
                res.json(json);
            },
            function(err)
            {
                //controllo che sia istanza di PremiError
                next(err);
            }
        );

    };

/*
 Middleware sui parametri delle richieste REST relative all'id del path. Controlla che l'id del path esista nel database: se ciò è verificato passa il controllo al successivo ConcreteHandler, altrimenti passa il controllo alla catena di gestione degli errori.
 */
/**
 * @function pathById
 * @instance
 * @description  Middleware sui parametri delle richieste REST relative all'id del path. Controlla che l'id del path
 * esista nel database: se ciò è verificato passa il controllo al successivo ConcreteHandler,
 * altrimenti passa il controllo alla catena di gestione degli errori.
 * @memberof Back-End::App::Controllers::Projects.PathController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
 catena di gestione delle richieste.
 * @param {String} id - Rappresenta l'identificativo del path.
 */
exports.pathById =
    function(req, res, next, id)
    {
        //controllo che id sia un ObjectId valido e che esista un path con quell'identificativo
        if (!mongoose.Types.ObjectId.isValid(id) || !req.project.paths.id(id))
            next(new PremiError(7000));//#NOTE : vedi gestione errori discorso middleware in projectById
        else
        {//l'id del path viene reso disponibile ai controller in req._path._id
            req._path = req.project.paths.id(id);
            next();
        }
    };
