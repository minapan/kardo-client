import { Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
import BoardUserGroup from './BoardUserGroup'

const MENU_STYLES = {
  backgroundColor: 'transparent',
  color: 'white',
  fontWeight: 'bold',
  paddingX: '5px',
  border: 'none',
  borderRadius: 1,
  '& .MuiSvgIcon-root': {
    color: 'white',
    fontWeight: 'bold'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar({ board }) {
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
      '&::-webkit-scrollbar-track': { m: 2 },
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardCustomizeIcon />} label={board?.title} clickable />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />} label="Automation" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />} label="Automation" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <BoardUserGroup boardUsers={board?.FE_allUsers} />

        {/* <AvatarGroup max={6}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: '1rem',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                backgroundColor: '#786fa6'
              }
            }
          }}>
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
        </AvatarGroup> */}
      </Box>
    </Box>
  )
}

export default BoardBar