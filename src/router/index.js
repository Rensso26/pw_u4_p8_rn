import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: ()=> import("../views/EstudianteView.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiereAuth){
    //Si no está autenticado
    if(!estaAutenticado()){
      next('/login')
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router
