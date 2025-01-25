import { Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  backgroundColor: 'white',
  color: 'primary.main',
  paddingX: '5px',
  border: 'none',
  borderRadius: 1,
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    backgroundColor: 'primary.100'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: ({ trelloCustom }) => trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderTop: '2px solid #ccc'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardCustomizeIcon />} label="My Board" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />} label="Public/Private" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />} label="Public/Private" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />} label="Automation" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />} label="Automation" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup max={6}
          sx={
            {
              '& .MuiAvatar-root': {
                width: 36,
                height: 36,
                fontSize: '1rem'
              }
            }
          }>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
          <Tooltip title="Avt">
            <Avatar
              src='https://nhatphan.id.vn/assets/img/cat-coffee.jpg' alt="Avt"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar