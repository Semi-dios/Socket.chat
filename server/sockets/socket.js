const { io } = require('../server');
const { Usuarios } = require('../class/users');
const { crearMensaje } = require('../utils/utils');
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (callback) {
            if (!data.name || !data.sala) {
                return callback({
                    error: true,
                    mensaje: 'El nombre  y sala son necesarios'
                })
            }

            client.join(data.sala); // Unir clientes a salas en particular

            usuarios.agregarPersona(client.id, data.name, data.sala);

            client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonaPorSala(data.sala));

            callback(usuarios.getPersonaPorSala(data.sala));
        }
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.name, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.deletePersona(client.id);
        console.log(personaBorrada);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.name} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonaPorSala(personaBorrada.sala));
    });


    //Mjs Privados 

    client.on('mensajePrivado', data => {
        if (!client.id) {
            console.log('Se necesita el id ');
        }

        if (!data.mensaje) {
            console.log('Mensaje vacio');
        }
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.name, `${data.mensaje}`));
    })




});