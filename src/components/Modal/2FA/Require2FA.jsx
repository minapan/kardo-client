import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import SecurityIcon from '@mui/icons-material/Security'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { verify2FaAPI } from '~/redux/user/userSlice'
import toast from 'react-hot-toast'

function Require2FA() {
  const [otpToken, setConfirmOtpToken] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const handleRequire2FA = () => {
    if (!otpToken) {
      const errMsg = 'Please enter your code.'
      setError(errMsg)
      toast.error(errMsg)
      return
    }
    // console.log('handleRequire2FA > otpToken: ', otpToken)
    toast.promise(
      dispatch(verify2FaAPI(otpToken)),
      { loading: 'Setting up...' }
    ).then((res) => {
      if (!res.error) {
        toast.success('Setup 2FA successfully!')
        setError(null)
      }
    })
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            autoComplete="off"
            label="Enter your code..."
            type="text"
            variant="outlined"
            fullWidth
            value={otpToken}
            onChange={(e) => setConfirmOtpToken(e.target.value)}
            error={!!error && !otpToken}
          />

          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: 'none' }}
            fullWidth
            onClick={handleRequire2FA}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default Require2FA