// import { createTheme } from '@mui/material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { blue, cyan, pink, purple } from '@mui/material/colors'
const APP_BAR_HEIGHT = '68px'
const BOARD_BAR_HEIGHT = '88px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLLUMN_HEADER_HEIGHT = '50px'
const COLLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    collumnHeaderHeight: COLLUMN_HEADER_HEIGHT,
    collumnFooterHeight: COLLUMN_FOOTER_HEIGHT
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: blue,
  //       secondary: cyan
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: purple,
  //       secondary: pink
  //     }
  //   }
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#e6e6e6',
            borderRadius: '6px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#fff'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0.5rem 1rem',
          userSelect: 'none'
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            //   borderColor: theme.palette.primary.light
            // },
            // '&:hover': {
            //   '.MuiOutlinedInput-notchedOutline': {
            //     borderColor: theme.palette.primary.main
            //   }
            '& fieldset': { borderWidth: '0.5px !important' },
            '&:hover fieldset': { borderWidth: '1px !important' },
            '&.Mui-focused fieldset': { borderWidth: '1px !important' }
          }
        })
      }
    }
  }
})

export default theme