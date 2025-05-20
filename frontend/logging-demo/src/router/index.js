import Vue from 'vue';
import VueRouter from 'vue-router';
import LoggingComponent from '../components/LoggingComponent.vue'; 
import LoggingPage from '../components/LoggingPage.vue'; 

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoggingComponent
  },
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