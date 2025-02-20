import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import { moveCardToDiffColAPI, updateBoardDetailsAPI, updateColDetailsAPI } from '~/apis'
import { useDispatch } from 'react-redux'
import { fetchBoardDetailsAPI, selectCurrActiveBoard, updateCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrActiveBoard)
  const { boardId } = useParams()
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  // const createNewCol = async (newColData) => {}

  // const createNewCard = async (newCardData) => {}

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrActiveBoard(newBoard))

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInSameCol = (dndOrderedCards, dndOrderedCardIDs, columnId) => {
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(col => col._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIDs
    }
    // setBoard(newBoard)
    dispatch(updateCurrActiveBoard(newBoard))

    updateColDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIDs })
  }

  const moveCardToDiffCol = (currCardId, prevColId, nextColId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrActiveBoard(newBoard))

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

  // const deleteColDetails = (id) => {}

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

        moveColumns={moveColumns}
        moveCardInSameCol={moveCardInSameCol}
        moveCardToDiffCol={moveCardToDiffCol}
      />
    </Container>
  )
}

export default Board
