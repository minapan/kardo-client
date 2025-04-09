import { Box, Button, TextField } from '@mui/material'
import { Tooltip, Menu, MenuItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { AddCard } from '@mui/icons-material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Check } from '@mui/icons-material'
import { useConfirm } from 'material-ui-confirm'
import { createNewCardAPI, deleteColDetailsAPI, updateColDetailsAPI } from '~/apis'
import { cloneDeep } from 'lodash'
import { selectCurrActiveBoard, updateCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { socketIo } from '~/socketClient'

function Column({ column }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrActiveBoard)

  const orderedCards = column.cards
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter card title!')
      return
    }

    const newCardData = { title: newCardTitle, columnId: column._id }

    // createNewCard(newCardData)
    // Call API
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })

    socketIo.emit('FE_CREATED_NEW_CARD', { createdCard, boardId: board._id })
    // const newBoard = { ...board }
    onCreateNewCard(createdCard)

    toggleOpenNewCardForm()
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirm = useConfirm()
  const handleDeleteColumn = () => {
    confirm({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DeleteIcon sx={{ color: 'warning.dark' }} /> DELETE COLUMN ?
      </Box>,
      description: 'This action is permanently delete your column and its cards! Are you sure?',
      confirmationText: 'Yes'
    })
      .then(() => {
        // deleteColDetails(column._id)
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter(col => col._id !== column._id)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)

        socketIo.emit('FE_DELETED_COLUMN', { deletedColId: column._id, boardId: board._id })
        dispatch(updateCurrActiveBoard(newBoard))

        deleteColDetailsAPI(column._id)
      })
      .catch(() => { })
  }

  useEffect(() => {
    const onReceiveDeleteColumn = (deletedColId) => {
      if (board) {
        if (column?._id !== deletedColId) return
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter(col => col._id !== deletedColId)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== deletedColId)

        dispatch(updateCurrActiveBoard(newBoard))
      }
    }

    const onReceiveCreateNewCard = (createdCard) => {
      if (board) {
        if (column?.cards.some(c => c._id === createdCard._id)) return
        onCreateNewCard(createdCard)
      }
    }

    socketIo.on('BE_DELETED_COLUMN', onReceiveDeleteColumn)
    socketIo.on('BE_CREATED_NEW_CARD', onReceiveCreateNewCard)

    return () => {
      socketIo.off('BE_DELETED_COLUMN', onReceiveDeleteColumn)
      socketIo.off('BE_CREATED_NEW_CARD', onReceiveCreateNewCard)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, dispatch])

  const onCreateNewCard = (createdCard) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(col => col._id === createdCard.columnId)
    if (columnToUpdate) {
      // Insert the new card and remove the placeholder card
      if (columnToUpdate.cards.some(card => card.FE_Placeholder)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }
      // Insert the new card
      else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrActiveBoard(newBoard))
  }

  const onUpdateColumnTitle = async (newTitle) => {
    await updateColDetailsAPI(column._id, { title: newTitle }).then(() => {
      const newBoard = cloneDeep(board)
      const columnToUpdate = newBoard.columns.find(col => col._id === column._id)
      if (columnToUpdate) {
        columnToUpdate.title = newTitle
      }
      dispatch(updateCurrActiveBoard(newBoard))
    })
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    // touchAction: 'none', //for Pointer Events to prevent the default behaviour of the browser on touch devices
    // fix bug stretch
    // transform: CSS.Transform.toString(transform),
    transform: CSS.Translate.toString(transform),
    transition,
    // fix bug dragging the column short through the long column (Must combine with {...listeners} in the Box to avoid pulling into the empty area of the column)
    height: '100%',
    opacity: isDragging ? 0.5 : 1,
    border: 'none'
  }
  return (
    // fix height column bug
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '272px',
          maxWidth: '272px',
          borderRadius: 3,
          ml: 2,
          zIndex: 10,
          height: 'fit-content',
          position: 'relative',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`,
          backgroundColor: isDragging ? ((theme) => theme.palette.mode === 'dark' ? '#dff9fb' : '#535c68') : ((theme) => theme.palette.mode === 'dark' ? '#535c68' : '#fff')
        }}
      >
        <Box sx={{ visibility: isDragging ? 'hidden' : 'visible' }}>
          <Box sx={{
            height: (theme) => theme.trelloCustom.collumnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          >
            {/* <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {column?.title}
            </Typography> */}
            <ToggleFocusInput data-no-dnd='true' value={column?.title} onChangedValue={onUpdateColumnTitle} />
            <Box>
              <Tooltip title="More options">
                <MoreHorizIcon
                  sx={{
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 2,
                    verticalAlign: 'middle',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.15)' }
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                sx={{ mt: 2 }}
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem
                  onClick={toggleOpenNewCardForm}
                  sx={{
                    '&:hover': {
                      color: 'primary.dark',
                      '& .add-card, & .ctrl-n': { color: 'primary.dark' }
                    }
                  }}
                >
                  <ListItemIcon><AddCard className='add-card' fontSize="small" /></ListItemIcon>
                  <ListItemText>Add Card</ListItemText>
                  {/* <Typography variant="body2" className='ctrl-n' color="text.secondary"> ⌘N</Typography> */}
                </MenuItem>
                {/* <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" color="text.secondary"> ⌘X</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" color="text.secondary"> ⌘C</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" color="text.secondary"> ⌘V</Typography>
                </MenuItem> */}
                <Divider />
                <MenuItem
                  onClick={handleDeleteColumn}
                  sx={{
                    '&:hover': {
                      color: 'warning.dark',
                      '& .delete-icon': { color: 'warning.dark' }
                    }
                  }}
                >
                  <ListItemIcon><DeleteIcon className='delete-icon' fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                {/* <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem> */}
              </Menu>
            </Box>
          </Box>
          {/* collumn content */}
          <ListCard cards={orderedCards} />
          {/* collumn footer */}
          <Box sx={{
            height: (theme) => theme.trelloCustom.collumnFooterHeight,
            p: 2
          }}
          >
            {!openNewCardForm ? (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <Button size='small' onClick={toggleOpenNewCardForm} startIcon={<AddCard />}
                  sx={{ p: 1, fontSize: '12px' }}>
                  Add a card</Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon sx={{
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 2,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.15)' }
                  }} />
                </Tooltip>
              </Box>
            ) : (
              <Box
                data-no-dnd='true'
                sx={{
                  height: '100%',
                  gap: 1.5,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <TextField
                  label="Enter title..."
                  variant='outlined'
                  autoFocus
                  type="text"
                  size='small'
                  onChange={(e) => setNewCardTitle(e.target.value)} value={newCardTitle}
                />
                <Check
                  className='interceptor-loading'
                  fontSize='medium'
                  onClick={addNewCard}
                  sx={{ color: 'white', borderRadius: 2, cursor: 'pointer', bgcolor: (theme) => theme.palette.success.light }} />
                <CloseIcon fontSize='medium'
                  onClick={toggleOpenNewCardForm}
                  sx={{ color: 'white', borderRadius: 2, cursor: 'pointer', bgcolor: (theme) => theme.palette.warning.light }} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Column