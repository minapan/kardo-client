import { Box, Chip, Tooltip } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'

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
    <Box sx={(theme) => ({
      width: '100%',
      height: ({ trelloCustom }) => trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      padding: '0 10px',
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: 2 },
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      position: 'relative',
      zIndex: 1,
      ...(theme.palette.mode === 'dark' && {
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0
        }
      })
    })}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardCustomizeIcon />} label={board?.title} clickable />
        </Tooltip>
        {/* <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable /> */}
        {/* <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />} label="Automation" clickable />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />} label="Automation" clickable /> */}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InviteBoardUser boardId={board?._id} />
        {/* <Button>
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button> */}

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