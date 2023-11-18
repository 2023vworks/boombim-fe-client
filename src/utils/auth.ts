import getMbtiName from './user'

export const TOKEN_NAME = 'ATK'
const USER_INFO = 'USER'

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token)
}

export function setUserInfo(name: string, mbti: string): void {
  localStorage.setItem(USER_INFO, getMbtiName({ mbti, nickname: name }))
}

export function resetUserInfo() {
  localStorage.removeItem(USER_INFO)
}

export function getUserInfo(): string | null {
  return localStorage.getItem(USER_INFO)
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_NAME)
}

export function checkLogin(): boolean {
  return !!localStorage.getItem(TOKEN_NAME)
}

function deleteAccessToken(): void {
  localStorage.removeItem(TOKEN_NAME)
}

export function logout(): void {
  deleteAccessToken()
  resetUserInfo()
}
