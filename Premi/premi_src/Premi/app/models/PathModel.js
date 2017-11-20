'use strict';
/**
 * @class PathModel
 * @classdesc Questa classe rappresenta i percorsi di presentazione eseguibili su una mappa mentale.
 * @author: Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 02/05/2015 - Requisiti: RFO4, RFD4.3, RFD4.3.1, RFD4.3.2, RFD4.4, RFD4.4.1, RFD4.4.3, RFD4.4.5,
RFD4.5, RFD22
 * @memberof Back-End::App::Models
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    PremiError = require('../controllers/errors/PremiError');

/**
 * Questo campo dati rappresenta lo schema Mongoose per i percorsi di presentazione.
 * @type {mongoose.Schema}
 * @memberof Back-End::App::Models.PathModel
 */
var pathSchema = new Schema(
    {
        name: String,
        default: Boolean,
        nodes: [ObjectId]
    }
);

/**
 * @description Metodo statico che costruisce un nuovo percorso inizialmente privo di nodi.
 * Restituisce un oggetto JSON che descrive l’elemento.
 * @function createPath
 * @param {String} name - Rappresenta il nome del percorso che si vuole creare.
 * @param {Boolean} isDefault - Parametro che indica se il percorso da creare è un percorso di default.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @memberof Back-End::App::Models.PathModel
 */
pathSchema.statics.createPath =
    function(name, isDefault, callback)
    {
        var path = new this();
        path.name = name;
        path.default = isDefault;
        callback(path);
    };

/**
 * @description Metodo che consente di modificare il nome del percorso di presentazione.
 * @function setName
 * @instance
 * @param {String} name - Il nuovo nome del percorso.
 * @memberof Back-End::App::Models.PathModel
 */
pathSchema.methods.setName = function(name){
    this.name = name;
};

/**
 * Metodo che aggiunge un nodo ad un percorso di presentazione.
 * @function addNode
 * @instance
 * @param {ObjectId} nodeId - Identificativo del nodo da aggiungere al percorso.
 * @memberof Back-End::App::Models.PathModel
 */
pathSchema.methods.addNode =
    function(nodeId)
    {
        this.nodes.push(nodeId);
    };

/**
 * Metodo che rimuove un nodo da un percorso di presentazione. Restituisce un oggetto JSON che descrive l'elemento dopo
 * la modifica oppure un messaggio di errore se il nodo non è presente nel percorso.
 * @function removeNode
 * @instance
 * @param nodeId
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @param {function} errback - Rappresenta la callback che il metodo deve chiamare qualora si
 * verificassero errori durante l’esecuzione del metodo.
 * @memberof Back-End::App::Models.PathModel
 */
pathSchema.methods.removeNode =
    function(nodeId, callback, errback)
    {
        var index = this.nodes.indexOf(nodeId);
        if (index > -1)
        {
            this.nodes.splice(index, 1);
            callback(this);
        }else errback(new PremiError(12000));
    };

module.exports = mongoose.model('Path', pathSchema);
