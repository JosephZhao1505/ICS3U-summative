<script setup>
import axios from "axios";
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const router = useRouter();
const store = useStore();

const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);

function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

const addToCart = (movie) => {
  store.cart.set(String(movie.id), { title: movie.title, url: movie.poster_path })
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
  <Header />
  <div class="movie-gallery">
    <h1>Now Playing</h1>
    <div class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <div @click="getMovieDetails(movie.id)" class="movie-poster-container">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        </div>
        <p class="movie-title">{{ movie.title }}</p>
        <button @click="addToCart(movie)" class="button">{{ store.cart.has(String(movie.id)) ? 'Added' : 'Buy'
          }}</button>
      </div>
    </div>
  </div>
  <Footer />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster-container {
  width: 100%;
  cursor: pointer;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #555;
}

.movie-title {
  padding: 10px;
  font-size: 16px;
  color: #e0e0e0;
  width: 100%;
}

.movie-title:hover {
  color: #cc5140;
}

.button {
  margin: 10px 0;
  padding: 8px 15px;
  font-size: 20px;
  color: black;
  background-color: gray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #cc5140;
}

.button:active {
  background-color: #cc5140;
}
</style>