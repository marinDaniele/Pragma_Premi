'use strict';
/**
 * @class ProjectManagementController
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 10/05/2015 - Requisiti: RFO1, RFO1.1, RFO4, RFD4.1, RFO4.2, RFD4.2.3.8, RFD4.2.3.8.1, RFD4.2.3.8.2,
RFF4.6, RFF4.6.1, RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFO11, RFO11.2, RFD22, RFO10, RFD33, RFO11.3, RFD35
 * @classdesc Classe che gestisce la logica applicativa riguardante la visualizzazione e la modifica dei progetti.
 * @memberof Back-End::App::Controllers::Projects
 */
/*---PRIVATE---*/
var _ = require('lodash'),
    mongoose = require('mongoose'),
    PremiError = require('../errors/PremiError'),
    Project = mongoose.model('Project');

function nodeTitle(node)
{
    var title = '';
    node.contents.forEach(
        function(content)
        {
            if(content.class === 'title')
            {
                title = content.content;
                return;
            }
        }
    );
    return title;
}

function buildFrame(project, node, frame)
{
    var child, parent, title, foundChild;
    foundChild = false;
    project.relations.forEach(
        function(rel)
        {
            var nodeId = node.id.toString();
            var source = rel.source.toString();
            var dest = rel.destination.toString();

            //se è gerarchica e  nodo è source
            if(rel.class === 'hierarchical')
            {
                if(source === nodeId)
                {
                    //estraggo il figlio
                    child = project.nodes.id(rel.destination);
                    //prendo il titolo
                    title = nodeTitle(child);
                    //inserisco in children
                    frame.family.children.push(
                        {
                            id : child.id,
                            title : title
                        }
                    );
                }else if(dest === nodeId)
                {
                    //estraggo il figlio
                    parent = project.nodes.id(rel.source);
                    //prendo il titolo
                    title = nodeTitle(parent);
                    //inserisco in children
                    frame.family.parent =
                    {
                        id : parent.id,
                        title : title
                    };
                }

            }else if(rel.class === 'association')
            {
                //se nodo e source
                if(source === nodeId)
                {
                    child = project.nodes.id(rel.destination);
                    foundChild = true;
                }else if(dest === nodeId) //se nodo è destination if(rel.destination === node.id)
                {
                    child = project.nodes.id(rel.source);
                    foundChild = true;
                }

                if(foundChild)
                {
                    //estraggo il titolo del figlio
                    title = nodeTitle(child);
                    //inserisco in associations
                    frame.associations.push(
                        {
                            id : child.id,
                            title : title
                        }
                    );
                    foundChild = false;
                }

            }
        }
    );
}
/*---PUBLIC---*/
/**
 * @function addProject
 * @instance
 * @description Crea un nuovo progetto associato all’utente autenticato.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste. */
exports.addProject =
    function (req, res, next){
        if(req.body.name)
            Project.createProject(req.body.name, req.user._id,
                function(project)
                {
                    res.json(project);
                },
                function (err)
                {
                    next(err);
                }
            );
        else
        {
            next(new PremiError(8001));
        }
    };
/**
 * @function getAllProjects
 * @instance
 * @description Restituisce una lista contenente tutti i progetti relativi all’utente autenticato, a cui vengono associati
i percorsi di presentazione creati.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */
exports.getAllProjects =
    function (req, res, next)
    {
        Project.aggregate(
            {
                $match : {userId : req.user._id}
            },
            {
                $project : { name : 1, 'paths._id' : 1, 'paths.name' : 1}
            },
            function (err, result)
            {
                if (err)
                {
                    next(new PremiError(8000));
                }
                else
                    res.json(result || null);
            }
        );
    };
