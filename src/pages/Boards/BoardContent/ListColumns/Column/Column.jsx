import { Box, Button, TextField, Typography } from '@mui/material'
import { Tooltip, Menu, MenuItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import Cloud from '@mui/icons-material/Cloud'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { AddCard, ContentCopy, ContentPaste } from '@mui/icons-material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCard from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Check } from '@mui/icons-material'
import { toast } from 'react-toastify'

function Column({ column, createNewCard }) {
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
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
    await createNewCard(newCardData)

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
          borderRadius: 2,
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
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >{column?.title}</Typography>
            <Box>
              <Tooltip title="More options">
                <MoreHorizIcon
                  sx={{ cursor: 'pointer' }}
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
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCard fontSize="small" /></ListItemIcon>
                  <ListItemText>Add Card</ListItemText>
                  <Typography variant="body2" color="text.secondary"> ⌘N</Typography>
                </MenuItem>
                <MenuItem>
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
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
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
                <Button onClick={toggleOpenNewCardForm} startIcon={<AddCard />}>Add Card</Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
            ) : (
              <Box
                data-no-dnd='true'
                sx={{
                  height: '100%',
                  gap: 2,
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
                <Check fontSize='small'
                  onClick={addNewCard}
                  sx={{ cursor: 'pointer', color: (theme) => theme.palette.success.light }} />
                <CloseIcon fontSize='small'
                  onClick={toggleOpenNewCardForm}
                  sx={{ cursor: 'pointer', color: (theme) => theme.palette.warning.light }} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Column