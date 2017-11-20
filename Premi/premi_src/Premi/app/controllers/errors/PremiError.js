'use strict';
/**
 * @namespace Back-End::App::Controllers::Errors
 */
/**
 * @class PremiError
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 17/05/2015 - Requisiti: RFO30.3, RFO30.4, RFD33, RFD35
 * @classdesc Classe di gestione degli errori. Esegue la costruzione del messaggio d’errore specifico per i moduli di
 * Premi::App
 * @memberof Back-End::App::Controllers::Errors
 */
/*---PRIVATE---*/
/*
    Divisi per moduli:
    1xxx: errori di autenticazione e userById
    2xxx: errori middleware projectById
    3xxx: errori middleware nodeById
    6xxx: errori middleware associationById
    7xxx: errori middleware pathById
    8xxx: errori ProjectManagementController
    9xxx: errori NodeController
    10xxx: errori PathController
    11xxx: errori ProjectModel
    12xxx: errori PathModel
 */
var errorCodes =
    {
        1000 : ['Utente non trovato', 'L\'identificativo utente fornito non è un identificativo valido'],

        1002 : ['Credenziali non valide', 'È neccessario fornire un\'indirizzo email ed una password valide'],

        2000 : ['Progetto non trovato', 'L\'identificativo del progetto fornito non è un identificativo valido'],

        3000 : ['Nodo non trovato', 'L\'identificativo del nodo fornito non è un identificativo valido'],

        6000 : ['Associazione non trovata', 'L\'identificativo dell\'associazione fornita non è un identificativo valido'],

        7000 : ['Percorso non trovato', 'L\'identificativo del percorso fornito non è un identificativo valido'],

        8000 : ['Progetto corrotto', 'Errore nella ricerca dei campi dati relativi al progetto indicato'],

        8001 : ['Dati non validi', 'I dati relativi al progetto sono vuoti o errati'],

        8002 : ['Progetto corrotto', 'Errore durante l\'eliminazione del progetto'],

        9000 : ['Dati non validi', 'I dati relativi al contenuto del nodo non sono validi o sono formattati in modo errato'],

        9001 : ['Nodi non validi', 'Gli identificativi dei nodi forniti non sono validi oppure non esistono oppure il nodo entrante coincide con il nodo uscente'],

        10000 : ['Dati non validi', 'I dati per la modifica del percorso non sono definiti'],

        11001 : ['Nodo del progetto non trovato', 'Il nodo riferito nella relazione o nel percorso non è stato trovato all\'interno del progetto indicato'],

        11002 : ['Nodo padre non esistente', 'Il nodo padre indicato non esiste o non corrisponde ad un nodo valido'],

        11003 : ['Nodo non valido', 'Impossibile eliminare il nodo radice della mappa mentale'],

        12000 : ['Nodo del percorso non trovato', 'Il nodo riferito non è stato trovato all\'interno del percorso indicato']
    };
/*---PUBLIC---*/
/**
 * @function PremiError
 * @description Costruttore della classe PremiError.
 * @instance
 * @memberof Back-End::App::Controllers::Errors.PremiError
 * @param {Number} error - Rappresenta il codice identificativo dell'errore.
 */
var PremiError =
    function (error)
    {
        var err;
        if(error === parseInt(error)) //ricevo un intero
        {
            this.code = error;
            //il codice non è definito in PremiError
            if (errorCodes[error] === undefined)
            {
                console.error('PremiError received an unknown error code:', error);
                this.title = 'Errore sconosciuto';
                this.message = 'Codice sconosciuto: '+error;
            }
            else
            {
                err = errorCodes[error];
                this.title = err[0];
                this.message = err[1];
            }
        }
        else //PremiError non ha ricevuto un intero
        {
            console.error('PremiError received an invalid argument:', error);
            if(error.message !== undefined)
                error= error.message;
            this.code = 0;
            this.title = 'Errore sconosciuto';
            this.message = error;
        }
    };

/**
 * @function toJSON
 * @description Questo metodo ritorna l'errore in formato JSON.
 * @instance
 * @memberof Back-End::App::Controllers::Errors.PremiError
 * @returns {JSON} json - Rappresenta l'errore formattato in JSON.
 */
PremiError.prototype.toJSON =
    function ()
    {
        var json =
            {
                title : this.title,
                code : this.code,
                message : this.message
            };
        return json;
    };

/**
 * @function toString
 * @description Effettua una concatenazione dei campi dati dell'errore e li ritorna in formato String.
 * @instance
 * @memberof Back-End::App::Controllers::Errors.PremiError
 * @returns {String} str - Rappresenta l'errore formattato come stringa.
 */
PremiError.prototype.toString =
    function ()
    {
        var str = 'PremiError:';
        str +=  ' ' + this.title;
        str += ' [' + this.code + ']';
        str += ' [' + this.message + ']';
        return str;
    };

module.exports = PremiError;
