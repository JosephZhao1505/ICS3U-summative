<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const password = ref('');

const handleLogin = () => {
  if (password.value === "dataharvesting") {
    router.push("/home");
  } else {
    alert("Invalid Password");
  }
};
</script>

<template>
  <div class="navbar">
    <h1>BrokeFlix</h1>
    <div class="login-link-container">
      <p>Don't have an account? <RouterLink to="/register" class="button register">Sign Up</RouterLink></p>
    </div>
  </div>
  <div class="form-container">
    <h2>Login to Your Account</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" placeholder="Email" class="input-field" required />
      <input v-model:="password" type="password" placeholder="Password" class="input-field" required />
      <button type="submit" class="button login">Login</button>
    </form>
  </div>
  <RouterLink to="/" class="cancelbutton">Cancel</RouterLink>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
  position: relative;
}

.navbar {
  background-color: #1f1f1f;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  color: #e0e0e0;
  font-size: 24px;
}

.button, .cancelbutton {
  background-color: #333;
  color: #e0e0e0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover, .cancelbutton:hover {
  background-color: #cc5140;
}

.register {
  text-decoration: none;
}

.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #e0e0e0;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #333;
  color: #e0e0e0;
  font-size: 14px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #888;
  background-color: #444;
}

input::placeholder {
  color: #bbb;
}

.login {
  width: 100%;
  background-color: #444;
  margin: 10px 0;
}

.login:hover {
  background-color: #cc5140;
}

.login-link-container {
  display: flex;
  align-items: center;
  color: #e0e0e0;
}

.login-link-container p , .cancelbutton {
  font-family: Arial, sans-serif;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.cancelbutton {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
