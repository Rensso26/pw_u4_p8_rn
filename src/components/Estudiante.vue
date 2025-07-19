<template>
  <div class="container">
    <div class="formulario">
      <label for="id">ID:</label>
      <input
        id="id"
        v-model="estudiante.id"
        type="number"
        placeholder="ID del estudiante"
      />
      <label for="nombre">Nombre:</label>
      <input
        id="nombre"
        v-model="estudiante.nombre"
        type="text"
        placeholder="Nombre del estudiante"
      />
      <label for="apellido">Apellido:</label>
      <input
        id="apellido"
        v-model="estudiante.apellido"
        type="text"
        placeholder="Apellido del estudiante"
      />
      <label for="fechaNacimiento">Fecha de Nacimiento:</label>
      <input
        id="fechaNacimiento"
        v-model="estudiante.fechaNacimiento"
        type="date"
      />
      <label for="genero">Género:</label>
      <input
        id="genero"
        v-model="estudiante.genero"
        type="text"
        placeholder="M o F"
      />
    </div>

    <div class="botones">
      <button @click="guardar()">Guardar</button>
      <button @click="actualizar()">Actualizar</button>
      <button @click="actualizarParcial()">Actualizar Parcial</button>
      <button @click="borrar()">Borrar</button>
    </div>

    <h1 v-show="mostrar">{{ mensaje }}</h1>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarPorIdFachada,
} from "../clients/EstudianteClient.js";

export default {
  data() {
    return {
      estudiante: {
        id: null,
        nombre: null,
        apellido: null,
        fechaNacimiento: null,
        genero: null,
      },
      mensaje: null,
    };
  },
  methods: {
    async guardar() {
      const estudianteToBody = {
        nombre: this.estudiante.nombre,
        apellido: this.estudiante.apellido,
        fechaNacimiento: this.estudiante.fechaNacimiento + "T00:00:00",
        genero: this.estudiante.genero,
      };
      await guardarFachada(estudianteToBody);
      this.mensaje = "Estudiante guardado exitosamente.";
      this.mostrar = true;
    },

    async actualizar() {
      const estudianteToBody = {
        nombre: this.estudiante.nombre,
        apellido: this.estudiante.apellido,
        fechaNacimiento: this.estudiante.fechaNacimiento + "T00:00:00",
        genero: this.estudiante.genero,
      };
      await actualizarFachada(estudianteToBody, this.estudiante.id);
      this.mensaje = `Estudiante con ID ${this.estudiante.id} actualizado.`;
      this.mostrar = true;

    },

    async actualizarParcial() {
      const estudianteToBody = {
        apellido: this.estudiante.apellido,
      };
      await actualizarParcialFachada(estudianteToBody, this.estudiante.id);
      this.mensaje = `Actualizacion parcial del estudiante con ID ${this.estudiante.id}, realizada.`;
      this.mostrar = true;

    },

    async borrar() {
      await borrarPorIdFachada(this.estudiante.id);
      this.mensaje=`Estudiante con ID ${this.estudiante.id} borrado.`;
      this.mostrar = true;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  color: #666;
  text-align: left;
  padding: 12px 3px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
input {
  display: block;
  color: rgb(0, 0, 0);
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #58a93f;
  padding: 10px 6px;
  text-align: center;
}
button {
  margin: 5px;
  display: inline;
  padding: 12px 20px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #0d5105;
  background-color: #a6eea9;
  color: #111c07;
  text-align: left;
}
</style>