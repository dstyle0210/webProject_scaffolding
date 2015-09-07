'use strict';
requirejs.config({
    "baseUrl": "asset/js/lib",
    "paths": {
    	"app": "../app",
    	 "jquery":"jquery.min",
    	 "bootstrap":"bootstrap.min",
    	 "angular":"angular"
    },
    shim : {
    	"jquery":{deps:["angular"]},
    	"angular": {exports: "angular"},
        "bootstrap" : { deps :['jquery'] }
    }
});
/*requirejs(["jquery","bootstrap"], function($){
});*/
requirejs(["angular","app/jsonLoad"], function(angular,jsonLoad){
	var dataFn = new jsonLoad({
		url:"/data.json",
		app:"dataApp",
		controller:"customersCtrl"
	});
	dataFn.start();
});

requirejs(["jquery","app/jqLoad"], function($,jqLoad){
	jqLoad();
});


requirejs(["angular","jquery","app/jqLoad"], function(ng,$,jqLoad){
	$(function(){
		
	})
	
	ng.module();
});