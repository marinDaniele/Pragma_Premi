'use strict';
/**
 * @namespace Back-End::App::Controllers::Projects
 */
/**
 * @class NodeController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 09/05/2015 - Requisiti: RFO4, RFO4.2, RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.12,
 * RFO4.2.3.13, RFO4.2.5, RFO4.2.6, RFO4.2.7, RFD22, RFD4.2.3.15, RFD4.2.3.16, RFD35
 * @classdesc Classe che gestisce la logica applicativa riguardante la visualizzazione e la modifica dei nodi presenti in
un progetto.
 * @memberof Back-End::App::Controllers::Projects
 */
/*---PRIVATE---*/
var _ = require('lodash'),
    mongoose = require('mongoose'),
    PremiError = require('../errors/PremiError'),
    Project = mongoose.model('Project');

function validateNode(project, id)
{
    if (!mongoose.Types.ObjectId.isValid(id) || !project.nodes.id(id))
        return false;
    else
        return project.nodes.id(id);
}

function validateContents(contents)
{
        var valid= true;
        /*contents.forEach(function (element)
        {
            if(valid && (!element.class || !element.x || !element.y || !element.height || !element.width ||element.x > 100 ||
element.x < 0 || element.y > 100 || element.y < 0 || element.height > 100 || element.height < 0 || element.width > 100
|| element.width < 0))*/
        for(var i in contents)
        {
            if(valid && (!contents[i].class || !contents[i].x || !contents[i].y || !contents[i].height || !contents[i].width ||contents[i].x > 100 ||
contents[i].x < 0 || contents[i].y > 100 || contents[i].y < 0 || contents[i].height > 100 || contents[i].height < 0 || contents[i].width > 100
|| contents[i].width < 0))
                valid= false;
        }/*);*/
    return valid;
}
/*---PUBLIC---*/
/**
 * @function addNode
 * @instance
 * @description Aggiunge un nuovo nodo vuoto alla mappa mentale del progetto correntemente in uso, specificandone il
 collegamento con il nodo padre.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.addNode =
        function (req, res, next)
        {
            req.project.addNode(req.node._id,
                    function (node)
                    {
                        res.json(node);
                    },
                    function (err)
                    {
                        next(err);
                    }
            );
        };
/**
 * @function updateNode
 * @instance
 * @description Modifica il contenuto di un nodo della mappa mentale del progetto correntemente in uso dall’utente autenticato.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.updateNode =
        function (req,res, next)
        {
            if(validateContents(req.body.contents))
            {
                req.project.updateNode(req.node._id, req.body.contents,
                    function ()
                    {
                        res.json({status: 'ok'});
                    },
                    function (err)
                    {
                        next(err);
                    }
                );
            }
            else
            {
                next(new PremiError(9000));
            }
        };
/**
 * @function deleteNode
 * @instance
 * @description Rimuove un nodo dalla mappa mentale del progetto correntemente in uso dall’utente che ha effettuato il
login. Restituisce la mappa mentale, comprendente nodi e relazioni in un oggetto JSON, priva del nodo rimosso e
dell’eventuale sottoalbero di cui era padre.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.deleteNode =
        function (req, res, next)
        {
            req.project.removeNode(req.node._id,
                    function (result)
                    {
                        res.json(result || null);
                    },
                    function (err)
                    {
                        next(err);
                    }
            );
        };

/**
 * ASSOCIATIONS
 */
/**
 * @function addAssociation
 * @instance
 * @description Aggiunge una relazione di tipo associazione tra due nodi presenti nella mappa mentale del progetto
correntemente in uso.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.addAssociation =
        function (req,res,next)
        {
            var verifiedSource, verifiedDestination;
            verifiedSource= validateNode(req.project, req.body.sourceId);
            verifiedDestination= validateNode(req.project, req.body.destinationId);
            if(verifiedSource === false || verifiedDestination === false || verifiedSource._id === verifiedDestination._id)
            {
                next(new PremiError(9001));
            }
            else
                req.project.addAssociation(verifiedSource._id, verifiedDestination._id,
                    function (associationId)
                    {
                        res.json({_id : associationId});
                    },
                    function (err)
                    {
                        return next(err);
                    }
                );
        };
/**
 * @function deleteAssociation
 * @instance
 * @description Rimuove una relazione di tipo association tra due nodi presenti nella mappa mentale del progetto
correntemente in uso dall’utente che ha effettuato il login.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */
exports.deleteAssociation =
    function (req,res,next)
    {
        req.project.removeAssociation(req.association._id,
            function ()
            {
                res.json({ status : 'ok' });
            },
            function (err)
            {
                next(err);
            }
        );

    };
/**
 * MIDDLEWARES
 */
/**
 * @function nodeById
 * @instance
 * @description Middleware sui parametri delle richieste REST relative all'id del nodo. Controlla che l'id del nodo esista
nel database: se ciò è verificato passa il controllo al successivo ConcreteHandler, altrimenti passa il controllo alla
catena di gestione degli errori.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 * @param {String} id - Rappresenta l'identificativo del nodo.
 */
exports.nodeById =
    function (req, res, next, id)
    {
        if (!mongoose.Types.ObjectId.isValid(id) || !req.project.nodes.id(id))
            next(new PremiError(3000));
        else
        {
            req.node = req.project.nodes.id(id);
            next();
        }
    };
/**
 * @function associationById
 * @instance
 * @description Middleware sui parametri delle richieste REST relative all'id dell'associazione logica(non gerarchica).
Controlla che l'id dell'associazione esista nel database: se ciò è verificato passa il controllo al successivo
ConcreteHandler, altrimenti passa il controllo alla catena di gestione degli errori.
 * @memberof Back-End::App::Controllers::Projects.NodeController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 * @param {String} id - Rappresenta l'identificativo dell'associazione.
 */
exports.associationById =
    function (req, res, next, id) {
         var association;
         association= req.project.relations.id(id);
        if (!mongoose.Types.ObjectId.isValid(id) || !association || association.class !== 'association')
            next(new PremiError(6000));
        else
        {
            req.association = association;
            next();
        }
    };
