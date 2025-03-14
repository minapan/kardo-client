import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardUserGroup({ boardUsers = [], limit = 6 }) {
  /**
   * Handle Popover to show or hide all users in a popup, similar to the documentation here:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  // Note: We are not using MUI's AvatarGroup component here because it does not support
  // the level of customization and triggering we need for the last calculated element.
  // Instead, we simply use Box and CSS to style the Avatar group properly with a bit of calculation.
  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {/* Display a limited number of users based on the limit value */}
      {boardUsers.map((user, index) => {
        if (index < limit) {
          return (
            <Tooltip title={user?.displayName} key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="Avt"
                src={user?.avatar}
              />
            </Tooltip>
          )
        }
      })}

      {/* If the number of users exceeds the limit, show a "+number" indicator */}
      {boardUsers.length > limit &&
        <Tooltip title="Show all">
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
              fontWeight: '500',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be'
            }}
          >
            +{boardUsers.length - limit}
          </Box>
        </Tooltip>
      }

      {/* Clicking on the "+number" indicator above will open a popover showing all users without a limit */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '235px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {boardUsers.map((user, index) =>
            <Tooltip title={user?.displayName} key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="Avt"
                src={user?.avatar}
              />
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

export default BoardUserGroup
