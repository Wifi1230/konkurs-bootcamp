<template>
  <div class="bg-gray-900 h-screen flex flex-col items-center justify-center">
    <!-- Nagłówek z logo -->
    <header class="bg-gray-700 w-full h-1/5 fixed top-0 z-50">
      <div class="h-3/4 flex justify-center items-center">
        <img src="/logo2.png" alt="CRYPTA" class="h-full"/>
      </div>
    </header>
    
    <!-- Nagłówek Log in -->
    <h1 class="text-3xl font-semibold text-white mt-8">Log in</h1>
    
    <!-- Formularz logowania -->
    <div class="max-w-md w-full mx-auto p-8 bg-gray-700 border border-gray-900 rounded-lg shadow-lg mt-8">
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-white">Username</label>
          <input v-model="username" type="text" id="username" name="username" placeholder="Enter your username"
            class="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-gray-400"
            required>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-white">Password</label>
          <input v-model="password" type="password" id="password" name="password" placeholder="Enter your password"
            class="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-gray-400"
            required>
        </div>
        <button type="submit"
          class="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400">
          Log in
        </button>
      </form>

      <!-- Link do rejestracji -->
      <div class="text-sm text-gray-400 mt-2 text-center">
        Nie masz konta? <router-link to="/rejestracja" class="underline hover:text-gray-300">Zarejestruj się</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');

const login = () => {
  // Pobierz dane użytkownika z localStorage
  const userData = JSON.parse(localStorage.getItem(username.value));

  // Sprawdź poprawność danych logowania
  if (userData && userData.password === password.value) {
    // Przekierowanie na stronę główną po zalogowaniu
    router.push('/');
  } else {
    alert('Invalid username or password');
  }
};
</script>

<style scoped>
/* Dodatkowy styl dla przycisku Log in */
button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4a5568; /* Ciemniejszy odcień szarości */
}

.bg-gray-900 {
  background-color: #2d3748; /* Kolor tła jak w sekcji Home */
}
</style>
