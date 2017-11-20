'use strict';
/**
 * @class NodeContentModel
 * @classdesc Questa classe rappresenta gli elementi contenuti in un nodo della mappa mentale.
 * Contiene le informazioni riguardanti la posizione e le dimensioni dell’oggetto all’interno del nodo.
 * * @author: Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 02/05/2015 - Requisiti: RFO4, RFO4.2.2
 * @memberof Back-End::App::Models
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Questo campo dati rappresenta lo schema Mongoose per il contenuto di un nodo
 * nodeContentSchema
 * @type {mongoose.Schema}
 * @memberof  Back-End::App::Models.NodeContentModel
 */
var nodeContentSchema = new Schema(
    {
        content: String,
        x: Number,
        y: Number,
        height: Number,
        width: Number,
        class: {type:String, enum: ['title', 'text', 'imgUrl']}
    }
);

/**
 * Metodo statico che costruisce un nuovo elemento di contenuto. Restituisce un oggetto JSON che descrive l’elemento.
 * @function createNodeContent
 * @param {JSON} content - Rappresentazione JSON del nuovo contenuto.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione
 * nel caso in cui non si siano verificati errori.
 * @returns JSON che descrive il contenuto mediante il parametro callback.
 * @memberof Back-End::App::Models.NodeContentModel
 */
nodeContentSchema.statics.createNodeContent =
    function(content, callback)
    {
        var nodeContent = new this(content);
        callback(nodeContent);
    };

module.exports = mongoose.model('NodeContent', nodeContentSchema);
