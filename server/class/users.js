class Usuarios {

    constructor() {
        this.personas = [];
    }


    agregarPersona(id, name, sala) {
        let persona = { id, name, sala };

        this.personas.push(persona);

        return this.personas;
    }


    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {
        let personasSala = this.personas.filter(persona => persona.sala === sala);
        return personasSala;
    }


    deletePersona(id) {
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;

    }

}


module.exports = {
    Usuarios
}