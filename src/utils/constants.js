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
  // Hàng 1
  '#C1E1C5', // Xanh lá nhạt
  '#F5E050', // Vàng nhạt
  '#F4A261', // Cam nhạt
  '#F28C82', // Đỏ nhạt
  '#D4B9DA', // Tím nhạt

  // Hàng 2
  '#9FD8CB', // Xanh lá trung bình
  '#FFD700', // Vàng trung bình
  '#FF8C00', // Cam trung bình
  '#FF4040', // Đỏ trung bình
  '#B19CD9', // Tím trung bình

  // Hàng 3
  '#5CB85C', // Xanh lá đậm
  '#DAA520', // Vàng đậm (nâu vàng)
  '#E95420', // Cam đậm (được viền xanh trong ảnh)
  '#FF0000', // Đỏ đậm
  '#8A2BE2', // Tím đậm

  // Hàng 4
  '#cce0ff', // Xanh dương nhạt
  '#98FF98', // Xanh lá nhạt (hơi khác nhóm trên)
  '#FFB6C1', // Hồng nhạt
  '#D3D3D3', // Xám nhạt
  '#ADD8E6', // Xanh dương nhạt (hơi khác)

  // Hàng 5
  '#87CEEB', // Xanh dương trung bình
  '#00FF7F', // Xanh lá sáng
  '#FF69B4', // Hồng đậm
  '#A9A9A9', // Xám trung bình
  '#4682B4', // Xanh dương đậm

  // Hàng 6
  '#4169E1', // Xanh dương đậm
  '#228B22', // Xanh lá đậm
  '#C71585', // Hồng đậm (hơi tím)
  '#696969', // Xám đậm
  '#2F4F4F' // Xám xanh đậm
]