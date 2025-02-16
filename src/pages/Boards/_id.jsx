import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColAPI, fetchBoardDetailsAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '67b00953f56e9e6b62486467'
    fetchBoardDetailsAPI(boardId).then(board => { setBoard(board) })
  }, [])

  const createNewCol = async (newColData) => {
    const createdCol = await createNewColAPI({ ...newColData, boardId: board._id })
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} createNewCol={createNewCol} createNewCard={createNewCard} />
    </Container>
  )
}

export default Board
