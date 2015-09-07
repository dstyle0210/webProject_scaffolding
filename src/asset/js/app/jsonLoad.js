define(["angular"],function(ng){
	function jsonLoadClass(opt){
		// 프로터피 설정.
		// this.o.url : 데이터를 가져올 URL
		// this.o.controller : 데이터바인딩할 연결 컨트롤러
		// this.o.app : 앵귤러 APP root
		// this.o.domain : 사이트 기본 도메인
		this.o = opt;
		this.o.domain = "http://dwww.publiceshop.com";
		this.o.mod = ng.module(this.o.app,[]);
	};
	// 데이터 정제
	// data.link {String} 링크경로
	// data.fileName {String} 이미지파일 경로
	jsonLoadClass.prototype.cleansing = function(data){
		var This = this;
		var domain = This.o.domain;
		ng.forEach(data,function(item,idx){
			item.link = domain+"/goods/selectGoodsDetail.do?prdId="+item.untId;
			item.fileName = domain+"/share/product"+item.fileName;
		});
		return data;
	};
	jsonLoadClass.prototype.start = function(){
		var This = this;
		var url = this.o.url;
		var app = this.o.mod;
		var control = this.o.controller;
		app.controller(control, function($scope, $http) {
		    $http.get(url).success(function (response) {
		    	$scope.cells = This.cleansing(response.prdList);
		    });
		});
	};
	return jsonLoadClass;
});