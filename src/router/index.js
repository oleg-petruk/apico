import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      navbarTheme: 'dark'
    }
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import('../views/Favourites.vue'),
    meta: {
      navbarTheme: 'dark'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue'),
    meta: {
      reqAuth: true,
      navbarTheme: 'dark'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.reqAuth);
  (reqAuth && !store.getters.isAuth) ? next('login') : next();
});

export default router
