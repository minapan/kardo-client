import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import SecurityIcon from '@mui/icons-material/Security'
import CancelIcon from '@mui/icons-material/Cancel'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { get2FaQrCodeAPI } from '~/apis'
import { setup2FaAPI } from '~/redux/user/userSlice'
import { MuiOtpInput } from 'mui-one-time-password-input'

function Setup2FA({ isOpen, toggleOpen, handleSuccessSetup2FA }) {
  const [otpToken, setConfirmOtpToken] = useState('')
  const [error, setError] = useState(null)
  const [qrCodeImgUrl, setQrCodeImgUrl] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) {
      get2FaQrCodeAPI().then((res) => {
        setQrCodeImgUrl(res.qrcode)
      })
    }
  }, [isOpen])

  const handleCloseModal = () => {
    toggleOpen(!isOpen)
    setError(null)
    setConfirmOtpToken('')
  }

  const handleConfirmSetup2FA = () => {
    toast.promise(
      dispatch(setup2FaAPI(otpToken)),
      { loading: 'Setting up...' }
    ).then((res) => {
      if (res.error) {
        setError(res.error)
      }
      else {
        toast.success('Setup 2FA successfully!')
        handleSuccessSetup2FA()
      }
    })
  }

  return (
    <Modal
      disableScrollLock
      open={isOpen}
      onClose={handleCloseModal}
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        maxWidth: 700,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: '40px 20px 20px',
        margin: '120px auto',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>

        <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <SecurityIcon sx={{ color: '#27ae60' }} />
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#27ae60' }}>Setup 2FA (Two-Factor Authentication)</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, p: 1 }}>
          {!qrCodeImgUrl ? (
            <span>Loading...</span>
          ) : (
            <img
              style={{ width: '100%', maxWidth: '250px', objectFit: 'contain' }}
              src={qrCodeImgUrl}
              alt="card-cover"
            />
          )
          }

          <Box sx={{ textAlign: 'center' }}>
            Scan the QR code using your <strong>authenticator app</strong> (e.g., Google Authenticator, Authy, Microsoft Authenticator).<br />
            Then enter the 6-digit code and click <strong>Confirm</strong> to verify.
          </Box>

          <MuiOtpInput
            autoFocus
            value={otpToken}
            validateChar={(char) => char >= '0' && char <= '9'}
            onChange={(value) => {
              setConfirmOtpToken(value)
              if (error) setError(null)
            }}
            onComplete={handleConfirmSetup2FA}
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

        </Box>
      </Box>
    </Modal>
  )
}

export default Setup2FA
