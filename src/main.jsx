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
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store)

import { injectStore } from './utils/authorizeAxios'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
