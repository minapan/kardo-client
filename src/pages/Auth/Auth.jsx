import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrUser } from '~/redux/user/userSlice'
import { Navigate } from 'react-router-dom'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  // const isForgot = location.pathname === '/forgot-password'

  const currUser = useSelector(selectCurrUser)
  if (currUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'url("https://picsum.photos/1920/1080")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
    }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
      {/* {isForgot && <ForgotPasswordForm />} */}
    </Box>
  )
}

export default Auth