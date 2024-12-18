<script setup>
import { RouterLink } from "vue-router";
import { useStore } from "../src/store";

const store = useStore();

function logoutButton() {
  store.email = null;
  store.firstName = null;
  store.lastName = null;
  store.password = null;
}
</script>

<template>
  <div class="topbar">
    <div class="left">
      <div v-if="store.email !== null" class="viewsdropdown">
        <button class="button">Menu</button>
        <div class="views">
          <RouterLink to="/home"><button class="button">Home</button></RouterLink>
          <RouterLink to="/genresearch"><button class="button">Genres</button></RouterLink>
        </div>
      </div>
      <RouterLink v-if="store.email === null" to="/" class="logo">
        <img src="/sitelogo.png" alt="BrokeFlix Logo">
      </RouterLink>
      <RouterLink v-else to="/home" class="logo">
        <img src="/sitelogo.png" alt="BrokeFlix Logo">
      </RouterLink>
      <div class="greeting">
        <h1 v-if="store.email !== null">Hello {{ store.firstName }} {{ store.lastName }}!</h1>
      </div>
    </div>
    <div class="right">
      <template v-if="store.email !== null">
        <RouterLink to="/cart" class="button">Cart</RouterLink>
        <RouterLink to="/settings" class="button">Settings</RouterLink>
        <RouterLink @click="logoutButton" to="/" class="button">Logout</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/login" class="button">Log In</RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.logo img {
  height: 50px;
  background-color: gray;
  border-radius: 5px;
}

.topbar {
  background-color: black;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.greeting h1 {
  font-size: 18px;
  margin: 0;
}

.viewsdropdown {
  position: relative;
  display: inline-block;
}

.views {
  display: none;
  position: absolute;
  background-color: darkgray;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 5px;
}

.viewsdropdown:hover .views {
  display: block;
}

h1 {
  color: gray;
}
</style>