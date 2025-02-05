import { Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Attachment, Comment, Group } from '@mui/icons-material'
function TrelloCard() {
  return (
    <>
      <Card
        sx={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          overflow: 'unset'
        }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://nhatphan.id.vn/assets/img/cat-coffee.jpg"
        />
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography>MinaPan</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: '0 4px 8px 4px' }}>
          <Button startIcon={<Group />} size="small">20</Button>
          <Button startIcon={<Comment />} size="small">15</Button>
          <Button startIcon={<Attachment />} size="small">10</Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          overflow: 'unset'
        }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography>MinaPan</Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default TrelloCard