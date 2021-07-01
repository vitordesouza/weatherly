import { userPayload } from '@/store/actions.type'
import axios, { AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const apiKey = process.env.VUE_APP_FIREBASE

const authService = {
  login (payload: userPayload): Promise<AxiosResponse> {
    return apiClient.post(`accounts:signInWithPassword?key=${apiKey}`,
      { email: payload.email, password: payload.password, returnSecureToken: true }
    )
  },
  signup (payload: userPayload): Promise<AxiosResponse> {
    return apiClient.post(`/accounts:signUp?key=${apiKey}`,
      { email: payload.email, password: payload.password, returnSecureToken: true }
    )
  }
}

export default authService
