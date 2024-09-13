// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Rumah from '../views/rumah/index.vue'; 
import addRumah from '../views/rumah/form.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rumah',
    name: 'rumah',
    component: Rumah
  },
  {
    path: '/rumah/add',
    name: 'Tambah Rumah',
    component: addRumah
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
