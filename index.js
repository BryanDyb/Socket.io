var express = require('express');
var app = express();
var server = app.listen(4000, "0.0.0.0", function(){
    console.log('Servidor corriendo en http://0.0.0.0:4000');
});

app.use(express.static('public'));

// habilitar socket.io con CORS
var socketIO = require('socket.io');
var io = socketIO(server, {
    cors: {
        origin: "*",         // 🔹 en producción cambia "*" por tu dominio o IP pública
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket){
    console.log('Hay una conexion', socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
