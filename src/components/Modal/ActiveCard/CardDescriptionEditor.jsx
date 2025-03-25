import { useState } from 'react'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRef } from 'react'
import JoditEditor from 'jodit-react'
import DOMPurify from 'dompurify'
import { Typography } from '@mui/material'

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
            variant="outlined"
            size="small">
            Save
          </Button>
        </Box>
        : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => setEditMode(true)}
            type="button"
            variant="text"
            color="info"
            size="small"
            startIcon={<EditNoteIcon />}>
            Edit
          </Button>
          {(cardDescription !== '<p><br></p>' && cardDescription) ? (
            <Box sx={{ overflow: 'auto', maxHeight: 400 }}>
              <Box
                dangerouslySetInnerHTML={{ __html: cardDescription }}
                sx={{
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word', backgroundColor: theme => theme.palette.mode === 'dark' ? '#33485D' : '#fff', px: 2, py: '2px', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { backgroundColor: theme => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff' }
                }}
              />
            </Box>
          ) : (
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>No description</Typography>
          )}
        </Box>
      }
    </Box>
  )
}

export default CardDescriptionEditor
