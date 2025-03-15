import SelectMode from '../SelectMode/SelectMode'
import { Badge, Box, Button, SvgIcon, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { ReactComponent as Logo } from '~/assets/trello.svg'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Teamplates from './Menus/Teamplates'
import Profile from './Menus/Profile'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  // const [search, setSearch] = useState('')
  return (
    <>
      <Box px={2} sx={{
        width: '100%',
        height: ({ trelloCustom }) => trelloCustom.appBarHeight,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': { m: 2 },
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#485460' : '#546de5'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to='/boards'>
            <Tooltip title="Board List">
              <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
            </Tooltip>
          </Link>

          <Link to='/'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SvgIcon component={Logo} fontSize='medium' inheritViewBox />
              <Typography variant='span' sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', marginRight: 1 }}>
                Trello
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Teamplates />
            <Button
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white'
                }
              }}
              variant='outlined' startIcon={<LibraryAddIcon />}>Create</Button>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <TextField id="outlined-search" placeholder="Search..." type="text" size='small' onChange={(e) => setSearch(e.target.value)} value={search}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'white' }} />,
              endAdornment: <CloseIcon fontSize='small'
                onClick={() => setSearch('')}
                sx={{ color: search ? 'white' : 'transparent', cursor: 'pointer' }} />
            }}
            sx={{
              minWidth: 120,
              maxWidth: 200,
              display: { xs: 'none', md: 'flex' },
              '& input': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }} /> */}
          <AutoCompleteSearchBoard />

          <SelectMode />
          {/* <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer', color: 'white' }}>
              <NotificationsNoneIcon fontSize='small' style={{ transform: 'rotate(45deg)' }} />
            </Badge>
          </Tooltip> */}
          <Notifications />

          <Tooltip title="Help">
            <Badge color="secondary" sx={{ cursor: 'pointer', color: 'white' }}>
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