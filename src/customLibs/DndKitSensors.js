import { MouseSensor as LibMouseSensor, TouchSensor as LibTouchSensor } from '@dnd-kit/core'
const handler = ({ nativeEvent: event }) => {
  let cur = event.target
  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }
  return true
}

export class MouseSensor extends LibMouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }]
}

export class TouchSensor extends LibTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }]
}