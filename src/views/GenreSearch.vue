<script setup>
import Footer from '../../components/Footer.vue';
import Genres from '../../components/Genres.vue';
import Header from '../../components/Header.vue';

const genresList = [
  { id: 28, genreName: "Action" },
  { id: 12, genreName: "Adventure" },
  { id: 27, genreName: "Horror" },
  { id: 10751, genreName: "Family" },
  { id: 36, genreName: "History" },
  { id: 10402, genreName: "Music" },
  { id: 53, genreName: "Thriller" },
  { id: 16, genreName: "Animation" },
  { id: 9648, genreName: "Mystery" },
  { id: 10752, genreName: "War" },
  { id: 35, genreName: "Comedy" },
  { id: 14, genreName: "Fantasy" },
  { id: 37, genreName: "Western" },
  { id: 80, genreName: "Crime" },
  { id: 878, genreName: "Sci-Fi" }
];
</script>

<template>
  <Header />
  <Genres :genres="genresList" />
  <Footer />
</template>

<style scoped>

</style>