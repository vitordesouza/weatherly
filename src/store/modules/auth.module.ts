import authService from '@/services/firebase/authentication'
import dataService from '@/services/firebase/database'

import { AUTO_LOGOUT, GET_WEATHER, LOGIN, LOGOUT, REGISTER, TRY_LOGIN, UPDATE_USER, userPayload } from '../actions.type'
import { SET_USER, SET_AUTO_LOGOUT, SET_TOKEN } from '../mutations.type'

import { AppState } from '..'
import { AxiosResponse } from 'axios'
import { Commit, Dispatch, ActionContext } from 'vuex'

interface LocalUser {
  userId: string,
  userName: string,
  city: string,
  token: string,
  didAutoLogout: boolean
}

const setLocalStorage = (token: string, userId: string) => {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
  // localStorage.setItem('tokenExpiration', expirationDate)
}

const state = {
  userName: null,
  userId: null,
  token: null,
  city: null,
  didAutoLogout: false
}

const getters = {
  isAuthenticated (state: AppState): string {
    return state.token
  },
  userName (state: AppState): string {
    return state.userName
  },
  city (state: AppState): string {
    return state.city
  }
}

const actions = {
  [REGISTER] ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, payload: userPayload): Promise<void | LocalUser> {
    let userData: LocalUser
    return authService.signup(payload).then((authResponse: AxiosResponse) => {
      commit(SET_TOKEN, {
        userId: authResponse.data.localId,
        token: authResponse.data.idToken
      })
      return dataService.postUserData({
        id: authResponse.data.localId,
        city: payload.city,
        name: payload.name
      }).then(() => {
        userData = {
          userId: authResponse.data.localId,
          token: authResponse.data.idToken,
          userName: payload.name,
          city: payload.city,
          didAutoLogout: false
        }
        setLocalStorage(authResponse.data.idToken, authResponse.data.localId)
        dispatch(GET_WEATHER, {
          city: payload.city
        })
        commit(SET_USER, userData)
      })
    })
  },
  [TRY_LOGIN] ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }): void {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // const tokenExpiration = localStorage.getItem('tokenExpiration')

    // if (tokenExpiration) {
    //   const expiresIn = +tokenExpiration - new Date().getTime()
    //   if (expiresIn < 0) {
    //     return
    //   }
    // } else {
    //   return
    // }

    if (token && userId) {
      commit(SET_TOKEN, {
        token,
        userId
      })
      dataService.getUserData({ id: userId })
        .then((dataRes: AxiosResponse) => {
          let data
          for (const key in dataRes.data) {
            data = dataRes.data[key]
          }
          dispatch(GET_WEATHER, {
            city: data.city
          })

          commit(SET_USER, {
            city: data.city,
            userName: data.name,
            didAutoLogout: false
          })
        })
    }
  },
  async [LOGIN] ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, payload: userPayload): Promise<void | LocalUser> {
    let userData: LocalUser
    try {
      const authRes = await authService.login(payload)
      const dataRes = await dataService.getUserData({ id: authRes.data.localId })

      commit(SET_TOKEN, {
        userId: authRes.data.localId,
        token: authRes.data.idToken
      })

      let data
      for (const key in dataRes.data) {
        data = dataRes.data[key]
      }

      userData = {
        userId: authRes.data.localId,
        token: authRes.data.idToken,
        userName: data.name,
        city: data.city,
        didAutoLogout: false
      }

      setLocalStorage(authRes.data.idToken, authRes.data.localId)
      commit(SET_USER, userData)
      return await dispatch(GET_WEATHER, {
        city: data.city
      })
    } catch (err) {
      console.error(err)
    }
  },
  [LOGOUT] ({ commit }: { commit: Commit }): void {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    commit(SET_USER, { userId: null, token: null })
  },
  [AUTO_LOGOUT] ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }): void {
    dispatch(LOGOUT)
    commit(SET_AUTO_LOGOUT)
  },
  async [UPDATE_USER] (context: ActionContext<AppState, AppState>, payload: AppState): Promise<void | LocalUser> {
    try {
      const dataRes = await dataService.getUserData({ id: context.state.userId })

      let data
      let mkey
      for (const key in dataRes.data) {
        data = dataRes.data[key]
        mkey = key
      }

      const res = await dataService.updateUserData({
        id: context.state.userId,
        document: mkey,
        city: payload.city,
        name: payload.userName
      })
    } catch (err) {
      console.error(err)
    }
  }
}

const mutations = {
  [SET_USER] (state: AppState, payload: LocalUser): void {
    state.userName = payload.userName
    state.city = payload.city
    state.didAutoLogout = false
  },
  [SET_TOKEN] (state: AppState, payload: LocalUser): void {
    state.userId = payload.userId
    state.token = payload.token
  },
  [SET_AUTO_LOGOUT] (state: AppState): void {
    state.didAutoLogout = true
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
