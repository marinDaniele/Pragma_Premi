/**
 * File: updateNode.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-08
 * Descrizione: Test di integrazione TI3 Premi::Front-End::Services::MindmapService metodo "updateNode"
 */
'use strict';
describe('TI3 Premi::Front-End::Services::MindmapService metodo "updateNode"', function () {
	var mindmapService, projectService, mindmapAdapterService, SERVER_URL, $httpBackend, $http, $rootScope, method, url,
	projectId = "project0", parentNodeId = "node0",
	node1 = {
		_id : 'node1', 
		contents : [{
			content : 'node1', 
			x : 7, 
			y : 4, 
			height : '10px', 
			width : '10px', 
			_type : 'title',
			getContent: function(){ return this.content; },
			getX: function(){ return this._x*1; },
			getY: function(){ return this._y*1; },
			getHeight: function(){ return this._height*1; },
			getWidth: function(){ return this._width*1; },
			getType: function(){ return this._type; }
		}],
		getContents: function(){
			var obj = this.contents;
    		return Object.keys(obj).map(function (key) {return obj[key];});
		},
		getId: function(){
		    return this._id;
		},
		getTitle: function(){
			return this.contents[0].getContent();
		}
	},
	data = {"contents":[{"content":"node1","x":"NaN","y":"NaN","height":"NaN","width":"NaN","class":"title"}]};

	beforeEach(function(){
		module('premi.services');
		module(function($provide){
			$provide.constant('SERVER_URL', 'http://localhost:3000');
			$provide.factory('projectService', function(){
				return{
					getId: jasmine.createSpy('getId').and.returnValue(projectId)
				};
			});
		});
		inject(function(_projectService_, _mindmapAdapterService_, _mindmapService_, _SERVER_URL_, _$httpBackend_, _$http_, _$rootScope_){
			mindmapAdapterService = _mindmapAdapterService_;
			projectService = _projectService_;
			mindmapService = _mindmapService_;
			SERVER_URL = _SERVER_URL_;
			$httpBackend = _$httpBackend_;
			$http = _$http_;
			$rootScope = _$rootScope_;
			method = 'PUT';
			url = "http://localhost:3000/projects/project0/nodes/node1";
			$httpBackend.when(method, url, data)
				.respond(node1);
		});
		spyOn(window, 'NodeContent').and.callFake(function NodeContent(id,content,x,y,height,width,type){
		    console.log("costruzione NodeContent " + id + " " + content + " " + x + " " + y + " " + height + " " + width + " " + type + " ");
		    this._id = id;
		    this.content = content;
		    this._x = x;
		    this._y = y;
		    this._height = height;
		    this._width = width;
		    this._type = type;
			this.getId = function (){
			    return this._id;
			};
			this.getContent = function (){
			    return this.content;
			};
			this.getX = function (){
			    return this._x*1;
			};
			this.getY = function (){
			    return this._y*1;
			};
			this.getHeight = function (){

			    return this._height*1;
			};
			this.getWidth = function (){
			    return this._width*1;
			};
			this.getType = function (){
			    return this._type;
			};
			this.setX = function (x){
			    this._x = x;
			};
			this.setY = function (y){
			    this._y = y;
			};
			this.setHeight = function (h){
			    this._height=h;
			};
			this.setWidth = function (w){
			    this._width=w;
			};
			this.setContent = function (content){
			    this.content = content;
			};
			this.getStyle = function (){
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
			}
		});
		spyOn(window, 'Node').and.callFake(function(id,contents){
			console.log("costruzione nodo "+ id + " contents.length -> " +  contents.length);
		    this._id = id;
		    this._nextContentId = 0;
		    this._titleId = 0;
		    this.contents = {};
		    console.log("before contents insertion");
		    for (var i=0; i < contents.length; i++){
		        var nc;
		        if (contents[i] instanceof NodeContent){
		        	console.log("is NodeContent");
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
		    console.log("end contents insertion");
			this.getId = function (){
			    return this._id;
			};

			this.getContents = function (){
			    var obj = this.contents;
			    return Object.keys(obj).map(function (key) {
			        return obj[key];
			    });
			};

			this.getTitle = function (){
				return this.contents[this._titleId].getContent();
			};

			this.getContent = function (contentId){
			    return this.contents[contentId];
			};

			this.addImage = function (){
			    var nc = new NodeContent(this._nextContentId,'http://pragmaswe.altervist' +
			        'a.org/build/pragmaLogo.png',30,30,20.53,25.38,'imgUrl');
			    this.contents[this._nextContentId] = nc;
			    this._nextContentId++;
			};

			this.addText = function (){
			    var nc = new NodeContent(this._nextContentId,'Elemento ' +
			        'testuale',30,30,0,0,'text');
			    this.contents[this._nextContentId] = nc;
			    this._nextContentId++;
			};
			
			this.removeContent = function (contentId){
			    delete this.contents[contentId];
			};
		});
		spyOn(mindmapAdapterService, 'setNode').and.callThrough();
		//Caricamento mappa mentale
		mindmapAdapterService.loadMap([node1], [], node1._id);
		mindmapService.drawMap();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("Dovrebbe invocare il metodo projectService.getId", function(){
		mindmapService.updateNode(node1);
		$httpBackend.flush();
	    expect(projectService.getId).toHaveBeenCalled();
	});
	
	it("Dovrebbe invocare il metodo mindmapAdapterService.updateNode, passando come parametro node1", function(){
		mindmapService.updateNode(node1);
		$httpBackend.flush();
	    expect(mindmapAdapterService.setNode).toHaveBeenCalledWith(node1);
	});

	it("Dovrebbe inviare una richiesta al server", function(){
		mindmapService.updateNode(node1);
		$httpBackend.expect(method, url, data)
			.respond(node1);
		$httpBackend.flush();
	});

	it("Dovrebbe restituire l'oggetto response.data, nel caso la richiesta al server vada a buon fine", function(){
		var realOutput = mindmapService.updateNode(node1);
		var expectedOutput = $http({
				'method': method,
				'url': url,
				'data': data 
			})
	        .then(function(response){
	            return response.data;
	        });
		$httpBackend.flush();
		$rootScope.$digest();
		expect(realOutput).toEqual(expectedOutput);
	});
});