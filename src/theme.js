// import { createTheme } from '@mui/material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, pink, purple } from '@mui/material/colors'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '68px',
    boardBarHeight: '88px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          // main: '#344850'
          main: '#3063d9'
        },
        secondary: cyan
      }
    },
    dark: {
      palette: {
        primary: purple,
        secondary: pink
      }
    }
  }
})

export default theme