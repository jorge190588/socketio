var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/cliente', function (req, res) {
    res.sendFile(__dirname + '/cliente.html');
  });
var users= 0;

io.on('connection', function (socket) {
    console.log('connection event is execute');
    socket.emit('news', { hello: 'umg', id:users+1 });
    socket.on('emitToServer', function (data) {
        
        console.log(data);
    });
});