import Box from '@mui/material/Box'
import Columns from './Column/Column'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
function ListComlumns({ columns }) {
  return (<>
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      overflowX: 'auto',
      display: 'flex',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {columns?.map(column => (<Columns key={column._id} column={column}/>))}
      <Box sx={{
        width: '200px',
        mx: 2,
        borderRadius: 2,
        height: 'fit-content',
        backgroundColor: '#ffffff3d'
      }}>
        <Button sx={{ color: 'white', p: 2, width: '100%', justifyContent: 'flex-start' }} startIcon={<AddIcon />}>Add Column</Button>
      </Box>
    </Box>
  </>)
}

export default ListComlumns