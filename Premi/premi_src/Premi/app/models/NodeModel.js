'use strict';
/**
 * @class NodeModel
 * @classdesc Questa classe rappresenta i nodi della mappa mentale.
 * @author: Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 02/05/2015 - Requisiti: RFO4, RFO4.2, RFO4.2.2, RFO4.2.3, RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.7,
RFO4.2.3.12, RFO4.2.3.13, RFD4.2.3.15, RFD4.2.3.16, RFO4.2.5, RFD22
 * @memberof Back-End::App::Models
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    NodeContent = require('./NodeContentModel');

/**
 * Schema di Mongoose per la classe NodeModel.
 * @memberof Back-End::App::Models.NodeModel
 * @type {mongoose.Schema}
 */
var nodeSchema = new Schema(
    {
        contents: [NodeContent.schema]
    }
);

/**
 * Metodo statico che costruisce un nuovo nodo senza contenuti.
 * Restituisce un oggetto JSON che descrive l’elemento.
 * @function createNode
 * @memberof Back-End::App::Models.NodeModel
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 */
nodeSchema.statics.createNode =
    function(callback)
    {
        var node;
        node = new this();
        node.contents =
            new NodeContent(
                {
                    content: 'Nuovo nodo',
                    x: 28,
                    y: 5.8,
                    height: 0,
                    width: 0,
                    class: 'title'
                }
            );
        callback(node);
    };

/**
 * Questo metodo restituisce un array di oggetti JSON che rappresentano i contenuti di un nodo.
 * @function getContents
 * @instance
 * @memberof NodeModel
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @returns JSON mediante il parametro callback.
 */
nodeSchema.methods.getContents =
    function(callback)
    {
        callback(this.contents);
    };

/**
 * Aggiorna i contenuti di un nodo e restituisce l'oggetto dopo l'aggiornamento, come oggetto JSON.
 * @function updateNode
 * @instance
 * @memberof NodeModel
 * @param {JSON} contents - Rappresenta i contenuti che devono essere inseriti nel nodo.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 */
nodeSchema.methods.updateNode =
    function(contents, callback)
    {
        var outerThis = this;
        this.contents = [];
        /*contents.forEach(
            function(element)
            {*/
        for(var i in contents)
        {
            outerThis.contents.push(/*element*/contents[i]);
        }
            /*}
        );*/
        callback(this);
    };

module.exports = mongoose.model('NodeModel', nodeSchema);
