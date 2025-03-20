import { useState } from 'react'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRef } from 'react'
import JoditEditor from 'jodit-react'
import DOMPurify from 'dompurify'

function CardDescriptionEditor({ cardDescriptionProp, handleUpdateCardDescription }) {
  const { mode } = useColorScheme()
  const editor = useRef(null)

  // State to handle Edit mode and View mode
  const [editMode, setEditMode] = useState(false)
  // State to manage HTML content when editing
  const [cardDescription, setCardDescription] = useState(cardDescriptionProp)

  const updateCardDescription = () => {
    const sanitizedDescription = DOMPurify.sanitize(cardDescription)
    setEditMode(false)
    handleUpdateCardDescription(sanitizedDescription)
  }

  return (
    <Box sx={{ mt: -4 }}>
      {editMode
        ? <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <JoditEditor
              ref={editor}
              value={cardDescription}
              onBlur={setCardDescription} // preferred to use only this option to update the content for performance reasons
              config={{ theme: mode === 'dark' ? 'dark' : 'default', maxHeight: 500 }}
            />
          </Box>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={updateCardDescription}
            className="interceptor-loading"
            type="button"
            variant="contained"
            size="small"
            color="info">
            Save
          </Button>
        </Box>
        : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => setEditMode(true)}
            type="button"
            variant="contained"
            color="info"
            size="small"
            startIcon={<EditNoteIcon />}>
            Edit
          </Button>
          {cardDescription !== '<p><br></p>' ? (
            <Box sx={{ overflow: 'auto', maxHeight: 500 }}>
              <Box
                dangerouslySetInnerHTML={{ __html: cardDescription }}
                sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              />
            </Box>
          ) : (
            <Box sx={{ color: 'text.secondary' }}>No description</Box>
          )}
        </Box>
      }
    </Box>
  )
}

export default CardDescriptionEditor
