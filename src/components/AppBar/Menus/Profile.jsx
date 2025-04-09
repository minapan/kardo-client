import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { Logout } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'
import AutoCompleteSearchBoard from '../SearchBoards/AutoCompleteSearchBoard'

function Profile({ currUser }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Logout sx={{ color: 'warning.dark' }} /> LOGOUT ?
      </Box>,
      description: 'Are you sure you want to logout?',
      confirmationText: 'Yes'
    })
      .then(() => {
        dispatch(logoutUserAPI())
      })
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
      onClose={handleClose}
      id="account-menu"
      anchorEl={anchorEl}
      open={open}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      <Link to="/settings/account" style={{ color: 'inherit' }}>
        <MenuItem sx={{
          '&:hover': { color: 'success.light' }
        }}>
          <Avatar sx={{ mr: 1, width: 26, height: 26 }} src={currUser?.avatar} />
          Profile
        </MenuItem>
      </Link>
      <Divider />
      {/* <MenuItem>
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
      </MenuItem> */}
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
      <Box sx={{
        display: { xs: 'block', md: 'none' },
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#888',
        p: 1
      }}>
        {currUser && <AutoCompleteSearchBoard />}
      </Box>
    </Menu>
  </>)
}

export default Profile