import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { Logout, PersonAdd, Settings } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrUser } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'

function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const currUser = useSelector(selectCurrUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'LOGOUT ?',
      description: 'Are you sure you want to logout?',
      confirmationText: 'Yes'
    })
      .then(() => dispatch(logoutUserAPI()))
      .catch(() => { })
  }

  return (<>
    <Tooltip title="Account settings">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ padding: 0 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          src={currUser?.avatar} alt="Avt"
          sx={{ width: 36, height: 36 }} />
      </IconButton>
    </Tooltip>
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={open}
      onClick={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      <MenuItem sx={{
        '&:hover': { color: 'success.light' }
      }}>
        <Avatar sx={{ mr: 2, width: 32, height: 32 }} src={currUser?.avatar} /> Profile
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{
        '&:hover': {
          color: 'warning.dark',
          '& .logout': { color: 'warning.dark' }
        }
      }}>
        <ListItemIcon>
          <Logout className='logout' fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </>)
}

export default Profile