import { Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Attachment, Comment, Group } from '@mui/icons-material'
function TrelloCard({ card }) {
  const showCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <>
      <Card
        sx={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          overflow: 'unset'
        }}>
        {card?.cover && (<CardMedia sx={{ height: '140px' }} image={card?.cover} />)}
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>
        {showCardAction() && (
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: '0 4px 8px 4px' }}>
            {!!card?.memberIds?.length &&
              <Button startIcon={<Group />} size="small">{card?.memberIds?.length}</Button>
            }
            {!!card?.comments?.length &&
              <Button startIcon={<Comment />} size="small">{card?.comments?.length}</Button>
            }
            {!!card?.attachments?.length &&
              <Button startIcon={<Attachment />} size="small">{card?.attachments?.length}</Button>
            }
          </CardActions>
        )}
      </Card>
    </>
  )
}

export default TrelloCard