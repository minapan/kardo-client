import { Box, Button, Chip, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Attachment, Comment, Group } from '@mui/icons-material'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { showModal, updateCurrActiveCard } from '~/redux/activeCard/activeCardSlice'
import { useSelector } from 'react-redux'
import { selectCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

function TrelloCard({ card }) {
  const dispatch = useDispatch()

  const board = useSelector(selectCurrActiveBoard)
  const FE_CardLabels = card?.labelIds?.map(
    labelId => board?.labels?.find(label => label.id === labelId)
  ).filter(label => label)

  const totalItems = card?.checklists?.reduce((sum, checklist) => sum + checklist.items.length, 0) || 0
  const completedItems = card?.checklists?.reduce(
    (sum, checklist) => sum + checklist.items.filter((item) => item.completed).length,
    0
  ) || 0

  const showCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  const setActiveCard = () => {
    dispatch(updateCurrActiveCard(card))
    dispatch(showModal())
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
      <Card
        onClick={setActiveCard}
        ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          overflow: 'unset',
          border: '2px solid transparent',
          borderRadius: 2.5,
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
          {card?.cover && (
            <CardMedia sx={{ height: '140px', borderRadius: '8px 8px 0 0' }} image={card?.cover} />
          )}

          {FE_CardLabels?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, px: 1, mt: 1.5, flexWrap: 'wrap' }}>
              {FE_CardLabels?.map((label, index) => (
                <Chip
                  key={index}
                  label={label?.name}
                  size="small" sx={{ background: label?.color, minWidth: '52px', maxWidth: '100%', height: '16px', color: '#fff', fontSize: '12px', fontWeight: '600', borderRadius: '4px' }} />
              ))}
            </Box>
          )}

          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{card?.title}</Typography>
          </CardContent>

          {showCardAction() && (
            <CardActions sx={{ display: 'flex', p: '0 12px 8px 12px', justifyContent: 'space-between', alignItems: 'center' }}>
              {totalItems > 0 &&
                <Button
                  sx={{
                    py: 0, px: '4px', minWidth: 'unset !important', fontSize: '12px', fontWeight: '700',
                    backgroundColor: completedItems === totalItems ? '#27AE60' : '',
                    color: (theme) => completedItems === totalItems ? '#fff' : (theme.palette.mode === 'dark' ? '#ccc' : '#6b7fa2'),
                    '&:hover': {
                      backgroundColor: completedItems === totalItems ? '#27AE60' : '',
                      color: completedItems === totalItems ? '#fff' : ''
                    }
                  }}
                  startIcon={<DomainVerificationIcon />} size="small">
                  {completedItems}/{totalItems}
                </Button>
              }
              {!!card?.comments?.length &&
                <Button sx={{
                  py: 0, px: '4px', fontSize: '12px', minWidth: 'unset !important', fontWeight: '700',
                  color: (theme) => theme.palette.mode === 'dark' ? '#ccc' : '#6b7fa2'
                }}
                startIcon={<Comment />} size="small">{card?.comments?.length}</Button>
              }
              {!!card?.attachments?.length &&
                <Button sx={{
                  py: 0, px: '4px', fontSize: '12px', minWidth: 'unset !important', fontWeight: '700',
                  color: (theme) => theme.palette.mode === 'dark' ? '#ccc' : '#6b7fa2'
                }}
                startIcon={<Attachment />} size="small">{card?.attachments?.length}</Button>
              }
              {!!card?.memberIds?.length &&
                <Button sx={{
                  py: 0, px: '4px', fontSize: '12px', minWidth: 'unset !important', fontWeight: '700',
                  color: (theme) => theme.palette.mode === 'dark' ? '#ccc' : '#6b7fa2'
                }}
                startIcon={<Group />} size="small">{card?.memberIds?.length}</Button>
              }
            </CardActions>
          )}

        </div>
      </Card>
    </>
  )
}

export default TrelloCard