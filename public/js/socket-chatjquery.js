var params = new URLSearchParams(window.location.search);

var usuario = {
    name: params.get('name'),
    sala: params.get('sala')
};



//referencias jquery



var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var divChatbox = $("#divChatbox");

//Funciones para renderizar ususarios 



function renderizarUsuarios(personas) {

    var dataObj = JSON.parse(JSON.stringify(personas));


    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + ' </span></a>';
    html += '</li>';

    if (!dataObj.id) {
        console.log('No llego id');
    } else {
        for (var i = 0; i < dataObj.length; i++)

            html += '<li>';
        html += '<a data-id="' + dataObj[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + dataObj[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';


        divUsuarios.html(html);
    }

}
//renderizarMensajes
function renderizarMensajes(mensaje, yo) {




    var html = '';

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';

    if (mensaje.name === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.name + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.name !== 'Administrador') {
            html += ' <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.name + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += ' </div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }


    divChatbox.append(html);


}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners 

divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }


});


formEnviar.on('submit', function(e) {
    e.preventDefault();


    if (!txtMensaje.val().trim().length === 0) {
        return;
    }
    // Enviar información
    socket.emit('crearMensaje', {
        name: name,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val(' ').focus;
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});