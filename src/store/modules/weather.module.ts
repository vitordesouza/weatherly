import weatherService from '@/services/weather/weather'
import { ActionContext } from 'vuex'
import { AppState, TodayWeather } from '..'
import { GET_WEATHER } from '../actions.type'
import { SET_TODAY_WEATHER, LOADED_TODAY } from '../mutations.type'

const state = {
  todayWeather: {},
  isLoadingToday: true
}

const getters = {
  todayWeather (state: AppState): TodayWeather {
    return state.todayWeather
  },
  isLoadingToday (state: AppState): boolean {
    return state.isLoadingToday
  }
}

const actions = {
  async [GET_WEATHER] (context: ActionContext<AppState, AppState>, payload: {city: string}): Promise<void | TodayWeather> {
    const res = await weatherService.getWeather({ city: payload.city })
    context.commit(SET_TODAY_WEATHER, res.data)
    context.commit(LOADED_TODAY)
  }
}

const mutations = {
  [SET_TODAY_WEATHER] (state: AppState, payload: TodayWeather): void {
    state.todayWeather = payload
  },
  [LOADED_TODAY] (state: AppState): void {
    state.isLoadingToday = !state.isLoadingToday
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
