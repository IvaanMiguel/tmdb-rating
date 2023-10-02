<script setup>
defineProps({
  movieInfo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class='card border-0 movie-card'>
    <div class='card text-bg-dark border-0 overflow-hidden'>
      <img :src='`https://image.tmdb.org/t/p/w300${movieInfo.backdrop_path}`' class='card-img'>
      <div class='alpha-layer'></div>
      <div class='card-img-overlay d-flex flex-column overflow-hidden'>
        <p class="card-text mb-1 movie-rate">
          <small>Rate: {{ movieInfo.vote_average }}</small>
        </p>
        <p class='card-text movie-overview'>{{ movieInfo.overview }}</p>
      </div>
    </div>
    <div class='card-body d-flex justify-content-center align-items-center'>
      <h5 class='card-title mb-0 text-center'>
        {{ movieInfo.title }}
      </h5>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  max-width: 18.75rem;
  cursor: pointer;
  user-select: none;

  transition: background-color .2s ease 0s
}

.movie-rate {
  font-weight: bold;
  transform: translateX(120%);
  transition: transform .2s ease 0s
}

.movie-overview {
  overflow: hidden;

  transform: translateX(-120%);
  transition: transform .2s ease 0s
}

.poster-img {
  object-fit: contain;
}

.movie-card:hover {
  background-color: lightgray;
}

.movie-card:hover .alpha-layer {
  transform: translateY(0%);
}

.movie-card:hover .movie-overview {
  transform: translateX(0%);
}

.movie-card:hover .movie-rate {
  transform: translateX(0%);
}

.alpha-layer {
  transform: translateY(-100%);
  position: absolute;
  width: 100%;
  height: 100%;

  box-shadow: inset 0 0 0 100000px rgb(0 0 0 / .4);
  transition: transform .2s ease 0s;
}
</style>
