<script setup>
import { auth } from "@/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import Header from "../../components/Header.vue";
import { useStore } from "../store";
import { ref } from 'vue';

const store = useStore();

const firstName = ref(auth.currentUser.displayName.split(' ')[0] || '');
const lastName = ref(auth.currentUser.displayName.split(' ')[1] || '');

const updateInfo = async () => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: `${firstName.value} ${lastName.value}`
    });

    alert('Information updated successfully!');
  } catch (error) {
    console.error('Error updating profile: ', error);
    alert('Failed to update information.');
  }
};
</script>

<template>
  <Header />
  <div class="form-container">
    <form @click="updateInfo">
      <input v-model="firstName" maxlength="20" placeholder="First Name" class="input-field" />
      <input v-model="lastName" maxlength="20" placeholder="Last Name" class="input-field" />
      <button type="submit" class="button">Change</button>
    </form>
  </div>

  <div class="currentinfo">
    <h2>Current Info</h2>
    <p>First Name: {{ firstName }}</p>
    <p>Last Name: {{ lastName }}</p>
    <p>Email: {{ auth.currentUser.email }}</p>
    <p>Password: **********</p>
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