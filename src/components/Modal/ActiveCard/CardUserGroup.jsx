import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Badge } from '@mui/material'

function CardUserGroup({ cardMemberIds = [] }) {
  /**
   * Handle Popover to show or hide all users in a popup.
   * Reference the documentation here:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  // Note: We do not use MUI's AvatarGroup component here because it does not offer good support for customization
  // and triggering calculations for the last element. Instead, we use Box and CSS to style the avatars properly,
  // combined with some calculations.
  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {/* Display users who are members of the card */}
      {[...Array(8)].map((_, index) =>
        <Tooltip title="avt" key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt="avt"
            src="https://nhatphan.id.vn/assets/img/cat-coffee.jpg"
          />
        </Tooltip>
      )}

      {/* This button opens the popover to add members */}
      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200],
            '&:hover': {
              color: (theme) => theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* When clicking the "+" button above, the popover opens to display all users in the board,
          allowing the user to click and add them to the card */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {[...Array(16)].map((_, index) =>
            <Tooltip title="avt" key={index}>
              {/* Avatar with a badge icon: https://mui.com/material-ui/react-avatar/#with-badge */}
              <Badge
                sx={{ cursor: 'pointer' }}
                overlap="rectangular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={<CheckCircleIcon fontSize="small" sx={{ color: '#27ae60' }} />}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt="avt"
                  src="https://nhatphan.id.vn/assets/img/cat-coffee.jpg"
                />
              </Badge>
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
