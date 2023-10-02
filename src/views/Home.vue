<script setup>
import Paginator from '../components/Paginator.vue'
import MovieCard from '../components/MovieCard.vue'
import MovieModal from '../components/MovieModal.vue'

import paginator from '../composables/paginator'
import useFetch from '../composables/fetch'

import {
  computed,
  onMounted,
  ref,
  watchEffect
} from 'vue'

const totalPages = ref(500)
const url = computed(() => `https://api.themoviedb.org/3/movie/popular?page=${currentPage.value}`)
const movies = ref(null)
const selectedMovie = ref(0)

const { currentPage, goToNextPage, goToPreviousPage, goToPage } = paginator(totalPages)

const selectMovie = (movieId) => selectedMovie.value = movieId

onMounted(() => {
  watchEffect(async () => {
    const moviesResponse = await useFetch(url, 'GET')
    movies.value = moviesResponse.value.results
  })
})
</script>

<template>
  <main class='container'>
    <div class='my-4 d-flex flex-wrap gap-4 justify-content-center'>
      <span v-if='!movies'>Loading movies...</span>
      <MovieCard v-else v-for='movie in movies'
        :movie-info='movie'
        @click='selectMovie(movie.id)'
        data-bs-toggle='modal'
        data-bs-target='#movieModal'
      />
    </div>
    <Paginator
      @goToNextPage='goToNextPage'
      @goToPreviousPage='goToPreviousPage'
      @goToPage='goToPage'
      :total-pages='totalPages'
      :current-page='currentPage'
      :max-paginator-numbers='7'
    />
  </main>
  <MovieModal :movie-id='selectedMovie' />
</template>
