<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const response = ref(null);
const numbers = ref([]);

numbers.value = (() => {
  const set = new Set();

  while (true) {
    set.add(Math.floor(Math.random() * 19));

    if (set.size === 3) {
      return set;
    }
  }
})();

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
})
</script>

<template>
  <div class="movie-gallery">
    <h1>Featured</h1>
    <div v-if="response" class="movie-list">
      <div v-for="number in numbers" :key="response.data.results[number].id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ response.data.results[number].title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: lightgray;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Adjust the minimum size */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%; /* Ensure the image stretches to the container's width */
  max-width: 100%; /* Ensure it does not exceed the container's width */
  height: auto; /* Maintain aspect ratio */
  display: block;
}

.movie-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: black;
  padding: 10px 5px;
  width: 100%;
  box-sizing: border-box;
}
</style>