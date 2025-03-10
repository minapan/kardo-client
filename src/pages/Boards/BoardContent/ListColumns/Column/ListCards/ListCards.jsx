import Box from '@mui/material/Box'
import TrelloCard from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
function ListCard({ cards }) {
  return (
    <>
      <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
        <Box sx={{
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.trelloCustom.collumnHeaderHeight} - ${theme.trelloCustom.collumnFooterHeight} - ${theme.spacing(5)})`,
          gap: 0.8,
          p: '0 5px 5px 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '6px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}
        >
          {cards?.map(card => (<TrelloCard key={card._id} card={card} />))}
        </Box>
      </SortableContext>
    </>
  )
}

export default ListCard