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

var users= {};

io.on('connection', function (socket) {
    console.log('connection ');
    //socket.emit('news', { hello: 'umg' });
    socket.on('sendUser', function(data) {
        users[data.user]={};
        console.log("username",data.user);
        console.log("users",users);
    })

    socket.on("disconnectUser",function(data){
        delete users[data.user];
        console.log("users",users);
    })

    socket.on('emitToServer', function (data) {    
        console.log(data);
    });

    socket.on('disconnect', function(event){
        console.log(" disconnected.",event);
        //delete users[data.user];
        
        //io.sockets.emit("liveusers",Object.keys(onlineUsers));
  });

});