import SelectMode from '../SelectMode/SelectMode'
import { Box, Button, SvgIcon, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as Logo } from '~/assets/trello.svg'
import Profile from './Menus/Profile'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import { useSelector } from 'react-redux'
import { selectCurrUser } from '~/redux/user/userSlice'
import { Login } from '@mui/icons-material'

function AppBar() {
  const currUser = useSelector(selectCurrUser)
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
        // backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#485460' : '#546de5'
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#485460'
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

          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
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
          </Box> */}

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
          <Box sx={{ display: { xs: 'none', md: 'block' } }} >
            {currUser && <AutoCompleteSearchBoard />}
          </Box>

          <SelectMode />

          {/* <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer', color: 'white' }}>
              <NotificationsNoneIcon fontSize='small' style={{ transform: 'rotate(45deg)' }} />
            </Badge>
          </Tooltip> */}
          {currUser && <Notifications currUser={currUser} />}

          {/* <Tooltip title="Help">
            <Badge color="secondary" sx={{ cursor: 'pointer', color: 'white' }}>
              <HelpOutlineIcon fontSize='small' />
            </Badge>
          </Tooltip> */}
          {currUser ? <Profile currUser={currUser} />
            :
            <>
              {/* <Link to='/register'>
                <Button variant='outlined'
                  sx={{ color: 'white', padding: 1, borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                  startIcon={<AccountBox />} size='small'>
                  Register
                </Button>
              </Link> */}
              <Link to='/login'>
                <Button variant='outlined'
                  sx={{ color: 'white', padding: 1, borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                  startIcon={<Login />} size='small'>
                  Login
                </Button>
              </Link>
            </>
          }
        </Box>
      </Box>
    </>
  )
}

export default AppBar