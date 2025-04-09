import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'

import { useSelector } from 'react-redux'
import { selectCurrUser } from '~/redux/user/userSlice'
import { socketIo } from '~/socketClient'
import { useState } from 'react'
import { useEffect } from 'react'

function CardActivitySection({ cardComments = [], onAddCardComment, currCardId, boardId }) {
  const currentUser = useSelector(selectCurrUser)
  const displayName = currentUser?.displayName
  const [typingUser, setTypingUser] = useState('')

  const handleAddCardComment = (event) => {
    // Detect user pressing Enter without Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent new line on Enter
      if (!event.target?.value) return // Do nothing if the input is empty

      // Create a comment object to send to the API
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      }
      onAddCardComment(commentToAdd).then(() => {
        event.target.value = ''
      })

      socketIo.emit('FE_STOP_TYPING_CARD_COMMENT', { boardId, cardId: currCardId })
    }
  }

  const handleTyping = (e) => {
    if (e.target.value.length > 0) {
      socketIo.emit('FE_TYPING_CARD_COMMENT', { boardId, cardId: currCardId, displayName })
    } else {
      socketIo.emit('FE_STOP_TYPING_CARD_COMMENT', { boardId, cardId: currCardId })
    }
  }

  useEffect(() => {
    socketIo.on('BE_TYPING_CARD_COMMENT', ({ cardId, displayName }) => {
      if (cardId !== currCardId) return
      setTypingUser(displayName)
    })

    socketIo.on('BE_STOP_TYPING_CARD_COMMENT', ({ cardId }) => {
      if (cardId !== currCardId) return
      setTypingUser('')
    })

    return () => {
      socketIo.off('BE_TYPING_CARD_COMMENT')
      socketIo.off('BE_STOP_TYPING_CARD_COMMENT')
    }
  }, [currCardId])

  return (
    <Box sx={{ mt: 2 }}>
      {/* Handle adding comments to the Card */}
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <TextField
          fullWidth
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : '#fff',
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
            '.MuiFormHelperText-root': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#f1f2f4',
              width: '100%', mx: 0, fontSize: '12px', color: '#b1b1b1'
            }
          }}
          placeholder="Write a comment..."
          type="text"
          helperText="Press Enter to post comment or Shift + Enter for a new line"
          variant="outlined"
          multiline
          onChange={handleTyping}
          onKeyDown={handleAddCardComment}
        />
        {typingUser && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
              }
            }}
          >
            <Typography
              sx={{
                fontSize: '12px !important',
                color: '#1976d2',
                fontStyle: 'italic'
              }}
            >
              @{typingUser} is typing
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '4px'
              }}
            >
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  animation: 'bounce 1.2s infinite',
                  animationDelay: '0s',
                  '@keyframes bounce': {
                    '0%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-6px)' }
                  }
                }}
              />
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  animation: 'bounce 1.2s infinite',
                  animationDelay: '0.2s'
                }}
              />
              <Box
                sx={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  animation: 'bounce 1.2s infinite',
                  animationDelay: '0.4s'
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Display comment list */}
      {cardComments.length === 0 &&
        <Typography sx={{ fontSize: '16px !important', fontWeight: '500', color: '#b1b1b1' }}>
          No activity found!
        </Typography>
      }
      {cardComments.map((comment, index) =>
        <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="avt"
            src={comment?.userAvatar}
          />
          <Box sx={{ width: 'inherit' }}>
            <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              {comment?.userDisplayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px', float: 'right' }}>
              {moment(comment?.commentedAt).format('llll')}
            </Typography>

            <Box sx={{
              display: 'block',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : '#fff',
              p: '8px 12px',
              mt: '4px',
              border: '0.5px solid rgba(161, 160, 160, 0.2)',
              borderRadius: 3,
              wordBreak: 'break-word',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
            }}>
              {comment?.content}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardActivitySection
