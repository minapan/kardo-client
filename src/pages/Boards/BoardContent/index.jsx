import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box sx={{
      color: 'white',
      width: '100%',
      height: ({ trelloCustom }) => `calc(100vh - ${trelloCustom.appBarHeight} - ${trelloCustom.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
    }}>
      Board Content
    </Box>
  )
}

export default BoardContent