import { createApp } from 'vue';
import App from './App.vue';
import router from './router';   // Importujemy zdefiniowany router
import './index.css';            // Importujemy plik CSS (np. z Tailwind)

const app = createApp(App);

// Rejestrujemy router w aplikacji Vue
app.use(router);

app.mount('#app');
