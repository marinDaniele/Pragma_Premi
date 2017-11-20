'use strict';
/**
 * @namespace Back-End::App::Models
 */
/**
 * @class ProjectModel
 * @classdesc Questa classe rappresenta una mappa mentale, che contiene nodi,
 * relazioni tra i nodi e percorsi di presentazione.
 * @author: Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 04/05/2015 - Requisiti: RFO1, RFO1.1, RFO1.2.1, RFO1.2.1.1, RFO4, RFD4.1, RFO4.2, RFO4.2.2, RFO4.2.3,
 RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.7, RFD4.2.3.8, RFD4.2.3.8.1, RFD4.2.3.8.2, RFO4.2.3.12, RFO4.2.3.13, RFD4.2.3.15,
RFD4.2.3.16, RFO4.2.5,RFO4.2.6, RFO4.2.7, RFD4.3, RFD4.3.1, RFD4.3.2, RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.4.5, RFD4.5,
RFF4.6, RFF4.6.1,RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFO7, RFD7.1, RFO10, RFO11, RFO11.2, RFO11.3, RFD22, RFD33
 * @memberof Back-End::App::Models
 */

var
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    User = require('./UserModel'),
    NodeContent = require('./NodeContentModel'),
    NodeModel = require('./NodeModel'),
    Path = require('./PathModel'),
    Relation = require('./RelationModel'),
    PremiError = require('../controllers/errors/PremiError');

/**
 * Questo campo dati rappresenta lo schema Mongoose per i progetti.
 * @memberof Back-End::App::Models.ProjectModel
 * @type {mongoose.Schema}
 */
var projectSchema = new Schema(
    {
        nodes: [NodeModel.schema],
        root: ObjectId,
        relations: [Relation.schema],
        paths: [Path.schema],
        name: String,
        userId: ObjectId,
        bkgColor: {type:String, default: 'default'},
        fontColor: {type:String, default: 'default'},
        fontFamily: {type:String, default: 'sans-serif'}

    }
);