/**
 * @function getProject
 * @instance
 * @description Restituisce la mappa mentale comprendente nodi e relazioni.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.getProject =
    function (req, res, next)
    {
        Project.aggregate(
            {
                $match : { _id : req.project._id}
            },
            {
                $project : { _id : 0, name : 1, fontFamily : 1, fontColor : 1, bkgColor : 1, relations : 1, nodes : 1,
                root: 1}
            },
            function (err, result)
            {
                if(err)
                {
                    next(new PremiError(8000));
                }
                else
                    res.json(result[0] || null);
             }
        );
    };
/**
 * @function updateProject
 * @instance
 * @description Modifica le impostazioni del progetto associato all'utente autenticato.
 * Modifica il nome del progetto, il colore dello sfondo, il colore del testo e la famiglia di font.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
exports.updateProject =
    function (req, res, next)
    {
        if(req.body.name && req.body.bkgColor && req.body.fontColor && req.body.fontFamily)
        {
            req.project.setName(req.body.name,
                function ()
                {
                    req.project.setBkgColor(req.body.bkgColor,
                        function ()
                        {
                            req.project.setFontColor(req.body.fontColor,
                                function ()
                                {
                                    req.project.setFontFamily(req.body.fontFamily,
                                        function ()
                                        {
                                            res.json({status: 'ok'});
                                        },
                                        function (err)
                                        {
                                            next(err);
                                        });
                                },
                                function (err)
                                {
                                    next(err);
                                });
                        },
                        function (err)
                        {
                            next(err);
                        });
                },
                function (err)
                {
                    next(err);
                }
            );
        }
        else
        {
            next(new PremiError(8001));
        }
    };
/**
 * @function deleteProject
 * @instance
 * @description Richiede al model la rimozione dal database di un progetto associato all’utente autenticato.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */
exports.deleteProject =
    function (req,res,next)
    {
        req.project.remove(
            function (err) {
                if(err)
                {
                    next(new PremiError(8002));
                }
                else
                    res.json({ status : 'ok' })
                }
            );
    };
/**
 * @function getPresentation
 * @instance
 * @description Questo metodo è utilizzato per fornire un oggetto JSON contenente i nodi della mappa mentale e
 le relazioni per il progetto specificato. Indica inoltre quali nodi sono compresi nel percorso
 di presentazione indicato.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 */
//#NOTE MANCA LA GESTIONE DEGLI ERRORI IN CASO QUALCOSA NON ANDASSE A BUON FINE
exports.getPresentation =
    function (req,res)
    {//#NOTE gestire errore
        var project, presentation, frame;
        project = req.project;
        presentation =
        {
           frames : []
        };
        //per ogni nodo
        project.nodes.forEach(
            function (node)
            {
                //definisco struttura frame
                frame =
                    {
                        node : node,
                        family : {children:[], parent:''},
                        associations : []
                    };
                //costruisco il frame
                buildFrame(project, node, frame);
                //inserisco il frame nella presentazione
                presentation.frames.push(frame);
            }
        );
        res.json(presentation);
    };
/**
 * @function getAllPaths
 * @instance
 * @description Restituisce i percorsi di presentazione del progetto relativo all’utente della sessione. Altrimenti
restituisce un messaggio di errore.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della
 normale catena di gestione delle richieste.
 */
exports.getAllPaths =
    function (req,res,next)
    {
        Project.aggregate(
            {
                $match : { _id : req.project._id}
            },
            {
                $project : { _id : 0, paths : 1}
            },
            function (err, result)
            {
                if(err)
                    next(new PremiError(8000));
                else
                    res.json(result[0] || null);
            }
        );
    };

/**
 * MIDDLEWARES
 */
/**
 * @function projectById
 * @instance
 * @description Middleware sui parametri delle richieste REST relative all'id del progetto.
 * Controlla che l'id del progetto esista nel database: se ciò è verificato inserisce
 * l'id in req e passa il controllo al successivo ConcreteHandler, altrimenti passa il
 * controllo alla catena di gestione degli errori.
 * @memberof Back-End::App::Controllers::Projects.ProjectManagementController
 * @param {Request} req - Rappresenta la richiesta inviata al server.
 * @param {Response} res - Rappresenta la risposta che il server fornirà al termine dell’esecuzione del metodo.
 * @param {function(PremiError)} next - Callback che attiva la catena di gestione dell’errore in sostituzione della normale
catena di gestione delle richieste.
 * @param {String} id - Rappresenta l'identificativo del progetto.
 */
exports.projectById =
    function (req, res, next, id)
    {
        if (!mongoose.Types.ObjectId.isValid(id))
            next(new PremiError(2000));
        else
        {
            Project.findOne(
                {
                    userId: req.user._id,
                    _id: id
                },
                function (err, project) {
                    if (err)
                        next(err);
                    req.project = project;
                    next();
                }
            );
        }
    };
