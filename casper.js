// var casper = require('casper').create();
var _ = require('underscore');

var url = "http://localhost:8089/casper.html";
var links = [];
var newLinks = [];
var exceptWords = ["javascript","inc/","#","http","mailto"]; // 제외할 기준.

function getLinks() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
    	return e.getAttribute('href');
    });
};

casper.start(url,function(){
	Casper = this;
	Casper.echo("connect by "+url);
	
	links = Casper.evaluate(getLinks);
	Casper.echo("get Links");
	
	newLinks = _.filter(links,function(urlStr){
		return _.every(exceptWords,function(word){
			// Casper.echo(urlStr+":"+word+"="+(urlStr.indexOf(word)<0));
			return (urlStr.indexOf(word)<0)
		});
	});
	this.echo("get link sort OK");
});

casper.then(function() {
   this.each(newLinks, function(self,link) {
    	self.thenOpen(link, function() {
    		this.echo("link connect by "+ link);
    		var src = (link).split(".jsp")[0];
    		this.echo("- download : "+src+".html \n");
            this.download(link, "dist/"+src+".html");
        });
    });
});

casper.run(function() {
	this.echo(newLinks.length + ' links found:').exit();
});