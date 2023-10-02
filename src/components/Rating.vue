<script setup>
import { ref } from 'vue'

import useFetch from '../composables/fetch'

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['ratingUpdated'])

const movieRate = ref(5)

const rateMovie = async () => {
  await useFetch(`https://api.themoviedb.org/3/movie/${props.movieId}/rating?session_id=${localStorage.getItem('sessionId')}`, 'POST', {
    value: movieRate.value
  })

  emits('ratingUpdated', { rating: movieRate.value })
}
</script>

<template>
  <form>
    <div class='d-flex gap-2 mb-3'>
      <span>0.5</span>
      <input type='range' class='form-range' min='0.5' max='10' step='0.5' v-model='movieRate'>
      <span>10</span>
    </div>
    <div class='text-end'>
      <button type='button' class='btn btn-secondary mx-auto' @click='rateMovie'>Rate</button>
    </div>
  </form>
</template>
