import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/fomatters'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '67b00953f56e9e6b62486467'
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach(col => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewCol = async (newColData) => {
    const createdCol = await createNewColAPI({ ...newColData, boardId: board._id })

    createdCol.cards = [generatePlaceholderCard(createdCol)]
    createdCol.cardOrderIds = [generatePlaceholderCard(createdCol)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdCol)
    newBoard.columnOrderIds.push(createdCol._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(col => col._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewCol={createNewCol} createNewCard={createNewCard} moveColumns={moveColumns} />
    </Container>
  )
}

export default Board
