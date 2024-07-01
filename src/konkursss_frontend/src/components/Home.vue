<template>
  <!-- Główny kontener strony -->
  <div class="bg-slate-900 h-screen overflow-hidden">
  
    <!-- Nagłówek -->
    <header class="bg-gray-700 w-full h-1/5 fixed top-0 z-50">
      <!-- Górna część nagłówka z logo -->
      <div class="h-3/4 flex justify-center items-center">
        <img src="/logo2.png" alt="CRYPTA" class="h-full"/>
      </div>
      
      <!-- Dolna część nagłówka z sekcjami -->
      <div class="h-1/4 grid grid-cols-3 items-center">
        <!-- Pole wyszukiwania kryptowalut -->
        <div class="relative">
          <input
            id="crypto_name"
            v-model="searchQuery"
            @input="filterCryptocurrencies"
            placeholder="Crypto name"
            class="placeholder-text-center placeholder-white text-white bg-transparent w-full px-4 py-2 border-none focus:outline-none"
            @click="toggleCryptocurrencies"
          />
          <button class="aspect-square w-fit h-full"></button>

          <!-- Lista filtrowanych kryptowalut z przewijaniem -->
          <div v-if="showCryptocurrencies" class="absolute top-full left-0 w-60 bg-gray-800 overflow-y-auto max-h-[9rem] z-50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            <!-- Wyświetlanie kryptowalut -->
            <ul class="text-sm text-white">
              <li v-for="(crypto, index) in filteredCryptocurrencies" :key="crypto.id" class="flex items-center h-10 px-4">
                <img :src="crypto.icon" alt="Cryptocurrency" class="h-8 mr-2">
                <p>{{ crypto.shortcut }} {{ crypto.name }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sekcja "Voting" -->
        <div class="text-white text-center flex items-center justify-center">
          <p>Voting</p>
        </div>
        
        <!-- Sekcja "Log in" -->
        <div class="text-white text-center flex items-center justify-center">
          <router-link to="/login">Log in</router-link>
        </div>
      </div>
    </header>

    <!-- Główna zawartość strony -->
    <main class="mt-20">
      <!-- Placeholder na główną zawartość -->
      <div class="flex justify-center items-start w-full">
        <div class="w-2/3">
          <div class="grid gap-4 my-10">
            <!-- Wyświetlanie wpisów -->
            <div v-for="(wpis, index) in wpisy" :key="index" class="drop-shadow-xl bg-gray-700 p-4">
              <p>id: {{ index }}</p>
              <p>{{ wpis }}</p>
              <button class="bg-gray-900 rounded text-white p-4" @click="deleteWpis(index)">usun</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { konkursss_backend } from 'declarations/konkursss_backend/index';

// Lista kryptowalut
const cryptocurrencies = ref([
  { id: 1, name: 'Bitcoin', shortcut: 'BTC', icon: '/btc.png' },
  { id: 2, name: 'Ethereum', shortcut: 'ETH', icon: '/eth.png' },
  { id: 3, name: 'XRP', shortcut: 'XRP', icon: '/xrp.png' },
  { id: 4, name: 'Internet Computer', shortcut: 'ICP', icon: '/icp.png' },
  // Dodaj pozostałe kryptowaluty tutaj...
]);

// Stan filtrujący listę kryptowalut
const showCryptocurrencies = ref(false);
const searchQuery = ref('');
const filteredCryptocurrencies = ref([...cryptocurrencies.value]);

// Funkcje do obsługi interakcji użytkownika
const toggleCryptocurrencies = () => {
  showCryptocurrencies.value = !showCryptocurrencies.value;
};

const filterCryptocurrencies = () => {
  const query = searchQuery.value.toLowerCase();
  filteredCryptocurrencies.value = cryptocurrencies.value.filter(crypto =>
    crypto.name.toLowerCase().startsWith(query) || crypto.shortcut.toLowerCase().startsWith(query)
  );
};

// Tablica przechowująca wpisy na stronie
const wpisy = ref([]);
const nowyBlog = ref('');

// Funkcje do zarządzania wpisami
const dodajWpisy = async () => {
  wpisy.value = await konkursss_backend.dodaj_wpis(nowyBlog.value);
  await pobierzWpisy();
};

const deleteWpis = async (index) => {
  await konkursss_backend.usun_wpis(index);
  await pobierzWpisy();
};

const pobierzWpisy = async () => {
  wpisy.value = await konkursss_backend.odczytaj_wpisy();
};

// Funkcja do automatycznego odświeżania wpisów
const startAutoRefresh = () => {
  setInterval(async () => {
    await pobierzWpisy();
  }, 3000);
};

// Po zamontowaniu komponentu uruchamia pobieranie wpisów i automatyczne odświeżanie
onMounted(() => {
  pobierzWpisy();
  startAutoRefresh();
});
</script>

<style scoped>
/* Stylowanie paska przewijania */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(55, 65, 81, 1);
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background-color: rgba(75, 85, 101, 1);
}

/* Stylowanie scrollbarów */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(55, 65, 81, 1) rgba(75, 85, 101, 1);
}

.scrollbar-thin:hover {
  scrollbar-color: rgba(35, 45, 61, 1) rgba(55, 65, 81, 1);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
}
</style>
