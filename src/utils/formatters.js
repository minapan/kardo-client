export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column) => ({
  _id: `${column._id}-placeholder-card`,
  columnId: column._id,
  boardId: column.boardId,
  FE_Placeholder: true
})

// Technique using CSS pointer-events to prevent users from spamming clicks on any element that triggers an API call.
// This is a smart approach leveraging Axios Interceptors and CSS pointer-events to handle the logic once for the entire project.
// Usage: For any link or button that triggers an API call, simply add the class "interceptor-loading" to it.
export const interceptorLoadingElements = (calling) => {
  // Select all elements on the current page with the class name 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // If an API call is in progress (calling === true), apply CSS styles to dim the element and disable clicks using pointer-events.
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      // Otherwise, reset the styles to allow normal interactions.
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}
