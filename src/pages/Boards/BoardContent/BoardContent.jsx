import Box from '@mui/material/Box'
import ListComlumns from './ListColumns/ListComlumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      width: '100%',
      pb: '16px',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
    }}>
      <ListComlumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent