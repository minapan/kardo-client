import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { deleteUserAPI } from '~/apis'

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrUser)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [confirmUsername, setConfirmUsername] = useState('')
  const [isUsernameValid, setIsUsernameValid] = useState(false)

  const initialGeneralForm = {
    displayName: currentUser?.displayName || '',
    bio: currentUser?.bio || ''
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName, bio } = data

    if (displayName === currentUser?.displayName && bio === currentUser?.bio) return

    toast.promise(
      dispatch(updateUserAPI({ displayName, bio })),
      {
        loading: 'Updating...'
      }
    ).then(res => {
      if (!res.error) {
        toast.success('Updated successfully.')
        reset({
          displayName: res.payload.displayName,
          bio: res.payload.bio
        })
      }
    })
  }

  const uploadAvatar = (e) => {
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])
    // console.log('reqData: ', reqData)
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    toast.promise(
      dispatch(updateUserAPI(reqData)),
      { loading: 'Updating...' }
    ).then(res => {
      if (!res.error) toast.success('Updated successfully.')
      e.target.value = ''
    })
  }

  const handleDeleteAccount = () => {
    if (confirmUsername !== currentUser?.username) return
    if (currentUser.typeLogin !== 'email') return

    toast.promise(
      deleteUserAPI(),
      { loading: 'Deleting your account...' }
    ).then(res => {
      if (!res.error) {
        toast.success('Account deleted successfully.')
        dispatch(logoutUserAPI(false))
      }
    })
    setOpenDeleteDialog(false)
    setConfirmUsername('')
    setIsUsernameValid(false)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setConfirmUsername(value)
    setIsUsernameValid(value === currentUser?.username)
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Tooltip title="Upload a new image to update your avatar.">
            <Box component="label" sx={{ position: 'relative', cursor: 'pointer' }}>
              <Avatar
                sx={{ width: 100, height: 100, border: '2px solid #1976d2' }}
                alt="User Avatar"
                src={currentUser?.avatar}
              />
              <CloudUploadIcon
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  fontSize: 28,
                  color: '#fff',
                  bgcolor: '#1976d2',
                  borderRadius: '50%',
                  p: 0.5,
                  transition: 'all 0.3s',
                  '&:hover': { bgcolor: '#1565c0' }
                }}
              />
              <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
            </Box>
          </Tooltip>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {currentUser?.displayName}
            </Typography>
            <Typography sx={{ color: 'grey.600', fontSize: '0.9rem' }}>
              @{currentUser?.username}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                variant="outlined"
                {...register('displayName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label='Your bio'
                type="text"
                variant="outlined"
                multiline
                rows={4}
                {...register('bio')}
              />
            </Box>
            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
        <Divider />
        <Box sx={{
          maxWidth: '500px', border: '2px solid red', padding: 4, borderRadius: 4,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff0f0'
        }}>
          <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 600, mb: 2 }}>
            Danger Zone
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Deleting your account is permanent and cannot be undone. All your data will be lost.
          </Alert>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ borderRadius: 1, fontWeight: 600 }}
          >
            Delete Account
          </Button>
        </Box>

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle sx={{ color: '#d32f2f' }}>Confirm Account Deletion</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              To confirm, please enter your username: <strong style={{ color: 'red' }}>{currentUser?.username}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Enter your username"
              variant="outlined"
              value={confirmUsername}
              onChange={handleUsernameChange}
              error={confirmUsername && !isUsernameValid}
              helperText={confirmUsername && !isUsernameValid ? 'Username does not match' : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              color="error"
              variant="contained"
              disabled={!isUsernameValid}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default AccountTab
