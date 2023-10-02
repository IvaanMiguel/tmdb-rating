import { ref, toValue } from 'vue'

const ACCESS_TOKEN_AUTH = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzc2ZTQ4NmVlM2QwYWMyYmVjODQwNGZkMjY4YWU5NCIsInN1YiI6IjY1MTIwZTJkZTFmYWVkMDBjNjE3YWZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzAx-b-VaUcE2Q1nTLpj_bec5E7mAtjAo7jqYpg8N3E'

const useFetch = async (url, method, body = {}) => {
  const data = ref(null)

  const response = await fetch(toValue(url), {
    method: method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`
    },
    body: Object.keys(body).length > 0 ? JSON.stringify(body) : null
  })

  data.value = await response.json()

  // if (!data.value.success) {
  //   console.log(`An error occurred: ${data.value.status_message} Status code: ${data.value.status_code}.`);
  // }

  return data
}

export default useFetch
