/**
 * @class Path
 * @classdesc Rappresenta un percorso di presentazione costituito da una
 * sequenza ordinata di passi.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFD4.4, RFD4.4.1, RFD4.4.3,
 * RFF4.6.2, RFO5, RFD6, RFD4.7, RFD4.4.5
 * @memberof Front-End::Model
 */

'use strict';
function Path(id,name,steps,isDefault){
    this._id = id;
    this._name = name;
    this._steps = steps;
    this._default = isDefault;
}
/**
 * @function getId
 * @instance
 * @desc Metodo che ritorna l'identificativo del percorso.
 * @returns {String}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.getId = function (){
    return this._id;
};
/**
 * @function getName
 * @instance
 * @desc Metodo che restituisce il nome del percorso di presentazione.
 * @returns {String}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.getName = function (){
    return this._name;
};
/**
 * @function getSteps
 * @instance
 * @desc Metodo che restituisce la successione dei passi del percorso di
 * presentazione.
 * @returns {Array}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.getSteps = function (){
    return this._steps;
};
/**
 * @function setName
 * @instance
 * @desc Metodo che imposta il nome del percorso di presentazione con il valore
 * del parametro <tt>name</tt>.
 * @param {String} name - Parametro che rappresenta il nuovo nome da associare
 * al percorso di presentazione.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.setName = function (name){
    this._name = name;
};
/**
 * @function addStep
 * @instance
 * @desc Metodo che inserisce il passo di presentazione, formato dai valori dei
 * parametri <tt>id</tt> e <tt>title</tt>, rispettivamente, in coda alla
 * successione dei passi del percorso di presentazione.
 * @param {String} id - Parametro che rappresenta l'identificativo del nodo da
 * associare al nuovo passo di percorso di presentazione.
 * @param {String} title - Parametro che rappresenta il titolo del passo di
 * percorso di presentazione da aggiungere.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.addStep = function (id, title){
    this._steps.push(new NodeReference(id, title));
};
/**
 * @function deleteStep
 * @instance
 * @desc Metodo che rimuove l'ultimo passo del percorso di presentazione con id
 * pari al valore del parametro <tt>id</tt> e restituisce <tt>true</tt> se e
 * solo se avviene tale rimozione.
 * @param {String} nodeId - Parametro che rappresenta l'identificativo del nodo
 * associato al passo di percorso di presentazione da rimuovere.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.deleteStep = function (nodeId){
    for(var i=0;i<this._steps.length;i++){
        if (this._steps[i].getId() === nodeId){
            this._steps.splice(i,1);
            return true;
        }
    }
    return false;
};
/**
 * @function isDefault
 * @instance
 * @desc Metodo <i>getter</i> per il campo dati <tt>default</tt>.
 * @returns {Boolean}
 * @memberOf Front-End::Model.Path
 */
Path.prototype.isDefault = function (){
    return this._default;
};
