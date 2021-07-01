import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://weatherly-53bf1-default-rtdb.europe-west1.firebasedatabase.app',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

interface payload {
  name?: string,
  id: string | number,
  city?: string,
  document?: string
}

const dataService = {
  postUserData (payload: payload) {
    return apiClient.post(`/users/${payload.id}/user.json`, { city: payload.city, name: payload.name })
  },
  getUserData (payload: payload) {
    return apiClient.get(`/users/${payload.id}/user.json`)
  },
  updateUserData (payload: payload) {
    return apiClient.patch(`/users/${payload.id}/user/${payload.document}.json`, { city: payload.city, name: payload.name })
  }
}

export default dataService
