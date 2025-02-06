import Box from '@mui/material/Box'
import ListComlumns from './ListColumns/ListComlumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Effect to set the initial order of columns when the board data changes.
  useEffect(() => {
    // Map the board's columns based on the specified column order IDs.
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (e) => {
    const { active, over } = e // Destructure the active and over elements from the event.

    // If there is no element being dragged over, exit the function.
    if (!over) return

    // If the dragged element is not dropped over itself, proceed with reordering.
    if (active.id !== over.id) {
      // Find the index of the active column being dragged.
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)

      // Find the index of the column over which the active column is dropped.
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)

      // Reorder the columns based on the drag-and-drop operation.
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // Set the new order of columns in the state.
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        width: '100%',
        pb: '16px',
        userSelect: 'none',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#808e9b' : '#778beb'
      }}>
        <ListComlumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent