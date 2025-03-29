import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import ChecklistItem from './ChecklistItem'
import { v4 as uuidv4 } from 'uuid'
import { useConfirm } from 'material-ui-confirm'

function Checklist({ checklist, onUpdateCardChecklists }) {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [hideCompleted, setHideCompleted] = useState(false)

  const completedCount = checklist.items.filter((item) => item.completed).length
  const totalCount = checklist.items.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const filteredItems = hideCompleted
    ? checklist.items.filter((item) => !item.completed)
    : checklist.items

  const handleAddItem = () => {
    if (!newItemName.trim()) return

    const newItem = {
      id: `item-${uuidv4().slice(0, 22)}`,
      name: newItemName,
      completed: false
    }

    onUpdateCardChecklists({
      checklistId: checklist.id,
      action: 'ADD_ITEM',
      newItem
    })

    setNewItemName('')
    setIsAddingItem(false)
  }

  const confirm = useConfirm()

  const handleDeleteChecklist = () => {
    confirm({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DeleteIcon sx={{ color: 'warning.dark' }} /> DELETE CHECKLIST ?
      </Box>,
      description: 'This action is permanently delete your checklist and its items! Are you sure?',
      confirmationText: 'Yes'
    }).then(() => {
      onUpdateCardChecklists({
        checklistId: checklist.id,
        action: 'DELETE_CHECKLIST'
      })
    }).catch(() => { })
  }

  const toggleHideCompleted = () => {
    setHideCompleted((prev) => !prev)
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2f3542' : '#fff'),
        boxShadow: '0 1px 0 rgba(9, 30, 66, 0.25)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {checklist.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {totalCount > 0 && completedCount > 0 && (
            <Button
              variant="text"
              size="small"
              onClick={toggleHideCompleted}
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d'),
                fontSize: '14px'
              }}
            >
              {hideCompleted
                ? `Show completed (${completedCount})`
                : 'Hide completed'}
            </Button>
          )}
          <Button size="small" onClick={handleDeleteChecklist} sx={{
            color: 'red',
            fontSize: '14px'
          }}>
            Delete
          </Button>
        </Box>
      </Box>
      {totalCount > 0 && (
        <>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '12px'
              }}
            >
              {Math.round(progress)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                flexGrow: 1,
                height: 6,
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#3b4252' : '#dfe1e6',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: progress === 100 ? '#5aac44' : '#546de5'
                }
              }}
            />
          </Box>
          {(totalCount === completedCount && hideCompleted) &&
            <Typography
              variant="body2"
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d'),
                ml: 5, mt: -1,
                fontSize: '16px'
              }}
            >
              Everything on this list has been completed!
            </Typography>
          }
        </>
      )}
      {filteredItems.map((item) => (
        <ChecklistItem
          key={item.id}
          item={item}
          checklistId={checklist.id}
          onUpdateCardChecklists={onUpdateCardChecklists}
        />
      ))}
      {isAddingItem ? (
        <Box sx={{ mt: 1, ml: 4 }}>
          <TextField
            placeholder="Add an item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddItem()
            }}
            sx={{
              mb: 1,
              '& .MuiInputBase-root': {
                borderRadius: 1
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddItem}
              disabled={!newItemName.trim()}
            >
              Add
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setIsAddingItem(false)}
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d')
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          variant="text"
          size="small"
          onClick={() => setIsAddingItem(true)}
          sx={{
            mt: 1,
            ml: 3,
            p: 1,
            color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d')
          }}
        >
          + Add an item
        </Button>
      )}
    </Box>
  )
}

export default Checklist