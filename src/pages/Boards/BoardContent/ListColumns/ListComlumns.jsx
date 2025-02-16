import Box from '@mui/material/Box'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
function ListComlumns({ columns }) {
  const [openNewColForm, setOpenNewColForm] = useState(false)
  const toggleOpenNewColForm = () => {
    setOpenNewColForm(!openNewColForm)
    setNewColTitle('')
  }
  const [newColTitle, setNewColTitle] = useState('')

  const addNewCol = () => {
    if (!newColTitle) {
      toast.error('Please enter column title!')
      return
    }

    toggleOpenNewColForm()
  }
  return (<>
    {/* The <SortableContext> component expects a sorted array of unique identifiers associated with each sortable item via the items attribute. This array should be ['1', '2', '3'] rather than [{id: '1'}, {id: '2}, {id: '3}].

    All we need to do is map your items array to an array of strings that reflect each item's unique identification.
    */}
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        backgroundColor: 'inherit',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        display: 'flex',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => (<Column key={column._id} column={column} />))}
        {!openNewColForm ? (
          <Box
            onClick={toggleOpenNewColForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: 2,
              height: 'fit-content',
              backgroundColor: '#ffffff3d'
            }}>
            <Button sx={{ color: 'white', p: 2, width: '100%', justifyContent: 'flex-start' }} startIcon={<AddIcon />}>Add New Column</Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: 2,
              height: 'fit-content',
              backgroundColor: '#ffffff3d'
            }}>
            <TextField
              label='Enter title...'
              variant='outlined'
              autoFocus
              type='text'
              size='small'
              onChange={(e) => setNewColTitle(e.target.value)} value={newColTitle}
              sx={{
                width: '100%',
                '& input': { color: 'white' },
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2
              }}>
              <Button variant='contained' size='small'
                onClick={addNewCol}
                sx={{
                  color: 'white',
                  boxShadow: 'none',
                  border: '0.2px solid',
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': { backgroundColor: (theme) => theme.palette.primary.dark }
                }}>
                Add Column
              </Button>
              <CloseIcon fontSize='medium'
                onClick={toggleOpenNewColForm}
                sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.light } }} />
            </Box>
          </Box>
        )}

      </Box>
    </SortableContext>

  </>)
}

export default ListComlumns