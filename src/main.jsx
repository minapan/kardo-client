import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import '~/index.css'
import { CssBaseline } from '@mui/material'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{ confirmationButtonProps: { color: 'secondary', variant: 'outlined' } }}
        >
          <CssBaseline />
          <App />
          <ToastContainer
            position="bottom-right"
            closeOnClick={true}
            pauseOnHover
            theme="colored"
            limit={3}
          />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
