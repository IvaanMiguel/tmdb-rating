import { ref, toValue } from 'vue'

const paginator = (totalPages, initialPage = 1) => {
  const currentPage = ref(initialPage)

  const goToNextPage = () => {
    return currentPage.value = Math.min(currentPage.value + 1, toValue(totalPages))
  }

  const goToPreviousPage = () => {
    return currentPage.value = Math.max(currentPage.value - 1, 1)
  }

  const goToPage = (e) => currentPage.value = e.pageNumber

  return {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  }
}

export default paginator
