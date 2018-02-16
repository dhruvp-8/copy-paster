var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var server = require('http').createServer(app)

var port = process.env.PORT || 3000;

connections = []

var socketServer = require('http').createServer(app)
var io = require('socket.io').listen(socketServer)

socketServer.listen(3002, function(){
	console.log('Socket Server listening on: 3002')
})

app.use(morgan('dev'));
app.use(express.static(__dirname + '/'));

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});


io.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
	

	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length)

		io.sockets.emit('show connections', { connections: connections.length });
	});

	socket.on('content', function(data){
		io.sockets.emit('copied text', { ctext : data })
	});

	io.sockets.emit('show connections', { connections: connections.length });
});


server.listen(port, function(){
    console.log('Server running at port ' + port);
});