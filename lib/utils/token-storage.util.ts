export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem('ACCESS_TOKEN', accessToken)
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem('ACCESS_TOKEN')
}

export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem('REFRESH_TOKEN', refreshToken)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('REFRESH_TOKEN')
}
