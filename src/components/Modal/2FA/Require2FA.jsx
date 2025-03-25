import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import SecurityIcon from '@mui/icons-material/Security'
import { useDispatch } from 'react-redux'
import { logoutUserAPI, verify2FaAPI } from '~/redux/user/userSlice'
import toast from 'react-hot-toast'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { Logout } from '@mui/icons-material'

function Require2FA() {
  const [otpToken, setConfirmOtpToken] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const handleRequire2FA = () => {
    toast.promise(
      dispatch(verify2FaAPI(otpToken)),
      { loading: 'Setting up...' }
    ).then((res) => {
      if (res.error) {
        setError(res.error)
      }
      else {
        toast.success('Setup 2FA successfully!')
      }
    })
  }

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Logout sx={{ color: 'warning.dark' }} /> LOGOUT ?
      </Box>,
      description: 'Are you sure you want to logout?',
      confirmationText: 'Yes'
    })
      .then(() => dispatch(logoutUserAPI()))
      .catch(() => { })
  }

  return (
    <Modal
      disableScrollLock open={true} sx={{ overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://picsum.photos/1920/1080) center center / cover no-repeat' }}
    >
      <Box
        sx={{
          width: '90vw',
          maxWidth: '400px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <SecurityIcon sx={{ color: '#27ae60' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
            Require 2FA (Two-Factor Authentication)
          </Typography>
        </Box>

        <Typography sx={{ mb: 2 }}>
          Enter the 6-digit code from your authentication app and click <strong>Confirm</strong> to verify.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
          <MuiOtpInput
            autoFocus
            value={otpToken}
            validateChar={(char) => char >= '0' && char <= '9'}
            onChange={(value) => {
              setConfirmOtpToken(value)
              if (error) setError(null)
            }}
            onComplete={handleRequire2FA}
            length={6}
            TextFieldProps={{
              error: !!error
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: error ? 'red' : 'inherit',
                color: error ? 'red' : 'inherit',
                '& fieldset': {
                  borderColor: error ? 'red !important' : 'inherit'
                },
                '&:hover fieldset': {
                  borderColor: error ? 'darkred !important' : 'inherit'
                }
              }
            }}
          />

          <Link
            underline="none"
            component="button"
            variant="body2"
            onClick={handleLogout}
          >
            Want to logout?
          </Link>
        </Box>

      </Box>
    </Modal >
  )
}

export default Require2FA