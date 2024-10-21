import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: ({ trelloCustom }) => `calc(100vh - ${trelloCustom.appBarHeight} - ${trelloCustom.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
      Board Content
    </Box>
  )
}

export default BoardContent