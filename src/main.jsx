import CssBaseline from '@mui/material/CssBaseline' // on top to fix error in v5
import { GlobalStyles } from '@mui/material'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import '~/index.css'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store)

import { injectStore } from './utils/authorizeAxios'
import ToastContainer from './components/ToastContainer/ToastContainer'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider
            defaultOptions={{ confirmationButtonProps: { color: 'secondary', variant: 'outlined' } }}
          >
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter >
    </PersistGate>
  </Provider >
)
