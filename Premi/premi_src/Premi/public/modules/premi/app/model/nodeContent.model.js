/**
 * @class NodeContent
 * @classdesc Rappresenta il contenuto di un nodo. Contiene informazioni che
 * indicano deve essere visualizzato il contenuto all’interno del nodo.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFO4.2, RFO4.2.3.1,
 * RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.5.2, RFO4.2.3.5.1, RFO4.2.3.7, RFO5,
 * RFD6, RFD22, RFO4.2.3.2, RFD4.2.3.15, RFD4.2.3.16, RFD4.2.3.17, RFD4.2.3.18,
 * RFD4.2.3.19, RFD4.2.3.20, RFO7.7RFO30, RFO30.2, RFO30.2.1, RFO30.2.2,
 * RFO30.2.3
 * @memberof Front-End::Model
 */

'use strict';
function NodeContent(id,content,x,y,height,width,type){
    this._id = id;
    this.content = content;
    this._x = x;
    this._y = y;
    this._height = height;
    this._width = width;
    this._type = type;
}
/**
 * @function getId
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>id</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getId = function (){
    return this._id;
};
/**
 * @function getContent
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>content</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getContent = function (){
    return this.content;
};
/**
 * @function getX
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>x</tt>.
 * @returns {Number}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getX = function (){
    return this._x*1;
};
/**
 * @function getY
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>Y</tt>.
 * @returns {Number}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getY = function (){
    return this._y*1;
};
/**
 * @function getHeight
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>height</tt>.
 * @returns {Number}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getHeight = function (){

    return this._height*1;
};
/**
 * @function getWidth
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>width</tt>.
 * @returns {Number}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getWidth = function (){
    return this._width*1;
};
/**
 * @function getType
 * @instance
 * @desc Metodo che restituisce il valore dell'attributo <tt>type</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getType = function (){
    return this._type;
};
/**
 * @function setX
 * @instance
 * @desc Metodo che imposta il valore del campo dati <tt>x</tt>.
 * @param {Number} x - Parametro che rappresenta il valore da assegnare.
 * @returns {void}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.setX = function (x){
    this._x = x;
};
/**
 * @function setY
 * @instance
 * @desc Metodo che imposta il valore del campo dati <tt>y</tt>.
 * @param {Number} y - Parametro che rappresenta il valore da assegnare.
 * @returns {void}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.setY = function (y){
    this._y = y;
};
/**
 * @function setHeight
 * @instance
 * @desc Metodo che imposta il valore del campo dati <tt>height</tt>.
 * @param {Number} h - Parametro che rappresenta il valore da assegnare.
 * @returns {void}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.setHeight = function (h){
    this._height=h;
};
/**
 * @function setWidth
 * @instance
 * @desc Metodo che imposta il valore del campo dati <tt>width</tt>.
 * @param {Number} w - Parametro che rappresenta il valore da assegnare.
 * @returns {void}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.setWidth = function (w){
    this._width=w;
};
/**
 * @function setContent
 * @instance
 * @desc Metodo che imposta il valore del campo dati <tt>content</tt>.
 * @param {String} content - Parametro che rappresenta il valore da assegnare.
 * @returns {void}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.setContent = function (content){
    this.content = content;
};
/**
 * @function getStyle
 * @instance
 * @desc Metodo che restituisce un oggetto contenente le informazioni
 * riguardanti lo stile CSS del contenuto del nodo.
 * L'oggetto conterrà i seguenti campi dati: <tt>top</tt>, <tt>left</tt>,
 * <tt>width</tt>, <tt>height</tt> e
 * <tt>position</tt>.
 * @returns {Object}
 * @memberOf Front-End::Model.NodeContent
 */
NodeContent.prototype.getStyle = function (){
    var css={
        top: this._y+'%',
        left: this._x+'%',
        width: 'auto',
        height:'auto',
        position: 'absolute'
    };
    if (this._width > 0) {
        css.width = this._width + '%';
    }
    if (this._height > 0) {
        css.height = this._height + '%';
    }
    return css;
};
