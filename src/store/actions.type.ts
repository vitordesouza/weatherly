export const LOGIN = 'login'
export const TRY_LOGIN = 'tryLogin'
export const LOGOUT = 'logout'
export const AUTO_LOGOUT = 'autoLogout'
export const REGISTER = 'register'
export const UPDATE_USER = 'updateUser'
export const GET_WEATHER = 'getWeather'

export interface userPayload {
    name: string,
    email: string,
    password: string
    city: string
}
