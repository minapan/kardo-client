import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import '~/index.css'
import { CssBaseline } from '@mui/material'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
    <ToastContainer
      position="bottom-right"
      closeOnClick={true}
      pauseOnHover
      theme="colored"
      limit={3}
    />
  </CssVarsProvider>
  // </React.StrictMode>
)
