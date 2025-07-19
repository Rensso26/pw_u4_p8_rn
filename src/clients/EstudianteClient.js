import axios from "axios";


const URL_API = "http://localhost:8081/api/matricula/v1/estudiantes";
//Guardar
//public void guardar(@RequestBody Estudiante estudanteTo)

const guardar = async (body) => {
    let token = '';
  
    const data = axios.post(`${URL_API}`, body,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(r => r.data);
    console.log(data);
}


//public Response actualizar(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id){
const actualizar = async (body, id) => {
    const data = axios.put(`${URL_API}/${id}`,body).then(r => r.data);
    console.log(data);
}

//public Response actualizarParcialPorId(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id, @Context UriInfo uriInfo){

const actualizarParcial = async (body, id) => {
    const data = axios.patch(`${URL_API}/${id}`,body).then(r => r.data);
    console.log(data);
}

//    public Response borrarPorId(@PathParam("id") Integer id){
const borrarPorId = async (id)=>{
    axios.delete(`${URL_API}/${id}`).then(r => r.data);

}


//fachadas
export const guardarFachada = async (body) => {
    await guardar(body);
}

export const actualizarFachada = async (body,id) => {
    await actualizar(body,id);
}

export const actualizarParcialFachada = async (body, id) => {
    await actualizarParcial(body,id);
}
export const borrarPorIdFachada = async (id)=>{
    await borrarPorId(id);
}