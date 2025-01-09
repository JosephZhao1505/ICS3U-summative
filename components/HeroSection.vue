<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <img src="/movie.png" alt="No Money" class="herosectionbanner">
    <h1>Unlimited content whenever and wherever</h1>
    <h2>Bank account look like this? No problem! Join now to start watching your favourite content with as many pixels
      as . Prices start at $6.99.</h2>
      <h1>Get Started</h1>
    <RouterLink to="/register" class="signup">
      <img src="/signupuh.png" alt="Sign Up">
    </RouterLink>
    <h3>Cancel after 10 lifetimes</h3>
  </div>
</template>

<style scoped>
.signup img {
  height: 100px;
  background-color: gray;
  border-radius: 5px;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  text-align: center;
  background-color: lightgray;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.herosectionbanner {
  max-width: 80%;
  height: auto;
  margin-bottom: 20px;
  max-height: 60vh;
}

h1,
h2,
h3 {
  margin: 10px 0;
}

button {
  margin-top: 20px;
}
</style>