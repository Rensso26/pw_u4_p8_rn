import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import AboutView from '../views/AboutView.vue'
import EstudianteView from '../views/EstudianteView.vue'
import RecursoProhibidoView from '../views/RecursoProhibidoView.vue'
import NotasIngresoView from '../views/NotasIngresoView.vue'

import {obtenerPaginasPermitadas} from '../helpers/Autorizacion'

function estaAutenticado(){
  let resul = localStorage.getItem('auth') === 'true';
  console.log(resul);
  return resul;
  
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      requiereAuth: true,//protegida
    }
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView,
    meta:{
      requiereAuth: true,//protegida
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requiereAuth: false,//protegida
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta:{
      requiereAuth: true,//protegida
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta:{
      requiereAuth: true,//protegida
    }
  },
  {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta:{
      requiereAuth: true,//protegida
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //Validando si la página debe estar autenticada (requiereAuth: true)
  if(to.meta.requiereAuth){
    //Si no está autenticado
    if(!estaAutenticado()){
      next('/login')
    }else{
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitadas(usuario);
      if(paginas.includes(to.path)){
        next();
      } else {
        next('/403');
      }
    }
  }else{
    next();
  }
})

export default router
