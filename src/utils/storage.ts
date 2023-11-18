export const INITIAL_USER = 'initialUser'
const TOKEN_NAME = 'ATK'

export const setCookie = ({ key, value, expires }: { key: string; value: string | number; expires: number }) => {
  const date = new Date()
  date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
  document.cookie = `${key}=${value}; expires=${date.toDateString()} `
}

export const getCookie = (key: string) => {
  const cookies = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
  return cookies ? cookies[2] : null
}

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token)
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_NAME)
}

function deleteAccessToken(): void {
  localStorage.removeItem(TOKEN_NAME)
}

export function checkLogin(): boolean {
  if (localStorage.getItem(TOKEN_NAME)) {
    return true
  } else {
    return false
  }
}

export function logout(): void {
  deleteAccessToken()
}
