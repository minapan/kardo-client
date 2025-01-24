import { Box } from '@mui/material'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      color: 'white',
      width: '100%',
      height: ({ trelloCustom }) => trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      Board Bar
    </Box>
  )
}

export default BoardBar