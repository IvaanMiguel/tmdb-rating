<script setup>
import Rating from './Rating.vue';
import RatingDisplay from './RatingDisplay.vue';

import useFetch from '../composables/fetch';

import { computed, ref, onMounted, watchEffect } from 'vue'

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  }
})

const url = computed(() => `https://api.themoviedb.org/3/movie/${props.movieId}`)
const movie = ref(null)
const movieRate = ref(0)

const updateRatingDisplay = (e) => movieRate.value = e.rating

onMounted(() => {
  watchEffect(async () => {
    if (props.movieId === 0) return

    movie.value = null

    const movieResponse = await useFetch(url, 'GET')
    movie.value = movieResponse.value
  })
})
</script>

<template>
  <div id='movieModal' class='modal modal-xl fade' tabindex='-1'>
    <div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
      <div class='modal-content'>
        <div class='modal-header'>
          <div v-if='movie'>
            <h1 class='modal-title fs-5' id='staticBackdropLabel'>{{ movie.title }}</h1>
            <span class='movie-tagline'>
              <small>{{ movie.tagline }}</small>
            </span>
          </div>
          <button type='button' class='btn-close' data-bs-dismiss='modal'></button>
        </div>
        <div v-if='movie' class='modal-body row gap-3'>
          <div class='col-md text-center'>
            <img class='rounded-3 movie-image' :src='`https://image.tmdb.org/t/p/w342${movie.poster_path}`'>
          </div>
          <div class='col-md'>
            <div class='d-flex flex-wrap gap-1 mb-3'>
              <span v-for='genre in movie.genres' class='badge bg-info'>{{ genre.name }}</span>
            </div>
            <div class='mb-2'>
              <h6>Release date</h6>
              {{ movie.release_date }}
            </div>
            <div v-if='movie.runtime' class='mb-2'>
              <h6>Running time</h6>
              {{ movie.runtime }} minutes
            </div>
            <div class='row'>
              <div class='col-6'>
                <h6>Rating</h6>
                <span>{{ movie.vote_average.toFixed(1) }}</span>
              </div>
              <div class='col-6'>
                <RatingDisplay :movie-id='+movie.id' :movie-rate='+movieRate' />
              </div>
            </div>
            <div v-if='movie.overview'>
              <hr>
              <h5>Overview</h5>
              <span>{{ movie.overview }}</span>
              <hr>
            </div>
            <h5>Rate this movie</h5>
            <Rating :movie-id='+movie.id' @rating-updated='updateRatingDisplay' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-tagline {
  font-style: italic;
}

.movie-image {
  height: min-content;
}
</style>
