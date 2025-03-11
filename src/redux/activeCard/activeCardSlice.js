import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currActiveCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearCurrActiveCard: (state) => {
      state.currActiveCard = null
    },

    updateCurrActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currActiveCard = fullCard
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (buider) => { }
})

export const { clearCurrActiveCard, updateCurrActiveCard } = activeCardSlice.actions

export const selectCurrActiveCard = state => state.activeCard.currActiveCard

export const activeCardReducer = activeCardSlice.reducer