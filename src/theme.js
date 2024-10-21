// import { createTheme } from '@mui/material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, cyan, pink, purple } from '@mui/material/colors'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '68px',
    boardBarHeight: '88px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
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