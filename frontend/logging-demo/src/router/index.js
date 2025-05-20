import Vue from 'vue';
import VueRouter from 'vue-router';
import LoggingPage from '../components/LoggingPage.vue'; 

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoggingPage
  }
];

const router = new VueRouter({
  mode: 'history', 
  routes 
});

export default router;