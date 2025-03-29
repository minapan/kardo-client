import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Card, IconButton, InputAdornment } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { forgotPasswordAPI, resetPasswordAPI } from '~/apis'

function ForgotPasswordForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPasswordComfirm = () => setShowPasswordConfirm((show) => !show)

  const [cooldown, setCooldown] = useState(0)

  const submitForgotPassword = (data) => {
    const { email, password, otpToken } = data
    toast.promise(
      resetPasswordAPI({ email, password, otpToken }),
      { loading: 'Logging...' }
    ).then(res => {
      if (!res.error) {
        toast.success('Reset password successfully! Please login again.')
        navigate('/login')
      }
    })
  }

  const handleGetOTP = (data) => {
    const { email } = data
    toast.promise(
      forgotPasswordAPI({ email }),
      { loading: 'Logging...' }
    ).then(res => {
      if (!res.error) {
        toast.success('Please check your email to reset password!')
        setCooldown(60)
        const timer = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitForgotPassword)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
              Reset Password
            </Typography>
          </Box>

          {/* Instruction Section */}
          <Box sx={{ padding: '1em 2em 0' }}>
            <Typography variant="body2" sx={{ color: '#5E6C84', textAlign: 'center' }}>
              Enter your email to receive an OTP and reset your password.
            </Typography>
          </Box>

          {/* Input Fields */}
          <Box sx={{ padding: '1em 2em 1.5em' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
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
              <Button
                variant={cooldown > 0 ? 'outlined' : 'contained'}
                size="medium"
                onClick={handleSubmit(handleGetOTP)}
                disabled={cooldown > 0}
                sx={{
                  height: '58px',
                  background: cooldown > 0 ? 'unset' : '#0079BF',
                  color: '#fff',
                  borderRadius: 2,
                  padding: '0.5em 1em',
                  '&:disabled': {
                    color: 'rgba(0, 121, 191, 0.5)',
                    borderColor: 'rgba(0, 121, 191, 0.5)'
                  }
                }}
              >
                {cooldown > 0 ? `${cooldown}s` : 'Get OTP'}
              </Button>
            </Box>
            <FieldErrorAlert errors={errors} fieldName="email" />

            {/* OTP Field */}
            <TextField
              fullWidth
              label="OTP"
              type="text"
              variant="outlined"
              size="medium"
              error={!!errors.otpToken}
              sx={{
                marginTop: '0.5em',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#fff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                },
                '& .MuiInputLabel-root': { color: '#5E6C84' }
              }}
              {...register('otpToken', {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'OTP must be a 6-digit number'
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName="otpToken" />

            {/* New Password Field */}
            <TextField
              fullWidth
              label="New Password"
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

            {/* Confirm New Password Field */}
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPasswordConfirm ? 'text' : 'password'}
              variant="outlined"
              size="medium"
              error={!!errors.confirmPassword}
              sx={{
                marginTop: '0.5em',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#fff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                },
                '& .MuiInputLabel-root': { color: '#5E6C84' }
              }}
              {...register('confirmPassword', {
                validate: (value) => value === watch('password') || 'Passwords do not match'
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
            <FieldErrorAlert errors={errors} fieldName="confirmPassword" />
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
              Reset Password
            </Button>
          </Box>

          {/* Footer Section */}
          <Box sx={{ padding: '0 2.5em 2em', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#91A1B7', fontWeight: 500 }}>
              Remember your password?
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
                Back to Log In
              </Typography>
            </Link>
          </Box>
        </Card>
      </Zoom>
    </form>
  )
}

export default ForgotPasswordForm
