import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Checklist from './Checklist'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { v4 as uuidv4 } from 'uuid'

function ChecklistGroup({ checklists = [], onUpdateCardChecklists }) {
  const [isAddingChecklist, setIsAddingChecklist] = useState(false)
  const [newChecklistTitle, setNewChecklistTitle] = useState('')

  const handleAddChecklist = () => {
    if (!newChecklistTitle.trim()) return

    const newChecklist = {
      title: newChecklistTitle,
      items: [],
      id: `checklist-${uuidv4().slice(0, 22)}`
    }

    onUpdateCardChecklists({
      action: 'ADD_CHECKLIST',
      newChecklist
    })

    setNewChecklistTitle('')
    setIsAddingChecklist(false)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '20px !important',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TaskAltIcon fontSize="small" />
          Checklists
        </Typography>

        {!isAddingChecklist && (
          <Button
            variant="text"
            size="small"
            onClick={() => setIsAddingChecklist(true)}
          >
            + Add Checklist
          </Button>
        )}
      </Box>

      {isAddingChecklist && (
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Checklist Title"
            value={newChecklistTitle}
            onChange={(e) => setNewChecklistTitle(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddChecklist()
            }}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddChecklist}
              disabled={!newChecklistTitle.trim()}
            >
              Add
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setIsAddingChecklist(false)}
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d'),
                textTransform: 'none',
                fontWeight: '500'
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {checklists.map((checklist) => (
        <Checklist
          key={checklist.id}
          checklist={checklist}
          onUpdateCardChecklists={onUpdateCardChecklists}
        />
      ))}
    </Box>
  )
}

export default ChecklistGroup