/**
 * @description Metodo statico che costruisce un nuovo progetto che conterrà il primo nodo vuoto della mappa mentale. Verrà inoltre
 * istanziato il percorso di default. Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function createProject
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} name - Il nome del nuovo progetto.
 * @param {ObjectId} userId - L'identificativo dell'utente di Premi che ha creato il progetto.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.statics.createProject =
    function(name, userId, callback, errback)
    {
        var project;
        //creazione del nuovo percorso vuoto
        project = new this();
        //assegna il nome
        project.name = name;
        //assegna l'utente a cui appartiene il progetto
        project.userId = userId;
        //crea il nodo radice
        NodeModel.createNode(
                    function(node)
                    {
                        project.nodes.push(node);
                        project.root = node.id;
                        //crea il percorso di default e aggiunge nodo radice
                        Path.createPath('Default', true,
                            function(path)
                            {
                                path.addNode(node.id);
                                project.paths.push(path);

                                //salvataggio nel database: ritorna il progetto salvato o errore
                                project.save(
                                    function (err)
                                    {
                                        if(err)
                                            errback(err);
                                        else
                                            callback(project);
                                    }
                                );
                            }
                        );
                    }
        );
    };

/**
 * @description Metodo che consente di modificare il nome del progetto.
 * @function setName
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} name - Il nuovo nome per il progetto.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.setName =
    function(name, callback, errback)
    {
        //cambio il nome
        this.name = name;
        //salvataggio nel database: ritorna il progetto salvato o errore
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };

/**
 * @description Metodo che consente di modificare il colore per lo sfondo dei frame del progetto.
 * @function setBkgColor
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} color - Il nuovo colore scelto.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.setBkgColor =
    function(color, callback, errback)
    {
        this.bkgColor = color;
        //salvataggio nel database: ritorna il progetto salvato o errore
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };

/**
 * @description Metodo che consente di modificare il colore per i testi dei frame del progetto.
 * @function setFontColor
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} color - Il nuovo colore scelto.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.setFontColor =
    function(color, callback, errback)
    {
        this.fontColor = color;
        //salvataggio nel database: ritorna il progetto salvato o errore
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };

/**
 * @description Metodo che consente di modificare la famiglia di font dei frame del progetto.
 * @function setFontFamily
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} family - La nuova famiglia di font scelta.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.setFontFamily =
    function(family, callback, errback)
    {
        this.fontFamily = family;
        //salvataggio nel database: ritorna il progetto salvato o errore
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };

/**
 * @description Metodo che consente di cercare un nodo nel progetto. Se il nodo è presente, esso viene restituito mediante il
 * parametro callback. Altrimenti se non è presente restituisce un errore.
 * @function getNode
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} nodeId - Identificativo del nodo da cercare.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.getNode =
    function(nodeId, callback, errback)
    {
        var node;
        node = this.nodes.id(nodeId);
        if(!node)
            errback(new PremiError(11001));
        else
            callback(node);
    };

/**
 * @description Metodo che consente di aggiungere nodi vuoti al progetto e quindi alla mappa mentale.
 * Crea inoltre la relazione gerarchica tra il nuovo nodo e quello specificato come sorgente e lo aggiunge al percorso
 * di default. Restituisce un oggetto JSON che descrive l'elemento aggiunto oppure un messaggio di errore.
 * @function addNode
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} parentId - Identificativo del nodo padre.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.addNode =
    function(parentId, callback, errback)
    {
    //crea nuovo nodo vuoto
        var outerThis;
        outerThis= this;
        NodeModel.createNode(
                    function(node)
                    {
                        //verifico se è nodo radice
                        if(parentId)
                        {
                            //cerca il nodo padre, se non è presente restiuisce errore con errback
                            outerThis.getNode(parentId,
                                function(parent)
                                {
                                    //se non è nodo radice ed il padre non esiste, errore
                                    if(!parent)
                                        errback(new PremiError(11002));
                                    else{
                                        //altrimenti aggiungo il nodo e la relazione gerarchica
                                        outerThis.nodes.push(node);
                                        outerThis.paths.forEach(
                                            function(path)
                                            {
                                                if(path.default)
                                                    path.addNode(node.id);
                                            }
                                        );
                                        Relation.createRelation(
                                            parentId,
                                            node.id,
                                            'hierarchical',
                                            function(rel)
                                            {
                                                outerThis.relations.push(rel);
                                                outerThis.save(
                                                    function(err)
                                                    {
                                                        if (err) errback(err);
                                                        else callback(node);
                                                    }
                                                );
                                            }
                                        );
                                    }
                                },
                                function(err)
                                {
                                    errback(err);
                                }
                            );
                        }
                        else
                        {
                            //aggiungo nodo radice e quindi nessuna relazione
                            outerThis.nodes.push(node);
                            outerThis.save(
                                function(err)
                                {
                                    if (err) errback(err);
                                    else callback(node);
                                }
                            );
                        }
                    }
        );
    };

/**
 * Metodo 'privato' utilizzato da removeNode() per eliminare il nodo dai percorsi.
 * @ignore
 */
function deleteFromPaths(proj, nodeId)
{
    proj.paths.forEach(
        function (element)
        {
            var index = element.nodes.indexOf(nodeId);
            if (index > -1)
            {
                element.nodes.splice(index, 1);
            }
        }
    );
}

/**
 * Metodo 'privato' utilizzato da removeNode() per eliminare nodi e relazioni.
 * @ignore
 */
