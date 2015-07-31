var url = "http://localhost:8089/casper.html";
var links = [];
var newLinks = [];

function getLinks() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
    	return e.getAttribute('href');
    });
};
var idx = 0;
casper.start(url,function(){
	this.echo("connect by "+url);
	links = this.evaluate(getLinks);
	this.echo("get links by "+url);
	for(i=0;i<links.length;i++){
		if((links[i])!=""){
			var t = (links[i]).indexOf("javascript");
			if(t=="-1"){
				if((links[i]).indexOf("#")!=0 && (links[i]).indexOf("http")!=0 && (links[i]).indexOf("mailto")!=0){
					newLinks.push(links[i]);
				}
			};
		};
	};
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
    	// this.download(link, 'scrap/localhost.html');
    });
});

/*casper.start('http://localhost:8081', function() {
    var url = 'http://localhost:8081';
    this.download(url, 'scrap/localhost.html');
});*/

casper.run(function() {
	this.echo(newLinks.length + ' links found:').exit();
});