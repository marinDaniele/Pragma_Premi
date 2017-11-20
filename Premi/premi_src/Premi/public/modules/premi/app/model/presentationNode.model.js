/**
 * @class PresentationNode
 * @classdesc Classe che estende Node, riproducendo una struttura comoda per
 * poter presentare i contenuti di un nodo e semplificare lo spostamento fra
 * frame associati e con relazioni di tipo gerarchico.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO7, RFO7.2, RFO7.3, RFO7.7
 * @memberof Front-End::Model
 */

'use strict';
function PresentationNode(id,contents,parentNode, childNodes,associatedNodes){
    Node.call(this,id,contents);
    this._parentNode = parentNode; //NodeReference
    this._childNodes = childNodes;//[NodeReference]
    this._associatedNodes = associatedNodes; //[NodeReference]
}

PresentationNode.prototype = new Node('',[]);
PresentationNode.prototype.constructor = PresentationNode;
/**
 * @function getParentNode
 * @instance
 * @desc Metodo che restituisce un oggetto <tt>NodeReference</tt> relativo al
 * nodo padre.
 * @returns {NodeReference}
 * @memberOf Front-End::Model.PresentationNode
 */
PresentationNode.prototype.getParentNode = function (){
    //Se non c'è un nodo padre ritorno  null. (vuol dire che il nodo corrente è la radice)
    if (this._parentNode !== null && this._parentNode.getId() !== undefined){
        return this._parentNode;
    } else {
        return null;
    }
};
/**
 * @function getChildNodes
 * @instance
 * @desc Metodo che restituisce un array contenente i vari
 * <tt>NodeReference</tt> dei nodi figli di questo nodo.
 * @returns {Array}
 * @memberOf Front-End::Model.PresentationNode
 */
PresentationNode.prototype.getChildNodes = function (){
    return this._childNodes;
};
/**
 * @function getAssociatedNodes
 * @instance
 * @desc Metodo che restituisce un array contenente i vari
 * <tt>NodeReference</tt> dei nodi associati a questo nodo.
 * @returns {Array}
 * @memberOf Front-End::Model.PresentationNode
 */
PresentationNode.prototype.getAssociatedNodes = function (){
    return this._associatedNodes;
};
