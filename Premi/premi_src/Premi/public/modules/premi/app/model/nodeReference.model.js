/**
 * @class NodeReference
 * @classdesc Rappresenta il riferimento ad un nodo della mappa mentale,
 * contiene l'identificativo e il titolo del del nodo.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFD4.4, RFD4.4.1, RFD4.4.3,
 * RFO5, RFD6
 * @memberof Front-End::Model
 */

'use strict';
function NodeReference(id,title){
    this._id = id;
    this._title = title;
}
/**
 * @function getId
 * @instance
 * @desc Metodo che restituisce l'identificativo del nodo associato al passo di
 * percorso di presentazione.
 * @returns {String}
 * @memberOf Front-End::Model.NodeReference
 */
NodeReference.prototype.getId = function (){
    return this._id;
};
/**
 * @function getTitle
 * @instance
 * @desc Metodo che restituisce il titolo del passo di percorso di
 * presentazione.
 * @returns {String}
 * @memberOf Front-End::Model.NodeReference
 */
NodeReference.prototype.getTitle = function (){
    return this._title;
};

