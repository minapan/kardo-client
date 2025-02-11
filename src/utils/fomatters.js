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