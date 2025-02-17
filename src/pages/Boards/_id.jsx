import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewCardAPI, createNewColAPI, fetchBoardDetailsAPI, moveCardToDiffColAPI, updateBoardDetailsAPI, updateColDetailsAPI } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/fomatters'
import { mapOrder } from '~/utils/sorts'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '67b00953f56e9e6b62486467'
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(col => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, '_id')
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
      // Insert the new card and remove the placeholder card
      if (columnToUpdate.some(card => card.FE_Placeholder))
      {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }
      // Insert the new card
      else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInSameCol = (dndOrderedCards, dndOrderedCardIDs, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(col => col._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIDs
    }
    setBoard(newBoard)


    updateColDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIDs })
  }

  const moveCardToDiffCol = (currCardId, prevColId, nextColId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(col => col._id === prevColId)?.cardOrderIds
    // If the column is empty, then the placeholder card is not in cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDiffColAPI({
      currCardId,
      prevColId,
      prevCardOrderIds,
      nextColId,
      nextCardOrderIds: dndOrderedColumns.find(col => col._id === nextColId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewCol={createNewCol}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInSameCol={moveCardInSameCol}
        moveCardToDiffCol={moveCardToDiffCol} />
    </Container>
  )
}

export default Board
