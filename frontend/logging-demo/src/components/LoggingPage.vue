<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const port = 3000;
const handleLogin = async () => {
  try {
    const response = await axios.post(`http://localhost:${port}/login`, {
      username: username.value,
      password: password.value,
    });
    success.value = response.data.message;
    error.value = '';
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed';
    success.value = '';
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  text-align: left;
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>