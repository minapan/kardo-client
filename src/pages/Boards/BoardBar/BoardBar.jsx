import { Box, Chip, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import { socketIo } from '~/socketClient'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useConfirm } from 'material-ui-confirm'
import { deleteBoardAPI } from '~/apis'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirm = useConfirm()
  const handleDeleteBoard = () => {
    confirm({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Delete sx={{ color: 'warning.dark' }} /> DELETE BOARD ?
      </Box>,
      description: 'This action is permanently delete your board! Are you sure?',
      confirmationText: 'Yes'
    })
      .then(() => {
        deleteBoardAPI(board._id).then((res) => {
          if (!res?.error) {
            socketIo.emit('FE_DELETED_BOARD', { boardId: board._id })
            navigate('/boards')
            toast.success('Board deleted successfully!')
          }
        })
      })
      .catch(() => { })
  }
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
            icon={<DashboardCustomizeIcon />} label={board?.title} clickable
            id="basic-board-dropdown"
            aria-controls={open ? 'basic-menu-board-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} />
        </Tooltip>
        <Menu
          sx={{ mt: 2 }}
          id="basic-menu-board-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={handleDeleteBoard}
            sx={{
              '&:hover': {
                color: 'warning.dark',
                '& .delete-icon': { color: 'warning.dark' }
              }
            }}
          >
            <ListItemIcon><Delete className='delete-icon' fontSize="small" /></ListItemIcon>
            <ListItemText>Remove this board</ListItemText>
          </MenuItem>
        </Menu>
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