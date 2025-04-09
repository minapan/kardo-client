import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'

import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import toast from 'react-hot-toast'
import Setup2FA from '~/components/Modal/2FA/Setup2FA'
import { useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrUser, setUserMaxSession, updateUserAPI } from '~/redux/user/userSlice'
import { useEffect } from 'react'
import { clearSessionAPI, deleteSessionAPI, fetchSessionAPI, setMaxSessionsAPI } from '~/apis'
import { Logout } from '@mui/icons-material'

function SecurityTab() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrUser)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
  const handleClickShowPasswordComfirm = () => setShowPasswordConfirm((show) => !show)

  const [openSetup2FA, setOpenSetup2FA] = useState(false)
  const handleSuccessSetup2FA = () => {
    fetchSessionAPI().then((data) => setSessions(data))
    setOpenSetup2FA(false)
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const confirmChangePassword = useConfirm()
  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LockResetIcon sx={{ color: 'warning.dark' }} /> Change Password
      </Box>,
      description: 'You have to login again after successfully changing your password. Continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      const { current_password, new_password } = data

      if (user?.typeLogin === 'email' && current_password === new_password) {
        toast('New password should be different from your current password.', { icon: '⚠️' })
        return
      }

      const updatePass = user.typeLogin === 'email'
        ? { current_password, new_password }
        : { new_password }

      toast.promise(
        dispatch(updateUserAPI(updatePass)),
        {
          loading: 'Updating...'
        }
      ).then(res => {
        if (!res.error) {
          toast.success('Change password successfully. Please login again.')
          dispatch(logoutUserAPI(false))
        }
      })

    }).catch(() => { })
  }

  const [sessions, setSessions] = useState([])
  const [maxSessions, setMaxSessions] = useState(user?.max_sessions)

  useEffect(() => {
    fetchSessionAPI().then((data) => setSessions(data))
  }, [])

  const handleLogoutSession = async (sessionId) => {
    setSessions(sessions.filter(session => session._id !== sessionId))
    deleteSessionAPI(sessionId).then((res) => {
      if (res.isDeletedMySelf) dispatch(logoutUserAPI())
      else toast.success('Logout session successfully!')
    })
  }

  const handleSetMaxSessions = () => {
    if (maxSessions === user?.max_sessions) return
    setMaxSessionsAPI({ max_sessions: maxSessions })
      .then((res) => {
        if (!res.error) {
          toast.success('Update max sessions successfully!')
          setSessions(res)
          dispatch(setUserMaxSession(maxSessions))
        }
      })
  }

  const confirmLogout = useConfirm()
  const logoutOthers = () => {
    confirmLogout({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Logout sx={{ color: 'warning.dark' }} /> LOGOUT ALL OTHERS?
      </Box>,
      description: 'Are you sure you want to logout all other sessions?',
      confirmationText: 'Yes'
    })
      .then(() => {
        clearSessionAPI().then(() => {
          setSessions(sessions.filter(session => session.is_current)) // remove all other sessions
          toast.success('Logout all other sessions successfully!')
        })
      })
      .catch(() => { })
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      {openSetup2FA && <Setup2FA
        isOpen={openSetup2FA}
        toggleOpen={setOpenSetup2FA}
        handleSuccessSetup2FA={handleSuccessSetup2FA}
      />}
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'center',
        gap: { xs: 4, md: 6, lg: 10 }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: { xs: '350px', md: '500px' }
        }}>
          <Alert
            severity={`${user.require_2fa ? 'success' : 'warning'}`}
            action={
              <Button
                color="info" size="small"
                sx={{ p: .5 }}
                onClick={() => setOpenSetup2FA(true)}
              >
                {`${user.require_2fa ? 'Disable' : 'Enable'} 2FA`}
              </Button>
            }
          >
            Account security status:&nbsp;
            <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#e67e22' } }}>
              Two-Factor Authentication (2FA) {user.require_2fa ? 'enabled.' : 'not enabled.'}
            </Typography>
          </Alert>
          <Typography variant="h5">{user?.typeLogin === 'email' ? 'Change ' : 'Set '}Password</Typography>
          <form onSubmit={handleSubmit(submitChangePassword)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {user?.typeLogin === 'email' && (
                <Box>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrentPassword}
                            edge="end"
                          >
                            {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...register('current_password', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    })}
                    error={!!errors['current_password']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'current_password'} />
                </Box>
              )}
              <Box>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register('new_password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['new_password']}
                />
                <FieldErrorAlert errors={errors} fieldName={'new_password'} />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="New Password Confirmation"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordComfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register('new_password_confirmation', {
                    validate: (value) => value === watch('new_password') || 'Password confirmation does not match.'
                  })}
                  error={!!errors['new_password_confirmation']}
                />
                <FieldErrorAlert errors={errors} fieldName={'new_password_confirmation'} />
              </Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '350px', md: '500px' }
        }}>
          <Typography variant="h5">Session Management</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Set Max Sessions"
              type="number"
              value={maxSessions}
              inputProps={{ min: 1, max: 10 }}
              onChange={(e) => setMaxSessions(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={handleSetMaxSessions}>
              Save
            </Button>
          </Box>
          <Alert severity="info" >It can take up to 10 minutes to revoke sessions from other devices.</Alert>
          <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {sessions.map((session) => (
              <ListItem key={session._id}>
                <ListItemText
                  sx={{ color: session?.is_current ? 'info.main' : '' }}
                  primary={`${session?.device_info?.os} - ${session?.device_info?.browser} ${session?.is_current ? '(Current)' : ''}`}
                  secondary={`${new Date(session.last_active).toLocaleString()}`}
                />
                <Tooltip title="Logout">
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleLogoutSession(session._id)}>
                      <Logout sx={{ fontSize: 20, color: 'warning.dark' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            onClick={() => logoutOthers()}
          >
            Logout All Other Devices
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SecurityTab
