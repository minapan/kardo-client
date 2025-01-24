import SelectMode from '../SelectMode'
import { Badge, Box, Button, SvgIcon, TextField, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { ReactComponent as Logo } from '~/assets/trello-icon.svg'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Teamplates from './Menus/Teamplates'
import Profile from './Menus/Profile'

function AppBar() {
  return (
    <>
      <Box px={2} sx={{
        width: '100%',
        height: ({ trelloCustom }) => trelloCustom.appBarHeight,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SvgIcon component={Logo} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'primary.main', marginRight: 1 }}>
              Trello
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Workspaces />
              <Recent />
              <Starred />
              <Teamplates />
              <Button variant='outlined'>Create</Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField id="outlined-search" label="Search..." type="search" size='small'
            sx={{ minWidth: 120 }} />
          <SelectMode />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer', color: 'primary.main' }}>
              <NotificationsNoneIcon fontSize='small' style={{ transform: 'rotate(45deg)' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <Badge color="secondary" sx={{ cursor: 'pointer', color: 'primary.main' }}>
              <HelpOutlineIcon fontSize='small' />
            </Badge>
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar