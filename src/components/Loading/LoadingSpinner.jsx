import { Box, CircularProgress, Typography } from '@mui/material'

function LoadingSpinner({ caption }) {
  return (
    <Box sx={{ height: '100vh', display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>{caption}</Typography>
    </Box>
  )
}

export default LoadingSpinner