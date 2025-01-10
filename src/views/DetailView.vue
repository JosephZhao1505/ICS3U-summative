<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "../store";
import Header from "../../components/Header.vue";

const route = useRoute();
const store = useStore();

const addToCart = () => {
  store.cart.set(route.params.id, { title: response.data.original_title, url: response.data.poster_path })
  localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}

const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
console.log(response.data);

</script>

<template>
  <Header />
  <div class="movie-detail">
    <div class="movie-content">
      <div class="movie-info">
        <div class="movie-poster-container">
          <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
            class="movie-poster" />
          <p class="movie-tagline"><i>{{ response.data.tagline }}</i></p>
        </div>

        <div class="movie-details">
          <h1 class="movie-title">{{ response.data.original_title }}</h1>
          <p class="movie-overview">{{ response.data.overview }}</p>
          <p class="movie-release-date">Release Date: {{ response.data.release_date }}</p>
          <p class="movie-runtime">Runtime: {{ response.data.runtime }} minutes</p>
          <p class="movie-vote-average">{{ response.data.vote_average }}/10 from {{ response.data.vote_count }} reviews
          </p>
          <p class="movie-original-language">Original Language: {{ response.data.original_language }}</p>
          <a :href="response.data.homepage" target="_blank">
            <button class="button">Official Movie Site</button>
          </a>
          <button @click="addToCart()" class="button">{{ store.cart.has(route.params.id) ? 'Added' : 'Buy' }}</button>
        </div>
      </div>
    </div>

    <div class="trailers-section">
      <h2 class="trailers-title">Trailers</h2>
      <div class="trailers-container">
        <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
          <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
            <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer Thumbnail"
              class="trailer-thumbnail" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.movie-content {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: linear-gradient(gray, lightgray);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-poster-container {
  text-align: center;
  margin-bottom: 20px;
}

.movie-poster {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-tagline {
  font-style: italic;
  color: #777;
  margin-top: 15px;
}

.movie-details {
  margin-top: 20px;
}

.movie-title {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.movie-overview {
  font-size: 1.1em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
}

.movie-release-date,
.movie-runtime,
.movie-vote-average,
.movie-original-language {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.movie-original-language {
  color: #757575;
}

.movie-site:hover {
  background-color: #005bb5;
}

.trailers-section {
  margin-top: 40px;
}

.trailers-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
}

.trailers-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.trailer-tile {
  position: relative;
  width: 300px;
  height: 170px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.trailer-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.trailer-tile:hover .trailer-thumbnail {
  transform: scale(1.05);
}
</style>
