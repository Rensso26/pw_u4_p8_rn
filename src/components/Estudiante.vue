<template>
<div>
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">Actualizar Parcial</button>
    <button v-on:click="borrar()">Borrar</button>
</div>
</template>

<script>
import {guardarFachada, actualizarFachada, actualizarParcialFachada,borrarPorIdFachada} from "../clients/EstudianteClient.js"
export default {
    methods:{
       async guardar(){
            var fecha='2000-12-26';
            const estudianteToBody = {
                nombre: "Rensso",
                apellido: "Parra",
                fechaNacimiento: fecha + "T00:00:00",
                genero: "M",
            };
            await guardarFachada(estudianteToBody);
        },
        async actualizar(){
            let fecha = '2000-12-26';
            const estudianteToBody = {
                nombre: "Rensso",
                apellido: "Parra",
                fechaNacimiento: fecha + "T00:00:00",
                genero: "M",
            };
            await actualizarFachada(estudianteToBody,1);
        },
        async actualizarParcial(){
            const estudianteToBody = {
                apellido: "Vasquez",
            };
            await actualizarParcialFachada(estudianteToBody,1);
        },
        async borrar(){
            await borrarPorIdFachada(2);
        },
    },
};
</script>

<style>

</style>