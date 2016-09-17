var http = require("http");
var fs = require('fs');
var listener = http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html,charset=utf8");
	var sendFileTime = new Date().toUTCString();
	res.setHeader("Date",sendFileTime);
	var date = new Date("2017/08/01").toUTCString();
	res.setHeader("Expires",date);
	res.setHeader("Cache-Control","private");
	res.setHeader("Set-Cookie","hh=auto type cookie;expires="+date+";");
	req.headers['Cookie'] = "hh";
	req.headers['Accept-Type'] = "text/html";
	var body;
	switch(true){
			case req.url == '/':
				fs.readFile('index.html',function(err,data){
					if(err){
						throw new Error("一个未知错误，请稍后尝试！");
						return;
					};
					body = data;
					res.setHeader("Content-Length",Buffer.byteLength(body));
					res.statusCode = 200;
					res.write(body);
					res.end();
				});
				break;
			case req.url == '/a.html':
			 	fs.readFile('a.html',function(err,data){
			 		if(err){
						throw new Error("一个未知错误，请稍后尝试！");
						return;
					};
					body = data;
					res.setHeader("Content-Length",Buffer.byteLength(body));
					res.statusCode = 200;
					res.write(body);
					res.end();
			 	});
			 	break;
			default:
				fs.readFile("404.html",function(err,data){
					if(err){
						throw new Error("一个未知错误，请稍后尝试！");
						return;
					};
					body = data;
					res.statusCode = 404;
					res.setHeader("Content-Length",Buffer.byteLength(body));
					res.write(body);
					res.end();
				})
			break;
	};
});
listener.listen(1500,function(){
	console.log("监听1500端口！");
})