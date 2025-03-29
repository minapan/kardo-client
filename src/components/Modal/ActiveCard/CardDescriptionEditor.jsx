import { useState } from 'react'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRef } from 'react'
import JoditEditor from 'jodit-react'
import DOMPurify from 'dompurify'
import { CircularProgress, Typography } from '@mui/material'
import { cardSummarizeAPI } from '~/apis'
import { AutoAwesome } from '@mui/icons-material'
import { useEffect } from 'react'

function CardDescriptionEditor({ cardDescriptionProp, handleUpdateCardDescription }) {
  const { mode } = useColorScheme()
  const editor = useRef(null)
  const summaryRef = useRef(null)

  // State to handle Edit mode and View mode
  const [editMode, setEditMode] = useState(false)
  // State to manage HTML content when editing
  const [cardDescription, setCardDescription] = useState(cardDescriptionProp)

  const updateCardDescription = () => {
    if (cardDescription === cardDescriptionProp) {
      setEditMode(false)
      return
    }

    const sanitizedDescription = DOMPurify.sanitize(cardDescription)
    setEditMode(false)
    handleUpdateCardDescription(sanitizedDescription)
    setSummary('')
  }

  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    setLoading(true)
    setError('')
    setSummary('')

    await cardSummarizeAPI({ description: cardDescription })
      .then((response) => {
        setSummary(response)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [summary])

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
              {!summary &&
                <Button
                  sx={{
                    float: 'right',
                    mt: 1,
                    background: 'linear-gradient(45deg, #4285F4 30%, #34A853 50%, #FBBC05 70%, #EA4335 90%)',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: 2,
                    padding: '8px 16px',
                    boxShadow: '0 3px 5px 2px rgba(66, 133, 244, .3)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3B78E7 30%, #2E9B47 50%, #F4B400 70%, #D93025 90%)',
                      boxShadow: '0 5px 10px 2px rgba(66, 133, 244, .4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  variant="outlined"
                  onClick={handleSummarize}
                  disabled={loading}
                  size="small"
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  <AutoAwesome sx={{ mr: 1 }} />
                  AI Summarize
                </Button>
              }
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              {summary && (
                <Box
                  ref={summaryRef}
                  sx={{
                    mt: 2,
                    p: 2,
                    border: '2px solid',
                    borderImage: 'linear-gradient(45deg, #4285F4, #34A853) 1',
                    borderRadius: '8px',
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#1a2b3c' : '#f9fafb',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderImage: 'linear-gradient(45deg, #3B78E7, #2E9B47) 1',
                      boxShadow: '0 4px 12px rgba(66, 133, 244, .2)'
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: theme => theme.palette.mode === 'dark' ? '#90caf9' : '#4285F4' }}
                  >
                    Summary:
                  </Typography>
                  <Typography sx={{ mt: 1, fontStyle: 'italic', color: theme => theme.palette.mode === 'dark' ? '#e0e0e0' : '#555' }}>
                    {summary}
                  </Typography>
                </Box>
              )}
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
