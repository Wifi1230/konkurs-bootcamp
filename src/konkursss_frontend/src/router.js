import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue'; // Import komponentu Home
import Login from './components/Login.vue'; // Import komponentu Login
import Rejestracja from './components/Rejestracja.vue'; // Import komponentu Rejestracja

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/rejestracja', component: Rejestracja }, // Dodaj nową ścieżkę dla Rejestracja
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
