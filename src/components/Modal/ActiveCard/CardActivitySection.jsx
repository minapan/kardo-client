import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'

import { useSelector } from 'react-redux'
import { selectCurrUser } from '~/redux/user/userSlice'

function CardActivitySection({ cardComments = [], onAddCardComment }) {
  const currentUser = useSelector(selectCurrUser)

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
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Handle adding comments to the Card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : '#fff',
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }
          }}
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
        />
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
            sx={{ width: 36, height: 36, cursor: 'pointer' }}
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
