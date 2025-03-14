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
import { Badge } from '@mui/material'
import { useSelector } from 'react-redux'
import { fetchInvitationsAPI, selectCurrNotifications, updateBoardInvitationAPI } from '~/redux/notifications/notificationsSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const notifications = useSelector(selectCurrNotifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvitationsAPI())
  }, [dispatch])

  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId }))
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          variant="dot"
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            color: 'white'
            // color: 'yellow'
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
        {(!notifications || notifications.length === 0) && <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>}
        {notifications?.map((notification, index) =>
          <Box key={index}>
            <MenuItem sx={{
              minWidth: 200,
              maxWidth: 360,
              overflowY: 'auto'
            }}>
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
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification._id)}
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
                    <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />}
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
