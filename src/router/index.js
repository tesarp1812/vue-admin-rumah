// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Rumah from '@/views/rumah/index.vue'; 
import Penghuni from "@/views/penghuni/index.vue"
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
    path: '/penghuni',
    name: 'penghuni',
    component: Penghuni
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
