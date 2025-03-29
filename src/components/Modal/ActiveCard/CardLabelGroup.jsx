import { useState } from 'react'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import {
  Chip,
  TextField,
  Button,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Divider
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { initLabels, predefinedColors } from '~/utils/constants'

function CardLabelGroup({ cardLabelIds = [], board, onUpdateCardLabels, anchorEl, onClose }) {
  // const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorEl)
  const popoverId = isOpenPopover ? 'card-labels-popover' : undefined

  // const handleTogglePopover = (event) => {
  //   if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
  //   else setAnchorPopoverElement(null)
  // }

  const [editLabel, setEditLabel] = useState(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [newLabelName, setNewLabelName] = useState('')
  const [newLabelColor, setNewLabelColor] = useState('#000000')

  const allLabels = [
    ...initLabels,
    ...(board?.labels || []).filter(
      label => !initLabels.some(preset => preset.id === label.id)
    )
  ]

  const handleUpdateCardLabels = (labelId, action) => {
    const labelInfo = {
      labelId,
      action
    }
    onUpdateCardLabels(labelInfo)
  }

  const handleEditLabel = (label) => {
    if (label.isDefault) return
    setEditLabel(label)
    setIsCreatingNew(false)
    setNewLabelName(label.name)
    setNewLabelColor(label.color)
  }

  const handleShowCreateNew = () => {
    setEditLabel(null)
    setIsCreatingNew(true)
    setNewLabelName('')
    setNewLabelColor('#000000')
  }

  const handleSaveLabel = () => {
    if (!newLabelName.trim()) return

    if (editLabel) {
      const updatedLabel = { ...editLabel, name: newLabelName, color: newLabelColor }
      onUpdateCardLabels({ action: 'UPDATE', updatedLabel })
    } else if (isCreatingNew) {
      const newLabel = { id: `label-${Date.now()}`, name: newLabelName, color: newLabelColor }
      onUpdateCardLabels({ action: 'CREATE', newLabel })
    }

    setEditLabel(null)
    setIsCreatingNew(false)
    setNewLabelName('')
    setNewLabelColor('#000000')
  }

  const handleDeleteLabel = (labelId) => {
    onUpdateCardLabels({ action: 'DELETE', labelId })
  }

  const handleCancel = () => {
    setEditLabel(null)
    setIsCreatingNew(false)
    setNewLabelName('')
    setNewLabelColor('#000000')
  }

  return (
    <Popover
      id={popoverId}
      open={isOpenPopover}
      // anchorEl={anchorPopoverElement}
      // onClose={handleTogglePopover}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box sx={{ p: 2, maxWidth: '350px' }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Available Labels
        </Typography>
        <Table size="small">
          <TableBody>
            {allLabels.map((label) => (
              <TableRow key={label.id}>
                <TableCell sx={{ p: 0.5, width: '10%' }}>
                  <Checkbox
                    size="small"
                    checked={cardLabelIds.includes(label.id)}
                    onChange={(e) =>
                      handleUpdateCardLabels(label.id, e.target.checked ? 'ADD' : 'REMOVE')
                    }
                  />
                </TableCell>
                <TableCell sx={{ p: 0.5 }}>
                  <Chip
                    label={label.name}
                    size="small"
                    sx={{
                      backgroundColor: label.color,
                      borderRadius: 1,
                      height: 32,
                      maxWidth: '220px',
                      color: '#fff',
                      width: '100%',
                      '&:hover': { backgroundColor: label.color, opacity: 0.8 },
                      cursor: label.isDefault ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => handleEditLabel(label)}
                  />
                </TableCell>
                {<TableCell sx={{ p: 0.5, width: '10%' }}>
                  <IconButton color='error' size="small" onClick={() => handleDeleteLabel(label.id)}
                    disabled={label.isDefault}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 1 }}>
          <Chip
            label="+ New Custom Label"
            sx={{
              backgroundColor: '#e0e0e0',
              color: '#172b4d',
              height: 32,
              width: '100%',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#ccc' }
            }}
            onClick={handleShowCreateNew}
          />
        </Box>

        {(editLabel || isCreatingNew) && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              {editLabel ? 'Edit Label' : 'Create New Label'}
            </Typography>
            <TextField
              label="Label Name"
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 1 }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
                Select Color
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  maxHeight: '100%',
                  overflowY: 'auto'
                }}
              >
                {predefinedColors.map((color) => (
                  <Box
                    key={color}
                    onClick={() => setNewLabelColor(color)}
                    sx={{
                      width: '100%',
                      height: 32,
                      backgroundColor: color,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: newLabelColor === color ? '3px solid #1976d2' : '2px solid transparent',
                      transition: 'border 0.2s ease',
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="outlined" size="small" onClick={handleSaveLabel}>
                Save
              </Button>
              <Button variant="text" size="small" onClick={handleCancel} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d') }} >
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popover>
  )
}

export default CardLabelGroup