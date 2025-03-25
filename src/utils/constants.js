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

export const initLabels = [
  { id: 'label-1742807284088', name: 'Ưu tiên', color: '#FF5733', isDefault: true },
  { id: 'label-1742807324321', name: 'Đang làm', color: '#3498DB', isDefault: true },
  { id: 'label-1742807340661', name: 'Hoàn thành', color: '#27AE60', isDefault: true }
]

export const predefinedColors = [
  '#C1E1C5',
  '#F5E050',
  '#F4A261',
  '#F28C82',
  '#D4B9DA',

  '#9FD8CB',
  '#FFD700',
  '#FF8C00',
  '#FF4040',
  '#B19CD9',

  '#5CB85C',
  '#DAA520',
  '#E95420',
  '#FF0000',
  '#8A2BE2',

  '#cce0ff',
  '#98FF98',
  '#FFB6C1',
  '#D3D3D3',
  '#ADD8E6',

  '#87CEEB',
  '#00FF7F',
  '#FF69B4',
  '#A9A9A9',
  '#4682B4',

  '#4169E1',
  '#228B22',
  '#C71585',
  '#696969',
  '#2F4F4F'
]