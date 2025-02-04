import { Button, Menu, MenuItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Check from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

function Teamplates() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (<>
    <Button
      sx={{ color: 'white' }}
      id="basic-button-teamplates"
      aria-controls={open ? 'basic-menu-teamplates' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      endIcon={<ExpandMoreIcon />}
    >
      Teamplates
    </Button>
    <Menu
      id="basic-menu-teamplates"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      <MenuItem>
        <ListItemText inset>Single</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText inset>1.15</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText inset>Double</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Check />
        </ListItemIcon>
        Custom: 1.2
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemText>Add space before paragraph</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText>Add space after paragraph</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemText>Custom spacing...</ListItemText>
      </MenuItem>
    </Menu>
  </>)
}

export default Teamplates