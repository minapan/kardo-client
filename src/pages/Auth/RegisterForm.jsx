import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { IconButton, InputAdornment, Card } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { Google } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { ggAuthAPI } from '~/redux/user/userSlice'

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPasswordComfirm = () => setShowPasswordConfirm((show) => !show)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(
      registerUserAPI({ email, password }),
      { loading: 'Signing...' }
    ).then(user => {
      navigate(`/login?registered=${user.email}`)
    })
  }

  const handleGoogleLogin = () => {
    dispatch(ggAuthAPI())
  }
  return (
    <form onSubmit={handleSubmit(submitRegister)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Zoom in={true} timeout={400} style={{ transitionTimingFunction: 'ease-out' }}>
        <Card
          sx={{
            minWidth: 380,
            maxWidth: 380,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            borderRadius: 3
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              padding: '2em 2.5em 1em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.5,
              background: '#0079BF',
              color: '#fff'
            }}
          >
            <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main' }}>
              <TrelloIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
              Create Account
            </Typography>
          </Box>

          {/* Input Fields */}
          <Box sx={{ padding: '1em 2em 1.5em' }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="medium"
              error={!!errors.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#fff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                },
                '& .MuiInputLabel-root': { color: '#5E6C84' }
              }}
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName="email" />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              size="medium"
              error={!!errors.password}
              sx={{
                marginTop: '0.5em',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#fff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                },
                '& .MuiInputLabel-root': { color: '#5E6C84' }
              }}
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: '#91A1B7', '&:hover': { color: '#0079BF' } }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FieldErrorAlert errors={errors} fieldName="password" />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showPasswordConfirm ? 'text' : 'password'}
              variant="outlined"
              size="medium"
              error={!!errors.password_confirmation}
              sx={{
                marginTop: '0.5em',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#fff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                },
                '& .MuiInputLabel-root': { color: '#5E6C84' }
              }}
              {...register('password_confirmation', {
                required: FIELD_REQUIRED_MESSAGE,
                validate: (value) => value === watch('password') || PASSWORD_CONFIRMATION_MESSAGE
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPasswordComfirm}
                      edge="end"
                      sx={{ color: '#91A1B7', '&:hover': { color: '#0079BF' } }}
                    >
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FieldErrorAlert errors={errors} fieldName="password_confirmation" />
          </Box>

          {/* Actions Section */}
          <Box sx={{ padding: '0 2em 2.5em', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: '#0079BF',
                color: '#fff',
                fontWeight: 600,
                padding: '0.75em',
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0, 121, 191, 0.3)',
                '&:hover': {
                  backgroundColor: '#026AA7',
                  boxShadow: '0 4px 12px rgba(0, 121, 191, 0.4)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Register
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#91A1B7', fontWeight: 500 }}>
              or continue with
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              fullWidth
              sx={{
                textTransform: 'none',
                color: '#172B4D',
                borderColor: '#E0E4E9',
                backgroundColor: '#fff',
                padding: '0.75em',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: '#F7F8FA',
                  borderColor: '#D1D6DD',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Google
            </Button>
          </Box>

          {/* Footer Section */}
          <Box sx={{ padding: '0 2.5em 2em', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#91A1B7', fontWeight: 500 }}>
              Already have an account?
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#0079BF',
                  fontWeight: 600,
                  '&:hover': { color: '#026AA7', textDecoration: 'underline' },
                  transition: 'color 0.2s ease'
                }}
              >
                Log in
              </Typography>
            </Link>
          </Box>
        </Card>
      </Zoom>
    </form>
  )
}

export default RegisterForm
