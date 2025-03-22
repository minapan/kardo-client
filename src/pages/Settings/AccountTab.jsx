import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector } from 'react-redux'
import { selectCurrUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import toast from 'react-hot-toast'

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrUser)

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
        gap: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="avt"
              src={currentUser?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}>
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
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
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AccountTab
