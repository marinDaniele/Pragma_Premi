'use strict';
/**
 * @class RelationModel
 * @classdesc Questa classe rappresenta le relazioni tra i nodi di una mappa mentale. Le relazioni possono essere
 * di due tipi: gerarchiche o associazioni.
 * @author: Andrea Ongaro (andrea.ongaro.kuro@gmail.com)
 * @description Data: 02/05/2015 - Requisiti: RFO4, RFO4.2, RFO4.2.5, RFO4.2.6, RFO4.2.7, RFD22
 * @memberof Back-End::App::Models
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Questo campo dati rappresenta lo schema Mongoose per le relazioni.
 * @private
 * @memberof Back-End::App::Models.RelationModel
 * @type {mongoose.Schema}
 */
var relationSchema = new Schema(
    {
        source: ObjectId,
        destination: ObjectId,
        class: { type: String, enum: ['hierarchical', 'association'] }
    }
);

/**
 * Metodo statico che costruisce un nuova relazione.
 * @memberof Back-End::App::Models.RelationModel
 * @function createRelation
 * @param {ObjectId} sourceId - Identificativo del nodo sorgente (o padre) della relazione.
 * @param {ObjectId} destinationId - Identificativo del nodo destinazione (o figlio) della relazione.
 * @param {String} type - Specifica se la relazione da creare è di tipo gerarchico o una associazione.
 * @param {function} callback - Rappresenta la callback che il metodo deve chiamare al termine dell’elaborazione.
 */
relationSchema.statics.createRelation =
    function (sourceId, destinationId, type, callback)
    {
        var rel = new this();
        rel.source = sourceId;
        rel.destination = destinationId;
        rel.class = type;
        callback(rel);
    };

module.exports = mongoose.model('Relation', relationSchema);
