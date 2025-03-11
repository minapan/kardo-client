import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currActiveCard: null,
  isShowModal: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShowModal = true
    },

    clearAndHideCurrActiveCard: (state) => {
      state.currActiveCard = null
      state.isShowModal = false
    },

    updateCurrActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currActiveCard = fullCard
    }
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (buider) => { }
})

export const { showModal, clearAndHideCurrActiveCard, updateCurrActiveCard } = activeCardSlice.actions

export const selectCurrActiveCard = state => state.activeCard.currActiveCard

export const selectIsShowModal = state => state.activeCard.isShowModal

export const activeCardReducer = activeCardSlice.reducer