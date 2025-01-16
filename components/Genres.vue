<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "../src/store";

const router = useRouter();
const store = useStore();
const props = defineProps(["genres"]);
const selectedGenre = ref(28);
const response = ref(null);

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`)
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
})

const addToCart = (movie) => {
  store.cart.set(String(movie.id), { title: movie.title, url: movie.poster_path })
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
  <Header />
  <div class="movie-gallery">
    <h1>Search By Genre</h1>
    <select v-model="selectedGenre" @change="getMovieByGenre()">
      <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
        <button class="button" @click="getMovieDetails(movie.id)">Details</button>
        <button @click="addToCart(movie)" class="button">{{store.cart.has(String(movie.id)) ? 'Added' : 'Buy' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
}

.movie-gallery {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

select {
  background-color: #333;
  color: #e0e0e0;
  border: 1px solid #555;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 14px;
  width: 200px;
}

select:focus {
  outline: none;
  border-color: #888;
  background-color: #444;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
}

.movie-card {
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #555;
}

.movie-title {
  padding: 10px;
  font-size: 16px;
  text-align: center;
  color: #e0e0e0;
}

.movie-title:hover {
  color: #888;
}
</style>