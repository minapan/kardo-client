import SelectMode from '../SelectMode'
import { Box } from '@mui/material'

function AppBar() {
  return (
    <>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.light',
        height: ({ trelloCustom }) => trelloCustom.appBarHeight,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <SelectMode />
      </Box>
    </>
  )
}

export default AppBar