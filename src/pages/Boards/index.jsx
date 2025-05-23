import { useState, useEffect, memo, useMemo } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { Link, useLocation } from 'react-router-dom'
import randomColor from 'randomcolor'
import SidebarCreateBoardModal from './create'
import { styled } from '@mui/material/styles'
import LoadingSpinner from '~/components/Loading/LoadingSpinner'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '~/utils/constants'

const BoardCard = memo(({ board, index }) => {
  const backgroundColor = useMemo(() => randomColor(), [])

  return (
    <Link to={`/b/${board._id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: { xs: 325, sm: 280, md: 260, lg: 250 },
          height: 150,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            '& .board-title:after': {
              width: 'calc(100% - 24px)'
            },
            '& .board-cover': {
              transform: 'scale(1.2)'
            }
          }
        }}
      >
        <CardMedia
          component="img"
          className='board-cover'
          image={board?.cover_small || null}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease-in-out',
            backgroundColor: !board?.cover_small ? backgroundColor : undefined
          }}
          loading="lazy"
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="board-title"
          sx={{
            p: { xs: 1, sm: 1.5 },
            color: '#fff',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '6px',
              left: '12px',
              width: 0,
              height: '2px',
              backgroundColor: '#fff',
              transition: 'width 0.4s ease-in-out'
            }
          }}
        >
          {board?.title}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
            zIndex: 0
          }}
        />
      </Card>
    </Link>
  )
})
BoardCard.displayName = 'BoardCard'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const updateState = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.total || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search)
      .then((res) => {
        updateState(res)
      })
      .catch(() => { })
  }, [location.search])

  if (!boards) {
    return <LoadingSpinner caption="Loading Boards..." />
  }

  const afterCreateBoard = () => {
    fetchBoardsAPI(location.search).then(updateState)
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal afterCreate={afterCreateBoard} />
            </Stack>
          </Grid>

          <Grid xs={12} sm={9}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              Board List:
            </Typography>

            {boards?.length === 0 && (
              <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>
                No result found!
              </Typography>
            )}

            {boards?.length > 0 && (
              <Grid
                container
                spacing={2}
                sx={{
                  m: '0 auto',
                  maxWidth: '1200px',
                  px: { xs: 1, sm: 2 },
                  justifyContent: 'center'
                }}
              >
                {boards.map((b, index) => (
                  <Grid
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={b._id}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <BoardCard board={b} index={index} />
                  </Grid>
                ))}
              </Grid>
            )}

            {totalBoards > 0 && (
              <Box
                sx={{
                  my: 3,
                  pr: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / DEFAULT_LIMIT)}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards