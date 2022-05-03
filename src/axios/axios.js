import axios from 'axios'
import VueCookies from 'vue-cookies'

function makeApiResponse () {
  const data = {}
  return data
}

const apiRequest = axios.create({
  baseURL: 'https://api.apro.website',
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})

const token = VueCookies.get('token')
if (token) {
  apiRequest.defaults.headers.common.Authorization = 'Bearer ' + token
}
const language = localStorage.getItem('language')
if (language) {
  apiRequest.defaults.headers.common.language = language
}

// Add a request interceptor
apiRequest.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (!VueCookies.get('token') && !location.href.includes('login')) {
      const logout = makeApiResponse()
      return Promise.reject(logout)
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiRequest.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export { apiRequest }
