import { Box, Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import { moveCardToDiffColAPI, updateBoardDetailsAPI, updateColDetailsAPI } from '~/apis'
import { useDispatch } from 'react-redux'
import { fetchBoardDetailsAPI, selectCurrActiveBoard, updateCardInBoard, updateCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { socketIo } from '~/socketClient'
import { updateCurrActiveCard } from '~/redux/activeCard/activeCardSlice'

function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrActiveBoard)
  const { boardId } = useParams()
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
    socketIo.emit('FE_USER_JOINED_ROOM', boardId)

    // socketIo.on('BE_USER_JOINED_ROOM', (clientId) => {
    //   console.log(`FE User ${clientId} joined room ${boardId}`)
    // })

    // Cleanup event through unmount to avoid memory leak
    return () => {
      dispatch(updateCurrActiveBoard(null))
      socketIo.emit('FE_USER_LEFT_ROOM', boardId)
      // console.log(`FE I am left room ${boardId}`)
    }
  }, [dispatch, boardId])

  useEffect(() => {
    const onReceiveNewMember = (newMember) => {
      // console.log(`FE I received new member ${newMember._id}`)
      if (board) {
        if (board?.FE_allUsers.some(user => user._id === newMember._id)) return
        const newBoard = cloneDeep(board)
        newBoard?.FE_allUsers.push(newMember)
        // console.log('newBoard: ', newBoard)
        dispatch(updateCurrActiveBoard(newBoard))
      }
    }

    const onReceiveNewOderedColumns = ({ dndOrderedColumnIds, dndOrderedColumns }) => {
      if (board) {
        if (board?.columnOrderIds?.join(',') === dndOrderedColumnIds?.join(',')) return
        const newBoard = cloneDeep(board)
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnIds
        // setBoard(newBoard)
        dispatch(updateCurrActiveBoard(newBoard))
      }
    }

    const onReceiveNewOderedCardsInSameCol = ({ columnId, dndOrderedCardIDs, dndOrderedCards }) => {
      if (board) {
        if (board?.columns?.find(col => col._id === columnId)?.cardOrderIds?.join(',') === dndOrderedCardIDs?.join(',')) return
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(col => col._id === columnId)
        if (columnToUpdate) {
          columnToUpdate.cards = dndOrderedCards
          columnToUpdate.cardOrderIds = dndOrderedCardIDs
        }
        dispatch(updateCurrActiveBoard(newBoard))
      }
    }

    const onReceiveNewOderedCardsInDiffCol = ({ dndOrderedColumnIds, dndOrderedColumns }) => {
      if (board) {
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnIds
        // setBoard(newBoard)
        dispatch(updateCurrActiveBoard(newBoard))

        // let prevCardOrderIds = dndOrderedColumns.find(col => col._id === prevColId)?.cardOrderIds
        // If the column is empty, then the placeholder card is not in cardOrderIds
        // if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
      }
    }

    const onReceiveNewUpdatedCard = (updatedCard) => {
      if (board) {
        dispatch(updateCurrActiveCard(updatedCard))
        dispatch(updateCardInBoard(updatedCard))
      }
    }

    const onReceiveNewUpdatedBoardLabels = (labels) => {
      if (board) {
        if (board?.labels?.join(',') === labels?.join(',')) return
        const newBoard = cloneDeep(board)
        newBoard.labels = labels
        dispatch(updateCurrActiveBoard(newBoard))
      }
    }

    socketIo.on('BE_USER_ACCEPTED_INVITATION', onReceiveNewMember)
    socketIo.on('BE_MOVED_COLUMNS', onReceiveNewOderedColumns)
    socketIo.on('BE_MOVED_CARDS_IN_SAME_COLUMN', onReceiveNewOderedCardsInSameCol)
    socketIo.on('BE_MOVED_CARD_TO_DIFF_COLUMN', onReceiveNewOderedCardsInDiffCol)
    socketIo.on('BE_UPDATED_BOARD_LABELS', onReceiveNewUpdatedBoardLabels)
    socketIo.on('BE_UPDATED_CARD', onReceiveNewUpdatedCard)

    return () => {
      socketIo.off('BE_USER_JOINED_ROOM', onReceiveNewMember)
      socketIo.off('BE_MOVED_COLUMNS', onReceiveNewOderedColumns)
      socketIo.off('BE_MOVED_CARDS_IN_SAME_COLUMN', onReceiveNewOderedCardsInSameCol)
      socketIo.off('BE_MOVED_CARD_TO_DIFF_COLUMN', onReceiveNewOderedCardsInDiffCol)
      socketIo.off('BE_UPDATED_BOARD_LABELS', onReceiveNewUpdatedBoardLabels)
      socketIo.off('BE_UPDATED_CARD', onReceiveNewUpdatedCard)
    }
  }, [board, dispatch])

  // const createNewCol = async (newColData) => {}

  // const createNewCard = async (newCardData) => {}

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    socketIo.emit('FE_MOVED_COLUMNS', { boardId, dndOrderedColumnIds, dndOrderedColumns })

    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    // setBoard(newBoard)
    dispatch(updateCurrActiveBoard(newBoard))

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInSameCol = (dndOrderedCards, dndOrderedCardIDs, columnId) => {
    socketIo.emit('FE_MOVED_CARDS_IN_SAME_COLUMN', { boardId, columnId, dndOrderedCardIDs, dndOrderedCards })
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
    socketIo.emit('FE_MOVED_CARD_TO_DIFF_COLUMN', { boardId, dndOrderedColumnIds, dndOrderedColumns })

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

  if (!board) return <LoadingSpinner caption='Loading Board...' />
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <ActiveCard />
      <AppBar />
      <Box
        sx={{
          background: (theme) =>
            board?.cover
              ? `url(${board?.cover}) no-repeat center center / cover`
              : theme.palette.mode === 'dark'
                ? '#808e9b'
                : '#778beb',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} + ${theme.trelloCustom.boardBarHeight})`
        }}>
        <BoardBar board={board} />
        <BoardContent
          board={board}
          moveColumns={moveColumns}
          moveCardInSameCol={moveCardInSameCol}
          moveCardToDiffCol={moveCardToDiffCol}
        />
      </Box>
    </Container>
  )
}

export default Board
