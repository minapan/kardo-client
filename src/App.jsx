import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrUser } from './redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import Boards from './pages/Boards'
import Require2FA from './components/Modal/2FA/Require2FA'
import LandingPage from './pages/LandingPage/Landingpage'

const Require2FALayout = ({ user, children }) => {
  if (user?.require_2fa && !user?.is_2fa_verified) return <Require2FA />
  return children
}

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return (
    <Require2FALayout user={user}>
      <Outlet />
    </Require2FALayout>
  )
}

function App() {
  const currUser = useSelector(selectCurrUser)

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route element={<ProtectedRoute user={currUser} />}>
        <Route path='/b/:boardId' element={<Board />} />
        <Route path='/boards' element={<Boards />} />
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/auth/callback' element={<Auth />} />
      <Route path='/forgot-password' element={<Auth />} />
      <Route path='/account/verify' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
