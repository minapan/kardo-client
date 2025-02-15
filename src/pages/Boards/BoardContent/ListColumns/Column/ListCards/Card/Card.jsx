import { Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Attachment, Comment, Group } from '@mui/icons-material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TrelloCard({ card }) {
  const showCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle = {
    // touchAction: 'none', //for Pointer Events to prevent the default behaviour of the browser on touch devices
    // bug stretch
    // transform: CSS.Transform.toString(transform),
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }
  return (
    <>
      <Card ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          overflow: 'unset',
          border: '1px solid transparent',
          '&:hover': { borderColor: (theme) => theme.palette.primary.main },
          opacity: card.FE_Placeholder ? '0 !important' : '1',
          width: card.FE_Placeholder ? '100%' : 'unset',
          height: card.FE_Placeholder ? '36px' : 'unset',
          pointerEvents: card.FE_Placeholder ? 'none' : 'unset',
          position: card.FE_Placeholder ? 'absolute' : 'unset',
          right: card.FE_Placeholder ? '0' : 'unset',
          backgroundColor: card.FE_Placeholder ? 'transparent' : isDragging ? ((theme) => theme.palette.mode === 'dark' ? '#dff9fb' : '#535c68') : ((theme) => theme.palette.mode === 'dark' ? '#535c68' : '#fff')
        }}>
        <div style={{ opacity: isDragging ? '0' : '1' }}>
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
        </div>
      </Card>
    </>
  )
}

export default TrelloCard