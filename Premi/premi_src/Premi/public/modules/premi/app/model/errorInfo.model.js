'use strict';
/**
 * @namespace Front-End::Model
 * @desc Package contenente i controller della componente front-end
 * dell’applicazione.
 */

/**
 * @class ErrorInfo
 * @classdesc Rappresenta le informazioni di un errore che si è verificato
 * eseguendo una determinata operazione.
 * @author: Massimiliano Baruffato (max.baruffato@gmail.com)
 * @description Data: 2015-05-11 Requisiti: RFO30.3, RFO30.4, RFD33, RFD35
 * @memberof Front-End::Model
 */
//"errorCode", "errorMessage", "errorTitle"
function ErrorInfo(title,message,code){
    this.errorTitle = title;
    this.errorMessage = message;
    this.errorCode = code;
}
/**
 * @function getTitle
 * @instance
 * @desc Metodo <i>getter</i> per il campo dati <tt>errorTitle</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.ErrorInfo
 */
ErrorInfo.prototype.getTitle = function (){
    return this.errorTitle;
};
/**
 * @function getMessage
 * @instance
 * @desc Metodo <i>getter</i> per il campo dati <tt>errorMessage</tt>.
 * @returns {String}
 * @memberOf Front-End::Model.ErrorInfo
 */
ErrorInfo.prototype.getMessage = function (){
    return this.errorMessage;
};
/**
 * @function getCode
 * @instance
 * @desc Metodo <i>getter</i> per il campo dati <tt>errorCode</tt>.
 * @returns {Number}
 * @memberOf Front-End::Model.ErrorInfo
 */
ErrorInfo.prototype.getCode = function (){
    return this.errorCode;
};
