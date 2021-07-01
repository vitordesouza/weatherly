import axios, { AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

interface payload {
  city: string,
  units?: string
}

const apiKey = process.env.VUE_APP_WEATHER

const weatherService = {
  getWeather (payload: payload): Promise<AxiosResponse> {
    return apiClient.get(`/weather?q=${payload.city}&units=metric&appid=${apiKey}`)
  }
}

export default weatherService
