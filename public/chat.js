var socket = io.connect('http://18.219.84.6:4000');
var persona = document.getElementById('persona');
var appChat = document.getElementById('app-chat');
var panelBienvenida = document.getElementById('panel-bienvenida');
var usuario = document.getElementById('usuario');
var mensaje = document.getElementById('mensaje');
var botonEnviar = document.getElementById('enviar');
var escribiendoMensaje = document.getElementById('escribiendo-mensaje');
var output = document.getElementById('output');

// Enviar mensaje
botonEnviar.addEventListener('click', function () {
  if (mensaje.value) {
    socket.emit('chat', {
      mensaje: mensaje.value,
      usuario: usuario.value
    });
  }
  mensaje.value = '';
});

// Avisar cuando se escribe
mensaje.addEventListener('keyup', function () {
  if (usuario.value) {
    socket.emit('typing', {
      nombre: usuario.value,
      texto: mensaje.value
    });
  }
});

// Recibir mensaje del servidor
socket.on('chat', function (data) {
  escribiendoMensaje.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.usuario + ':</strong> ' + data.mensaje + '</p>';
});

// Recibir aviso de que alguien está escribiendo
socket.on('typing', function (data) {
  if (data.texto) {
    escribiendoMensaje.innerHTML = '<p><em>' + data.nombre + ' está escribiendo un mensaje...</em></p>';
  } else {
    escribiendoMensaje.innerHTML = '';
  }
});

// Función para ingresar al chat
function ingresarAlChat() {
  if (persona.value) {
    panelBienvenida.style.display = "none";
    appChat.style.display = "block";
    var nombreDeUsuario = persona.value;
    usuario.value = nombreDeUsuario;
    usuario.readOnly = true;
  }
}
