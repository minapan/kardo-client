import Box from '@mui/material/Box'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
function ListComlumns({ columns }) {
  return (<>
    {/* The <SortableContext> component expects a sorted array of unique identifiers associated with each sortable item via the items attribute. This array should be ["1", "2", "3"] rather than [{id: "1"}, {id: "2}, {id: "3}].

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
        <Box sx={{
          minWidth: '180px',
          maxWidth: '180px',
          mx: 2,
          borderRadius: 2,
          height: 'fit-content',
          backgroundColor: '#ffffff3d'
        }}>
          <Button sx={{ color: 'white', p: 2, width: '100%', justifyContent: 'flex-start' }} startIcon={<AddIcon />}>Add Column</Button>
        </Box>
      </Box>
    </SortableContext>

  </>)
}

export default ListComlumns