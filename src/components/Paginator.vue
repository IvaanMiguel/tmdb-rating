<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxPaginatorNumbers: {
    type: Number,
    default: 5
  }
})

defineEmits(['goToNextPage', 'goToPreviousPage', 'goToPage'])

const maxPaginatorNumbers = Math.min(props.totalPages, props.maxPaginatorNumbers)
const topHalf = Math.ceil(maxPaginatorNumbers / 2)
const lowerHalf = Math.floor(props.maxPaginatorNumbers / 2)

const paginatorNumbers = computed(() => {
  const leftEndPageTooLow = props.currentPage - lowerHalf < 1
  const rightEndPageTooHigh = props.currentPage + lowerHalf >= props.totalPages

  const pageNumbers = []

  for (let i = 1; i <= maxPaginatorNumbers; i++) {
    if (leftEndPageTooLow) {
      pageNumbers.push(i)
    } else if (rightEndPageTooHigh) {
      pageNumbers.push(props.totalPages - (maxPaginatorNumbers - i))
    } else {
      pageNumbers.push(props.currentPage - (topHalf - i))
    }
  }

  return pageNumbers
})
</script>

<template>
  <nav>
    <ul class='pagination justify-content-end'>
      <li class='page-item'>
        <a class='page-link' href='#' @click='$emit("goToPreviousPage")'>Previous</a>
      </li>

      <li v-for='pageNumber in paginatorNumbers'
        :class='["page-item", pageNumber === currentPage ? "active" : ""]' 
        @click='$emit("goToPage", { pageNumber: pageNumber })'
      >
        <a class='page-link' href='#'>
          {{ pageNumber }}
        </a>
      </li>

      <li class='page-item'>
        <a class='page-link' href='#' @click='$emit("goToNextPage")' >Next</a>
      </li>
    </ul>
  </nav>
</template>
