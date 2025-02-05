import Box from '@mui/material/Box'
import ListComlumns from './ListColumns/ListComlumns'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      pb: '16px',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
    }}>
      <ListComlumns />
    </Box>
  )
}

export default BoardContent