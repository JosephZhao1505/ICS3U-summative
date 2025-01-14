<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';

const router = useRouter();
const store = useStore();
const password = ref('');
const retypepassword = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');

async function registerByEmail() {
  if (password.value !== retypepassword.value) {
    alert('Passwords do not match.');
    return;
  } else {
    try {
      const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
      await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
      store.user = user;
      router.push("/home");
    } catch (error) {
      alert("There was an error creating a user with email!");
    }
  }
}

async function registerByGoogle() {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/home");
  } catch (error) {
    alert("There was an error creating a user with Google!");
  }
}
</script>

<template>
  <div class="navbar">
    <h1>BrokeFlix</h1>
    <div class="login-link-container">
      <p>Already have an account?
        <RouterLink to="/login" class="button register">Login</RouterLink>
      </p>
    </div>
  </div>

  <div class="form-container">
    <h2>Make An Account</h2>
    <form @submit.prevent="registerByEmail()">
      <input v-model="firstName"  maxlength="20" placeholder="First Name" class="input-field" required />
      <input v-model="lastName" maxlength="20" placeholder="Last Name" class="input-field" required />
      <input v-model="email" maxlength="100" placeholder="Email" class="input-field" required />
      <input v-model="password" type="password" placeholder="Password" class="input-field" required />
      <input v-model="retypepassword" type="password" placeholder="Retype Password" class="input-field" required />
      <button type="submit" class="button signin">Sign Up</button>
    </form>
    <button @click="registerByGoogle()" class="button register">Register by Google</button>
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

.button,
.cancelbutton {
  background-color: #333;
  color: #e0e0e0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover,
.cancelbutton:hover {
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

.signin {
  width: 100%;
  background-color: #444;
  margin: 10px 0;
}

.signin:hover {
  background-color: #cc5140;
}

.login-link-container {
  display: flex;
  align-items: center;
  color: #e0e0e0;
}

.login-link-container p,
.cancelbutton {
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
