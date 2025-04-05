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

export const TOAST_LIMIT = 3


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

export const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Project Manager',
    text: 'Trello transformed how we manage projects! The visual boards make tracking progress a breeze.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742842/2244af71ad0c25f2cb0a8efa167491fb_ulhy0q.png'
  },
  {
    name: 'John Smith',
    role: 'Developer',
    text: 'Collaboration has never been this smooth. Integrations with Slack and GitHub are a lifesaver.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742842/ed7055b68adec22bfa8a88d441e83e9a_uyptzf.png'
  },
  {
    name: 'Alice Brown',
    role: 'Designer',
    text: 'A game-changer for creative workflows. I love how easy it is to share mockups with the team.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742842/44f647f9e3c4767d3b83e89e67917f41_jcjjdr.png'
  },
  {
    name: 'Michael Lee',
    role: 'Marketing Lead',
    text: 'Trello keeps our campaigns on track. The timeline view is perfect for planning launches.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742925/76891f0bd337c6ee10f84067d7808044_r0q1bi.png'
  },
  {
    name: 'Sara Kim',
    role: 'Product Owner',
    text: 'Managing sprints is so much simpler with Trello. The flexibility is unmatched.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742841/644dfc35027924a6e5dfbcad653be697_vcmwf9.png'
  },
  {
    name: 'David Patel',
    role: 'Freelancer',
    text: 'As a solo worker, Trello helps me stay organized across multiple client projects.',
    avatar: 'https://res.cloudinary.com/dlg8pkxcl/image/upload/v1743742841/78c7bf3d348d505f15d332f9a58092f7_gjzhjc.png'
  }
]