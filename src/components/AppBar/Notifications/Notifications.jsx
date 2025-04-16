import { useState } from 'react'
import moment from 'moment'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { Badge, CardMedia, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { addNotification, deleteInvitationAPI, fetchInvitationsAPI, selectCurrNotifications, updateBoardInvitationAPI } from '~/redux/notifications/notificationsSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { socketIo } from '~/socketClient'
import { useNavigate } from 'react-router-dom'
import { Close } from '@mui/icons-material'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications({ currUser }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [newNotification, setNewNotification] = useState(false)
  const navigate = useNavigate()

  const notifications = useSelector(selectCurrNotifications)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchInvitationsAPI())

    const onReceiveNewInvitation = (invitation) => {
      if (invitation.inviteeId === currUser?._id) {
        // Add new notification record into redux store
        dispatch(addNotification(invitation))
        // Update new notification badge
        setNewNotification(true)
      }
    }
    socketIo.on('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)

    // Cleanup event through unmount to avoid memory leak
    return () => {
      socketIo.off('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
    }
  }, [dispatch, currUser?._id])

  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId }))
      .then((res) => {
        if (res.error) dispatch(deleteInvitationAPI(invitationId))
        if (res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
          socketIo.emit('FE_USER_ACCEPTED_INVITATION', { boardId: res.payload.boardInvitation.boardId, user: currUser })
          navigate(`/b/${res.payload.boardInvitation.boardId}`)
        }
      })
  }

  const handleDelete = (invitationId) => {
    dispatch(deleteInvitationAPI(invitationId))
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          variant={newNotification ? 'dot' : 'standard'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            color: newNotification ? 'yellow' : 'white'
          }} fontSize='small' style={{ transform: 'rotate(45deg)' }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications.length === 0) &&
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, p: 2 }}>
            <CardMedia
              component="img"
              loading='lazy'
              sx={{ width: 150, height: 150, objectFit: 'contain' }}
              image="https://trello.com/assets/ee2660df9335718b1a80.svg"
              alt="No notifications"
            />
            <Typography variant='body2'>You do not have any new notifications.</Typography>
          </Box>
        }
        {notifications?.map((notification, index) =>
          <Box key={index}>
            <MenuItem sx={{
              minWidth: 200, maxWidth: 360,
              overflowY: 'auto', position: 'relative'
            }}>
              <Box sx={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                cursor: 'pointer'
              }}>
                <IconButton onClick={() => handleDelete(notification._id)}>
                  <Close fontSize='small' color='warning' />
                </IconButton>
              </Box>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>

                {/* Notification content */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><GroupAddIcon fontSize="small" /></Box>
                  <Box><strong>{notification?.inviter?.displayName}</strong> had invited you to join the board <strong>{notification?.board?.title}</strong></Box>
                </Box>

                {/* Whenever status of notification is PENDING, show Accept and Reject button */}
                {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.PENDING &&
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification?._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification?._id)}
                    >
                      Reject
                    </Button>
                  </Box>
                }

                {/* Whenever status of notification is ACCEPTED or REJECTED, show status */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED &&
                    <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />}
                  {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.REJECTED &&
                    <Chip icon={<NotInterestedIcon />} label="Rejected" color='error' size="small" />}
                </Box>

                {/* Notification time */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notification?.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Add divider if not the last notification */}
            {index !== (notifications?.length - 1) && <Divider />}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default Notifications
