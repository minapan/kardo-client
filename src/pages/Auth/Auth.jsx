import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrUser, setUserFromGoogle } from '~/redux/user/userSlice'
import { useEffect } from 'react'
import { getGGCallbackAPI } from '~/apis'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'
import ForgotPasswordForm from './ForgotPasswordForm'

function Auth() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isForgot = location.pathname === '/forgot-password'
  const isGGCallback = location.pathname === '/auth/callback'
  const currUser = useSelector(selectCurrUser)
  useEffect(() => {
    const fetchUserData = async () => {
      if (isGGCallback && !currUser) {
        try {
          const result = await getGGCallbackAPI()
          dispatch(setUserFromGoogle(result))
          toast.success('Đăng nhập bằng Google thành công!')
          navigate('/')
        } catch (error) {
          toast.error('Đăng nhập bằng Google thất bại')
          navigate('/login')
        }
      } else if (currUser) {
        navigate('/')
      }
    }

    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currUser, isGGCallback])

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
      {isGGCallback && (
        <LoadingSpinner caption='Loading...' />
      )}
      {isForgot && <ForgotPasswordForm />}
    </Box>
  )
}

export default Auth