import { Box, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useToasterStore } from 'react-hot-toast'
import { Toaster, ToastBar, toast } from 'react-hot-toast'
import { TOAST_LIMIT } from '~/utils/constants'

const ToastContainer = () => {
  const theme = useTheme()
  const { toasts } = useToasterStore()
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)) // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts])

  return (
    <Box>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: theme.palette.mode === 'dark' ? '#1E1E1E' : theme.palette.background.paper,
            color: theme.palette.mode === 'dark' ? '#E0E0E0' : theme.palette.text.primary,
            boxShadow: theme.palette.mode === 'dark' ? '0px 4px 12px rgba(255, 255, 255, 0.2)' : theme.shadows[3],
            border: theme.palette.mode === 'dark' ? '1px solid #555' : 'none'
          }
        }}
      >
        {(t) => (
          <div onClick={() => toast.dismiss(t.id)} style={{ cursor: 'pointer' }}>
            <ToastBar toast={t} style={{ gap: '8px' }} />
          </div>
        )}
      </Toaster>
    </Box>
  )
}

export default ToastContainer
