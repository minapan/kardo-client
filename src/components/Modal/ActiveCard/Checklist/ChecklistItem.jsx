import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

function ChecklistItem({ item, checklistId, onUpdateCardChecklists }) {
  const handleToggleItem = () => {
    onUpdateCardChecklists({
      checklistId,
      itemId: item.id,
      action: 'TOGGLE_ITEM'
    })
  }

  const handleDeleteItem = () => {
    onUpdateCardChecklists({
      checklistId,
      itemId: item.id,
      action: 'DELETE_ITEM'
    })
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Checkbox
        checked={item.completed}
        onChange={handleToggleItem}
        size="small"
        sx={{ p: 0.5 }}
      />
      <Typography
        variant="body2"
        sx={{
          flexGrow: 1,
          textDecoration: item.completed ? 'line-through' : 'none',
          color: item.completed ? '#888' : '#171f2b'
        }}
      >
        {item.name}
      </Typography>
      <IconButton size="small" onClick={handleDeleteItem} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#dfe1e6' : '#172b4d') }}>
        <DeleteIcon fontSize="small" sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Box>
  )
}

export default ChecklistItem