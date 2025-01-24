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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0.5rem 1rem'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          }
        })
      }
    }
  }
})

export default theme