'use strict';
/**
 * @class ProjectRouter
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @description Data: 13/05/2015 - Requisiti: RFO1, RFO1.1, RFO4, RFD4.1, RFO4.2, RFO4.2.2, RFO4.2.3, RFO4.2.3.4,
RFO4.2.3.5, RFO4.2.3.7, RFD4.2.3.8, RFD4.2.3.8.1,RFD4.2.3.8.2, RFO4.2.3.12, RFO4.2.3.13, RFO4.2.5, RFO4.2.6, RFO4.2.7,
RFD4.3.1, RFD4.3.2, RFD4.4, RFD4.4.1, RFD4.4.3,RFD4.5, RFF4.6, RFF4.6.1, RFF4.6.1.1, RFF4.6.1.2, RFF4.6.2, RFO7, RFD7.1,
RFO11, RFO11.2, RFD22, RFO10, RFD33, RFO11.3,RFD4.2.3.15, RFD4.2.3.16, RFD4.4.5, RFD35
 * @classdesc Classe che gestisce le richieste relative alle operazioni riguardanti la mappa.
 * @memberof Back-End::App::Routers
 */
/*---PUBLIC---*/
/**
 * @function ProjectRouter
 * @instance
 * @description Contiene diverse route che vengono configurate all'avvio del server.
 * Quest'ultime ricevono le richieste del client e passano il controllo al ConcreteHandler successivo.
 * @memberof Back-End::App::Routers.UserRouter
 * @param {Server} app - Rappresenta l'istanza del server su cui configurare i route che mappano i controllers specifici.
 */
module.exports = function (app)
{
    var projects = require('../controllers/ProjectController');
    var users = require('../controllers/UserController');

//Project API
    //->ProjectManagementController
    app.route('/projects').post(users.requiresLogin,projects.addProject);
    app.route('/projects').get(users.requiresLogin, projects.getAllProjects);
    app.route('/projects/:projectId').get(users.requiresLogin, projects.getProject);
    app.route('/projects/:projectId').put(users.requiresLogin, projects.updateProject);
    app.route('/projects/:projectId').delete(users.requiresLogin, projects.deleteProject);
    app.route('/projects/:projectId/presentations').get(users.requiresLogin, projects.getPresentation);
    app.route('/projects/:projectId/paths').get(users.requiresLogin, projects.getAllPaths);

    //->NodeController
    app.route('/projects/:projectId/nodes/:nodeId').post(users.requiresLogin,projects.addNode);
    app.route('/projects/:projectId/nodes/:nodeId').put(users.requiresLogin, projects.updateNode);
    app.route('/projects/:projectId/nodes/:nodeId').delete(users.requiresLogin, projects.deleteNode);
    //->NodeController->Association
    app.route('/projects/:projectId/associations').post(users.requiresLogin, projects.addAssociation);
    app.route('/projects/:projectId/associations/:associationId').delete(users.requiresLogin,
    projects.deleteAssociation);

    //-> PathController
    app.route('/projects/:projectId/paths').post(users.requiresLogin, projects.addPath);
    app.route('/projects/:projectId/paths/:pathId/:nodeId').post(users.requiresLogin, projects.addNodeToPath);
    app.route('/projects/:projectId/paths/:pathId').get(users.requiresLogin, projects.getPath);
    app.route('/projects/:projectId/paths/:pathId').put(users.requiresLogin, projects.updatePath);
    app.route('/projects/:projectId/paths/:pathId').delete(users.requiresLogin, projects.deletePath);
    app.route('/projects/:projectId/paths/:pathId/:nodeId').delete(users.requiresLogin, projects.deleteNodeFromPath);

    //Middlewares on parameter
    app.param('projectId', projects.projectById);
    app.param('nodeId',projects.nodeById);
    app.param('pathId',projects.pathById);
    app.param('associationId',projects.associationById);
};

