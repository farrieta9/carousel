'use strict';

let http = require('http');
let path = require('path');
let fs = require('fs');

var mimeTypes = { // multi media extensions
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

function requestListener(request, response) {
    let lookup = (request.url === '/') ? '/index.html' : decodeURI(request.url);
    let file = lookup.substring(1, lookup.length);

    console.log("Want to send this file", file);
	console.log('request: ' + request.url);

    fs.exists(file, function(exists) {
		if (exists) {
			console.log('Trying to send: ' + lookup);
			fs.readFile(file, function(error, data) { // async

				if (error) {
					response.writeHead(500);
					response.end('Server Error!');
				} else {
					// Successful request
					let headers = { 'Content-type': mimeTypes[path.extname(lookup)] };
					response.writeHead(200, headers);
					
					response.end(data); // data is the html
				}
			});
		} else {
			console.log('Failed to find/send: ' + lookup);
			response.writeHead(404);
			response.end();
		}
	});
}

http.createServer(requestListener).listen(3000, function() {
    console.log('Server is listening on port 3000');
})
