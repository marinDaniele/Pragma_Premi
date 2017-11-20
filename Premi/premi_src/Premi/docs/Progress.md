/*NOTE PER LO SVILUPPO DI PREMI::BACK-END*/



------------------------DOING----------------
1-Divisione per classi (cartelle)
2-Divisione per TU (cartelle)
3-Ogni file contiene il test per un metodo (file)


Implementazione test:
    Models/
        -UserModelTest (Stefano)
        -NodeModelTest (Andrea)
        -NodeContentModelTest (Andrea)
        -PathModelTest (Andrea)
        -RelationModelTest (Stefano)
        -ProjectModelTest
    Premi/
        -ServerTest (Stefano)
    Errors/
        -PremiErrorTest
    Users/
        -AuthenticationControllerTest (Stefano)
        -AuthorizationControllerTest (Stefano)
    Projects/
        -NodeControllerTest
        -PathControllerTest
        -ProjectManagementControllerTest
    Controllers/
        -CoreControllerTest
        -ErrorHandlerTest
        -NotFoundHandlerTest
        -ProjectControllerTest
        -StaticControllerTest
        -UserControllerTest
    Routers/
        -CoreRouterTest
        -ProjectRouterTest
        -StaticRouterTest
        -UserRouterTest (Stefano)
    Views/
        ??-UserManualTest??



-------------------------TO DO-----------------------
Pulizia codice (Stefano,Andrea)
Pulizia pacchetti inutili(es. tutti gli strategy di passport per gli account social già rimossi a livello di codice,...)
Commentare codice secondo NdP
Uniformare stile codice secondo NdP

-------------------------DONE-------------------------
Autenticazione(UserModel,UserRouter,UserController,AuthorizationController,AuthenticationController,/config->passport.js)
Models (Andrea tutto, Stefano solo UserModel)
Routers (Stefano)
NodeController (Stefano)
ProjectManagementController (Stefano)
PathController (Andrea)
CoreController (Stefano)
StaticController (Stefano)
ErrorHandler (Stefano)
NotFoundHandler (Stefano)
PremiError (Stefano)
UserManual (Daniele - da inserire in views)





-------------------------DISCUTERE-------------------------
Q:i controlli su projectId che vengono fatti dentro a ProjectModel sono necessari?

S:intendo dire che projectId viene passato solo se il middleware projectById lo trova, quindi non dovrebbero
servire perchè la pre-condizione di ogni metodo di ProjectModel assume che projectId sia un _id valido esistente nel DB.

A: secondo me sì, sono in grado di fornire responsi sugli errori al controller, che può quindi evitare di farli
è pur sempre da discutere. Ovviamnete non ha senso che ProjectModel ti dica che il progetto esista o meno, lo controlla
il controller con projectById

DECISIONE: i controlli vengono effettuati sempre dai middleware, che possono ritornare errori nel caso si verifichino.
Come Pre-Condizione per i metodi di ProjectModel(facade) si ha che gli ._id passati dai middleware sono sempre ._id validi,
sono sempre gli ._id giusti che servono al model quindi non è necessario fare altri controlli nei metodi di ProjectModel.

Q: Guarda la nota in nodeById, suggerisco quei cambiamenti (vedesi pathById)

S: Ok, ho apportato le modifiche, ti ho lasciato qualche annotazione riguardante i branch.

Q: Suggerisco di uniformare tutti i middleware "ById" in modo che passino un istanza dell'oggetto trovato e non solo l'id,
ovviamente va un attimo modificato il codice dei metodi che li usano.

A: Può avere senso, sempre tenendo presente che però modifiche alle istanze di quegli oggetti non si ripercuotono nel db

Q: secondo me il workflow per la validazione dei dati ricevuti dovrebbe funzionare così:
    - errori del tipo 'id di nodo/progetto/percorso/associazione non valido o inesistente'
        nei parametri dell'URI gestiti nei middleware
    - errori di validazione dei dati ricevuti mediante JSON (es. req.body.XYZ === undefined) gestiti nei controller
    - errori di mongodb gestiti in ProjectModel
    - errori del tipo 'oggetto non trovato' in un oggetto della collezione subdocument gestiti dalla
        classe del subdocument
         NB: intendo che cercare ad esempio :pathId in un'istanza di ProjectModel va fatta nei middleware,
            cercare se un nodo è in un Path, va fatta in PathModel

S: ok
