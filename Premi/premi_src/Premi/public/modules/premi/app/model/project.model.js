/**
 * @class Project
 * @classdesc Rappresenta un progetto creato dall’utente. Contiene le
 * informazioni riguardanti i parametri globali del progetto: nome, formato
 * del testo, colore di sfondo.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFD4.1, RFF4.6, RFF4.6.1,
 * RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFO5, RFD6
 * @memberof Front-End::Model
 */

'use strict';
function Project(id, name, backgroundColor, fontFamily, textColor, rootId){
    this._id = id;
    this._name = name;
    this._backgroundColor = backgroundColor;
    this._fontFamily = fontFamily;
    this._textColor = textColor;
    this._rootId = rootId;
}
/**
 * @function getRootId
 * @instance
 * @desc Metodo che ritorna l'identificativo del nodo radice della mappa
 * mentale associata al progetto.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getRootId= function (){
    return this._rootId;
};
/**
 * @function getId
 * @instance
 * @desc Metodo che restituisce l'identificativo associato al progetto, se
 * quest'ultimo esiste, altrimenti restituisce <tt>null</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getId = function (){
    return this._id;
};
/**
 * @function getName
 * @instance
 * @desc Metodo che restituisce il nome associato al progetto, se quest'ultimo
 * esiste, altrimenti restituisce <tt>null</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getName = function (){
    return this._name;
};
/**
 * @function getBackgroundColor
 * @instance
 * @desc Metodo che restituisce il nome del colore di sfondo associato al
 * progetto, se quest'ultimo esiste, altrimenti restituisce <tt>null</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getBackgroundColor = function (){
    return this._backgroundColor;
};
/**
 * @function getFontFamily
 * @instance
 * @desc Metodo che restituisce il nome della famiglia di font associato al
 * progetto, se quest'ultimo esiste, altrimenti restituisce <tt>null</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getFontFamily = function (){
    return this._fontFamily;
};
/**
 * @function getTextColor
 * @instance
 * @desc Metodo che restituisce il nome del colore del testo associato al
 * progetto, se quest'ultimo esiste, altrimenti restituisce <tt>null</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.getTextColor = function (){
    return this._textColor;
};
/**
 * @function setName
 * @instance
 * @desc Metodo che, se esiste un'istanza di progetto, sostituisce il nome
 * associato a tale istanza con il valore del parametro <tt>name</tt> e
 * restituisce <tt>true</tt>, altrimenti <tt>false</tt>.
 * @param {String} name - Parametro che rappresenta il nome da sostituire a
 * quello attuale del progetto esistente.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.setName = function (name){
    this._name = name;
};
/**
 * @function setBackgroundColor
 * @instance
 * @desc Metodo che, se esiste un'istanza di progetto, sostituisce il colore
 * di sfondo associato a tale istanza con il valore del parametro
 * <tt>backgroundColor</tt> e restituisce <tt>true</tt>, altrimenti
 * <tt>false</tt>.
 * @param {String} backgroundColor - Parametro che rappresenta il colore di
 * sfondo da sostituire a quello attuale del progetto esistente.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.setBackgroundColor = function (backgroundColor){
    this._backgroundColor = backgroundColor;
};
/**
 * @function setFontFamily
 * @instance
 * @desc Metodo che, se esiste un'istanza di progetto, sostituisce la
 * famiglia del font associato a tale istanza con il valore del parametro
 * <tt>fontFamily</tt> e restituisce <tt>true</tt>, altrimenti <tt>false</tt>.
 * @param {String} fontFamily - Parametro che rappresenta la famiglia di font
 * da sostituire a quella attuale del progetto esistente.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.setFontFamily = function (fontFamily){
    this._fontFamily = fontFamily;
};
/**
 * @function setTextColor
 * @instance
 * @desc Metodo che, se esiste un'istanza di progetto, sostituisce il colore
 * del testo associato a tale istanza con il valore del parametro
 * <tt>textColor</tt> e restituisce <tt>true</tt>, altrimenti <tt>false</tt>.
 * @param {String} textColor - Parametro che rappresenta il colore del testo
 * da sostituire a quello attuale del progetto esistente.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Project
 */
Project.prototype.setTextColor = function (textColor){
    this._textColor = textColor;
};
