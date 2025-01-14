<script setup>
import { RouterLink } from "vue-router";
import { useStore } from "../src/store";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const store = useStore();
let[firstName, lastName] = auth.currentUser.displayName.split(' ')

const logout = () => {
  store.user = null;
  signOut(auth);
  router.push(`/`);
}
</script>

<template>
  <div class="topbar">
    <div class="left">
      <div v-if="store.user !== null" class="viewsdropdown">
        <RouterLink class="buttons">
          <img src="/menuh.png" alt="Menu">
        </RouterLink>
        <div class="views">
          <RouterLink to="/home" class="buttons">
            <img src="/homeuh.png" alt="Home">
          </RouterLink>
          <RouterLink to="/genresearch" class = "buttons">
            <img src="/imsorryuh.png" alt="Genres">
          </RouterLink>
        </div>
      </div>
      <RouterLink v-if="store.user === null" to="/" class="buttons">
        <img src="/sitelogo.png" alt="BrokeFlix Logo">
      </RouterLink>
      <RouterLink v-else to="/home" class="buttons">
        <img src="/sitelogo.png" alt="BrokeFlix Logo">
      </RouterLink>
      <div class="greeting">
        <h1 v-if="store.user !== null">Hello {{ firstName }} {{ lastName }}!</h1>
      </div>
    </div>
    <div class="right">
      <template v-if="store.user !== null">
        <RouterLink to="/cart" class="buttons" >
          <img src="/cartuh.png" alt="Cart">
        </RouterLink>
        <RouterLink to="/settings" class="buttons">
          <img src="/gearuh.png" alt="Settings">
        </RouterLink>
        <RouterLink @click="logout()" to="/" class="buttons">
          <img src="/logoutuh.png" alt="Logout">
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/login" class="buttons">
          <img src="/signupuh.png" alt="Login">
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.buttons img {
  height: 50px;
  background-color: gray;
  border-radius: 5px;
}

.buttons img:hover {
  background-color: #cc5140;
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