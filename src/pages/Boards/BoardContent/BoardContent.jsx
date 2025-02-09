import Box from '@mui/material/Box'
import ListComlumns from './ListColumns/ListComlumns'
import { mapOrder } from '~/utils/sorts'
import { closestCenter, defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_COLUMN',
  CARD: 'ACTIVE_DRAG_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  // At the same time can only drag one item
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // Effect to set the initial order of columns when the board data changes.
  useEffect(() => {
    // Map the board's columns based on the specified column order IDs.
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id).includes(cardId))
  }

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
  }

  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!over) return

    // If the dragged element is not dropped over itself, proceed with reordering.
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)

      // Reorder the columns based on the drag-and-drop operation.
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      setOrderedColumns(dndOrderedColumns)
    }
  }

  /**
   * This function is called whenever the user drags an item over another item during a drag-and-drop operation.
   * It is responsible for updating the state of the columns and cards based on the drag-and-drop operation.
   * @param {Object} e The event object passed by the drag-and-drop library.
   */
  const handleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = e
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      // Update the state of the columns and cards based on the drag-and-drop operation.
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        let newCardIndex
        const isBelowOverCard = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverCard ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          // Remove the dragged card from the source column.
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          // Remove the dragged card from the target column if it already exists.
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Insert the dragged card into the target column at the correct position.
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // Update the card order IDs of the target column.
          nextOverColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }
  }

  const dropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: 0.7 } } }) }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter} // use closestCenter for the most accurate drag-and-drop behavior
    >
      <Box sx={{
        width: '100%',
        py: '16px',
        userSelect: 'none',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
      }}>
        <ListComlumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <div
              style={{
                transform: 'rotate(3deg)',
                MozTransform: 'rotate(3deg)',
                WebkitTransform: 'rotate(3deg)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Column column={activeDragItemData} />
            </div>
          )}

          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <div
              style={{
                transform: 'rotate(3deg)',
                MozTransform: 'rotate(3deg)',
                WebkitTransform: 'rotate(3deg)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <TrelloCard card={activeDragItemData} />
            </div>
          )}
          {/* {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (<Column column={activeDragItemData} />)} */}
          {/* {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (<TrelloCard card={activeDragItemData} />)} */}
        </DragOverlay>
      </Box>
    </DndContext >
  )
}

export default BoardContent