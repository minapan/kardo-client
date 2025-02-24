import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <div>
          <h1>Home Page</h1>
        </div>}
      />
      <Route path='/b/:boardId' element={<Board />} />

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verify' element={<AccountVerification />} />

      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
