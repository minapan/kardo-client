import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

// The initial state of the Slice in Redux
const initialState = {
  currActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

// Create Slice for the active board
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Handle data from sync actions
  reducers: {
    updateCurrActiveBoard: (state, action) => {
      const board = action.payload

      state.currActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      // Update nested data
      const incomingCard = action.payload

      // find board > column > card
      const board = state.currActiveBoard
      const column = board.columns.find(col => col._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(card => card._id === incomingCard._id)
        if (card) {
          Object.keys(incomingCard).forEach(key => {
            card[key] = incomingCard[key]
          })
        }
      }
    }
  },
  // ExtraReducers: Handle data from async actions
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload // action.payload = the data returned by the API (response.data)

      // Combine 2 arr into one
      board.FE_allUsers = board.owners.concat(board.members)

      // Handle data from API
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(col => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, '_id')
        }
      })

      // Update state
      state.currActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrActiveBoard, updateCardInBoard } = activeBoardSlice.actions

// Selectors:
export const selectCurrActiveBoard = state => state.activeBoard.currActiveBoard

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer