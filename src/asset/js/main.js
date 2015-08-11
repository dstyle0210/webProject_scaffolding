requirejs.config({
    "baseUrl": "asset/js/lib",
    "paths": {
    	"app": "../app",
    	 "jquery":"jquery.min",
    	 "bootstrap":"bootstrap.min",
    	 "angular":"angular"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    }
});
requirejs(["jquery","bootstrap"], function($){
	// 드랍다운 UI컴포넌트 적용.
	$(".data-toggle").dropdown();
});
