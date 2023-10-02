<script setup>
import { ref } from 'vue';
import useFetch from '../composables/fetch'
import router from '../router';

const username = ref('')
const password = ref('')

const login = async () => {
  // Creating new request token.
  const requestTokenResponse = await useFetch('https://api.themoviedb.org/3/authentication/token/new', 'GET')

  if (!requestTokenResponse.value.success) return

  const requestToken = requestTokenResponse.value.request_token

  // Validating request token with login.
  const validateTokenResponse = await useFetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', 'POST', {
    username: username.value,
    password: password.value,
    request_token: requestToken
  })

  if (!validateTokenResponse.value.success) return

  // Creating session ID.
  const createSessionResponse = await useFetch('https://api.themoviedb.org/3/authentication/session/new', 'POST', {
    request_token: requestToken
  })

  if (!createSessionResponse.value.success) return

  const sessionId = createSessionResponse.value.session_id

  // Session ID should not be stored in local storage.
  localStorage.setItem('sessionId', sessionId)

  router.push({ name: 'home', params: { page: 1 }})
}
</script>

<template>
  <main class='main-container p-4 mx-auto'>
    <form class='border p-3'>
      <div class='mb-3'>
        <label for='username' class='form-label'>Username</label>
        <input id='username' class='form-control' type='text' v-model='username'>
      </div>
      <div class='mb-3'>
        <label for='password' class='form-label'>Password</label>
        <input id='password' class='form-control' type='password' v-model='password'>
      </div>
      <div class='text-center'>
        <button class='btn btn-primary btn-min-width mx-auto' @click.prevent='login'>
          Login
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.main-container {
  max-width: 640px;
}
</style>