function recursiveDelete(proj,nodeId)
{
    var node, source, dest, element;
    //array di relazioni in cui nodeId è source
    var childRel = [];
    //per ogni relazione verifico se nodeId è dest o src
    for(var i = 0; i<proj.relations.length;i++)
    {
        element = proj.relations[i];
        node = nodeId.toString();
        source = element.source.toString();
        dest = element.destination.toString();
        //se la relazione è gererchica
        if (element.class === 'hierarchical')
        {
            //se il nodo è padre della relazione, aggiungo all'array di relazione quelle con i figli
            if(source === node)
                childRel.push(element);
            //se il nodo è destinazione, elimino la relazione
            else if (dest === node)
            {
                proj.relations.pull(element.id);
                i--;
            }
        }else if (element.class === 'association' && (source === node || dest === node))
        {
            //se la relazione è associazione
            //elimino l'associazione
            proj.relations.pull(element.id);
            i--;
        }
    }
    //elimino nodeId dai percorsi
    deleteFromPaths(proj, nodeId);
    childRel.forEach(function (element)
    {
        recursiveDelete(proj, element.destination);
    });
    //elimino il nodo
    proj.nodes.pull(nodeId);
}

/**
 * @description Metodo che consente di rimuovere nodi dal progetto e quindi dalla mappa mentale. Se un nodo da rimuovere è radice
 * di un sottoalbero, devono essere rimossi anche tutti i figli e le relazioni che coinvolgono il nodo.
 * Deve aggiornare anche tutti i percorsi di presentazione che contenevano quel nodo.
 * Restituisce un oggetto JSON che descrive la mappa mentale priva del sottoalbero rimosso oppure un messaggio di errore.
 * @function removeNode
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} nodeId - Identificativo del nodo da rimuovere.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 * @returns Restuisce un oggetto JSON che rappresenta il progetto modificato.
 */
projectSchema.methods.removeNode =
    function (nodeId, callback, errback)
    {
        if(this.root.toString() === nodeId.toString())
            errback(new PremiError(11003));
        else
        {
            recursiveDelete(this, nodeId);
            var outerThis = this;
            this.save(
                function(err)
                {
                    if (err) errback(err);
                    else callback(outerThis);
                }
            );
        }
    };


