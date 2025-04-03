import Box from '@mui/material/Box'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { createNewColAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCurrActiveBoard, updateCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import toast from 'react-hot-toast'
import { IconButton } from '@mui/material'
function ListComlumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrActiveBoard)

  const [openNewColForm, setOpenNewColForm] = useState(false)
  const toggleOpenNewColForm = () => {
    setOpenNewColForm(!openNewColForm)
    setNewColTitle('')
  }
  const [newColTitle, setNewColTitle] = useState('')

  const addNewCol = async () => {
    if (!newColTitle) {
      toast.error('Please enter column title!')
      return
    }

    const newColData = { title: newColTitle }

    // createNewCol(newColData)
    // Call API
    const createdCol = await createNewColAPI({ ...newColData, boardId: board._id })

    createdCol.cards = [generatePlaceholderCard(createdCol)]
    createdCol.cardOrderIds = [generatePlaceholderCard(createdCol)._id]

    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdCol)
    newBoard.columnOrderIds.push(createdCol._id)
    // setBoard(newBoard)
    dispatch(updateCurrActiveBoard(newBoard))

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
        display: 'flex',
        zIndex: 1,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => (
          <Column key={column._id} column={column} />
        ))}
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
            <Button
              sx={{ color: 'white', p: 2, width: '100%', justifyContent: 'flex-start' }}
              startIcon={<AddIcon />}>
              Add New Column
            </Button>
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
                className='interceptor-loading'
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
              <IconButton onClick={toggleOpenNewColForm}>
                <CloseIcon fontSize='medium'
                  sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Box>
        )}

      </Box>
    </SortableContext>

  </>)
}

export default ListComlumns