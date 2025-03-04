<script setup>
import { auth } from "@/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import Header from "../../components/Header.vue";
import { useStore } from "../store";
import { ref } from 'vue';

const store = useStore();

const firstNameChange = ref("");
const lastNameChange = ref("");
const passwordChange = ref("");
let [firstName, lastName] = auth.currentUser.displayName.split(' ')

async function updateInfo() {
  const proceed = window.confirm("Are you sure you want to apply these settings?");
  if (proceed) {
    if (firstNameChange.value.length > 0) {
      firstName = firstNameChange.value;
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
      firstNameChange.value = "";
    }
    if (lastNameChange.value.length > 0) {
      lastName = lastNameChange.value;
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
      lastNameChange.value = "";
    }
    if (passwordChange.value.length > 0) {
      await updatePassword(auth.currentUser, passwordChange.value);
      passwordChange.value = "";
    }
    location.reload();
    alert("Successfully changed settings")
  }
}

const loginMethod = localStorage.getItem('loginMethod');
</script>

<template>
  <Header />
  <div v-if="loginMethod === 'email'" class="form-container">
    <form @submit.prevent="updateInfo">
      <input v-model="firstNameChange" maxlength="30" placeholder="First Name" class="input-field" />
      <input v-model="lastNameChange" maxlength="30" placeholder="Last Name" class="input-field" />
      <input v-model="passwordChange" type="password" maxlength="4096" placeholder="Password" class="input-field" />
      <button type="submit" class="button">Change</button>
    </form>
    <div class="currentinfo">
      <h2>Current Info</h2>
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <p>Email: {{ auth.currentUser.email }}</p>
      <p>Password: **********</p>
    </div>
  </div>

  <div v-if="loginMethod !== 'email'">
    <h1>Settings are not available for Google login users. Please refer to the security tab in your account management settings.</h1>
    <img src="/g-security.png" alt="security">
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

button {
  width: 100%;
  background-color: #444;
  padding: 10px;
  color: #e0e0e0;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #cc5140;
}

.currentinfo {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.currentinfo p {
  color: #e0e0e0;
  margin: 10px 0;
}

.security {
  visibility: hidden;
}
</style>