/**
 * @description Metodo che consente di modificare il contenuto di un nodo nella mappa mentale.
 * @function updateNode
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} nodeId - Identificativo del nodo da aggiornare.
 * @param {JSON} contents - Array di oggetti JSON che rappresentano i contenuti.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.updateNode =
    function (nodeId, contents, callback, errback)
    {
        //#BUG: non aggiorna anche il progetto associato all'utente
        var outerThis= this;
        this.nodes.id(nodeId).updateNode(
            contents,
            function()
            {
                //salva la modifica nel database e restituisce l'oggetto salvato
                outerThis.save(
                    function(err)
                    {
                        if (err) errback(err);
                        else callback();
                    }
                );
            }
        );
    };
/**
 * @description Metodo che costruisce una nuova relazione di tipo associazione.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function addAssociation
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} sourceId - Identificativo del nodo sorgente.
 * @param {ObjectId} destinationId - Identificativo del nodo destinazione.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.addAssociation = function (sourceId, destinationId, callback, errback){
    var outerThis;
    outerThis= this;
        Relation.createRelation(sourceId, destinationId, 'association',
            function(relation)
            {
                outerThis.relations.push(relation);
                //salvo nel database
                outerThis.save(function(err)
                {
                    if (err) errback(err);
                    else callback(relation._id);
                });
            },
            function(err)
            {
                errback(err);
            }
        );
};


/**
 * @description Metodo che consente di rimuovere una associazione tra due nodi.
 * @function removeAssociation
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} associationId - Identificativo dell'associazione da rimuovere.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.removeAssociation =
    function(associationId, callback, errback)
    {
        this.relations.id(associationId).remove();
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };


/**
 * @description Metodo che consente di aggiungere un nuovo percorso di presentazione con un nome specificato nei parametri.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function addPath
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {String} name - Il nome del percorso.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.addPath =
    function(name, callback, errback)
    {
        var outerThis= this;
        Path.createPath(
            name,
            false,
            function(path)
            {
                outerThis.paths.push(path);
                outerThis.save(
                    function(err)
                    {
                        if (err) errback(err);
                        else callback(path);
                    }
                );
            }
        );
    };

/**
 * @description Metodo che consente di rimuovere un percorso di presentazione.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function removePath
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} pathId - Identificativo del percorso da eliminare.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.removePath =
    function(pathId, callback, errback)
    {
        this.paths.pull(pathId);
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback();
            }
        );
    };

/**
 * @description Metodo che consente di modificare il nome di un percorso di presentazione.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function setPathName
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} pathId - Identificativo del percorso da modificare.
 * @param {String} name - Il nuovo nome per il percorso.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.setPathName =
    function(pathId, name, callback, errback)
    {
        var path;
        path = this.paths.id(pathId);
        path.setName(name);
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback(path);
            }
        );
    };

/**
 * @description Metodo che consente di ottenere l’elenco dei nodi presenti in un percorso di presentazione
 * del progetto attraverso la funzione di callback.
 * @function getPathNodes
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} pathId - Identificativo del percorso da modificare.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.getPathNodes =
    function(pathId, callback, errback)
        {
            var percorso =
            {
                'name': this.paths.id(pathId).name,
                'nodes': []
            };
            var outerThis = this;
            this.paths.id(pathId).nodes.forEach(
                function(element)
                {
                    outerThis.getNode(
                        element,
                        function(node)
                        {
                            percorso.nodes.push(node);
                        },
                        function(err)
                        {
                            errback(err);
                        }
                    );
                }
            );
            callback(percorso);
    };

/**
 * @description Metodo che consente di aggiungere nodi ad un percorso di presentazione.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function addNodeToPath
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} nodeId - Identificativo del nodo da aggiungere.
 * @param {ObjectId} pathId - Identificativo del percorso di presentazione.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.addNodeToPath =
    function(nodeId, pathId, callback, errback)
    {
        var path, pathNodes;
        path =  this.paths.id(pathId);
        path.addNode(nodeId);
        this.getPathNodes(
            pathId,
            function(json)
            {
                pathNodes = json;
            }
        );
        this.save(
            function(err)
            {
                if (err) errback(err);
                else callback(pathNodes);
            }
        );
    };

/**
 * @description Metodo che consente di rimuovere nodi da un percorso di presentazione del progetto.
 * Restituisce un oggetto JSON che descrive l’elemento oppure un messaggio di errore.
 * @function removeNodeFromPath
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {ObjectId} nodeId - Identificativo del nodo da rimuobere.
 * @param {ObjectId} pathId - Identificativo del percorso di presentazione.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 */
projectSchema.methods.removeNodeFromPath =
    function(nodeId, pathId, callback, errback)
    {
    var path, outerThis;
    outerThis = this;
    path =  this.paths.id(pathId);
    //se il nodo non è nel path errore
    path.removeNode(
        nodeId,
        function(json)
        {
            //se il nodo è nel path aggiorno
            outerThis.save(
                function(err)
                {
                    if (err) errback(err);
                    else
                    {
                        outerThis.getPathNodes(
                            pathId,
                            function(json)
                            {
                                callback(json);
                            }
                        );
                    }
                }
            );
        },
        function(err)//errore da instardare al controller: nodo non presente.
        {
            return errback(err);
        }
    );

};


/**
 * @description Metodo che consente di ottenere l’elenco dei percorsi di presentazione del progetto,
 * ovvero un oggetto JSON contenente coppie di identificativi e nomi dei percorsi, attraverso la funzione di callback.
 * @function getPathList
 * @instance
 * @memberof Back-End::App::Models.ProjectModel
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 */
projectSchema.methods.getPathList =
    function(callback)
        {
            var percorsi =
            {
                'paths':[]
            };
            this.paths.forEach(
                function(element)
                {
                    percorsi.paths.push(
                        {
                            'id': element.id,
                            'name': element.name,
                            'default': element.default
                        }
                    );
                }
            );
        callback(percorsi);
    };


mongoose.model('Project', projectSchema);

