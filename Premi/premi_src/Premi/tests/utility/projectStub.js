var
    path = require('path'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    User = mongoose.model('User'),
    NodeContent = require(path.resolve('./app/models/NodeContentModel')),
    Node = require(path.resolve('./app/models/NodeModel')),
    Path = require(path.resolve('./app/models/PathModel')),
    Project = mongoose.model('Project');

var contents =
    [
        {
            class: 'title',
            width: 0,
            height: 0,
            y: 5.8,
            x: 28,
            content: 'Nuovo nodo'
        },
        {
            class: 'text',
            width: 0,
            height: 0,
            y: 5.8,
            x: 28,
            content: 'text text text'
        },
        {
            class: 'imgUrl',
            width: 0,
            height: 0,
            y: 5.8,
            x: 28,
            content: 'http://fakeurl.com'
        }
    ];

exports.contents = contents;

//nodo stub
var node;
Node.createNode(
    function(json)
    {
        node = json;
    }
);
exports.node = node;

//percorso stub
var path;
Path.createPath(
    'test path',
    false,
    function(rPath)
    {
        path = rPath;
    }
);

exports.path = path;

//user stub
var user;
user = new User(
    {
        username: 'test@test.com',
        password: 'password'
    }
);

exports.user = user;

//project stub
var project;
Project.createProject(
    'test project',
    user.id,
    function (json) {
        project = json;
        exports.project = project;
    },
    function(error)
    {
        console.error(error);
    }
);
