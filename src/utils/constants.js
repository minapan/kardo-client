let apiRoot = ''

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-u0ro.onrender.com'
}

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}