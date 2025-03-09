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

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currUser = useSelector(selectCurrUser)

  return (
    <Routes>
      <Route path='/' element={
        <div>
          <h1>Home Page</h1>
        </div>}
      />

      <Route element={<ProtectedRoute user={currUser} />}>
        <Route path='/b/:boardId' element={<Board />} />
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verify' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
