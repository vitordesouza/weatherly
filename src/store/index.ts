import { createStore } from 'vuex'

import auth from './modules/auth.module'
import weather from './modules/weather.module'

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface TodayWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface AppState {
  userName: string,
  userId: string,
  token: string,
  city: string,
  didAutoLogout: boolean,
  todayWeather: TodayWeather,
  isLoadingToday: boolean
}

export default createStore({
  modules: {
    auth,
    weather
  }
})
