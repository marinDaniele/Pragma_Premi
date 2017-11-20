/**
 * @class Node
 * @classdesc Rappresenta un nodo della mappa mentale. Contiene tutte le
 * informazioni necessarie alla presentazione del contenuto del nodo.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO4, RFO4.2, RFO4.2.3, RFO4.2.3.1,
 * RFO4.2.3.4, RFO4.2.3.5, RFO4.2.3.5.2, RFO4.2.3.5.1, RFO4.2.3.7,
 * RFO5, RFD6, RFD22, RFO4.2.3.2, RFD4.2.3.15, RFD4.2.3.16, RFD4.2.3.17,
 * RFD4.2.3.18, RFD4.2.3.19, RFD4.2.3.20, RFO7.7
 * @memberof Front-End::Model
 */

'use strict';
function Node(id,contents){
    this._id = id;
    this._nextContentId = 0;
    this._titleId = 0;
    this.contents = {};
    //Array associativo, ha come nome un chiavi l'id del nodeContent
    /*Un NodeContent può essere costruito sia a parite da un'array di oggetti
    definiti con del JSON sia a partire da un array di nodeContents*/
    for (var i=0; i < contents.length; i++){
        var nc;
        if (contents[i] instanceof NodeContent){
            nc = new NodeContent(this._nextContentId,
                contents[i].getContent(),
                contents[i].getX(),
                contents[i].getY(),
                contents[i].getHeight(),
                contents[i].getWidth(),
                contents[i].getType());
        }else{
            nc = new NodeContent(this._nextContentId,
                contents[i].content,
                contents[i].x,
                contents[i].y,
                contents[i].height,
                contents[i].width,
                contents[i].class);
        }
        this.contents[this._nextContentId+''] = nc;

        if (nc.getType() === 'title'){
            this._titleId = nc.getId();
        }
        this._nextContentId++;
    }
}

/**
 * @function getId
 * @instance
 * @desc Metodo che ritorna l'<tt>id</tt> del nodo.
 * @returns {String}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.getId = function (){
    return this._id;
};

/**
 * @function getContents
 * @instance
 * @desc Metodo che restituisce tutti gli oggetti <tt>NodeContent</tt>
 * contenuti nel nodo.
 * @returns {Array}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.getContents = function (){
    var obj = this.contents;
    return Object.keys(obj).map(function (key) {
        return obj[key];
    }); //converto l'oggetto in un'array
};

/**
 * @function getTitle
 * @instance
 * @desc Metodo che, uttilizza il campo dati <tt>titleId</tt> per recuperare
 * dall'array <tt>contents</tt>, restituisce una stringa contenente il titolo
 * del nodo.
 * @returns {String}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.getTitle = function (){
    return this.contents[this._titleId].getContent();
};

/**
 * @function getContent
 * @instance
 * @desc Metodo che ritorna l'oggetto di <tt>NodeContent</tt> presente
 * all'interno del nodo avente <tt>id</tt> uguale a quello ricevuto come
 * parametro.
 * @param {String} contentId - Parametro che rappresenta l'<tt>id</tt>
 * dell'oggetto richiesto.
 * @returns {NodeContent}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.getContent = function (contentId){
    return this.contents[contentId];
};

/**
 * @function addImage
 * @instance
 * @desc Metodo che aggiunge ai contenuti del nodo un'immagine utilizzando dei
 * dati di default. Viene ritornato un riferimento all'oggetto creato.
 * @returns {NodeContent}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.addImage = function (){
    var nc = new NodeContent(this._nextContentId,'http://pragmaswe.altervist' +
        'a.org/build/pragmaLogo.png',30,30,20.53,25.38,'imgUrl');
    this.contents[this._nextContentId] = nc;
    this._nextContentId++;
};
/**
 * @function addText
 * @instance
 * @desc Metodo che aggiunge ai contenuti del nodo un elemento testuale
 * utilizzando dei dati di default. Viene ritornato un riferimento all'oggetto
 * creato.
 * @returns {NodeContent}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.addText = function (){
    var nc = new NodeContent(this._nextContentId,'Elemento ' +
        'testuale',30,30,0,0,'text');
    this.contents[this._nextContentId] = nc;
    this._nextContentId++;
};
/**
 * @function removeContent
 * @instance
 * @desc Metodo che rimuove dalla collezione <tt>content</tt> l'elemento avente
 * <tt>id</tt> uguale a <tt>contentId</tt>.
 * @param {String} contentId - Parametro che rappresenta l'<tt>id</tt>
 * dell'oggetto <tt>NodeContent</tt> da rimuovere.
 * @returns {void}
 * @memberOf Front-End::Model.Node
 */
Node.prototype.removeContent = function (contentId){
    delete this.contents[contentId];
};
