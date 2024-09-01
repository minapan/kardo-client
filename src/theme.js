// import { createTheme } from '@mui/material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#448aff'
        },
        secondary: {
          main: '#2196f3'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#aa00ff'
        },
        secondary: {
          main: '#EAFAF1'
        }
      }
    }
  }
})

export default theme