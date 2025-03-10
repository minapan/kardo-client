import { useState } from 'react'
import TextField from '@mui/material/TextField'

// A neat trick for handling UI/UX when toggling input visibility:
// Instead of using state to switch between a standard text and an input field,
// we can style the input to look like normal text by default and only apply
// input styles when it is clicked or focused.
// https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled

function ToggleFocusInput({ value, onChangedValue, inputFontSize = '0.875rem', ...props }) {
  const [inputValue, setInputValue] = useState(value)

  // Blur event triggers when the input loses focus
  const triggerBlur = () => {
    // Trim input value for a cleaner display when the field loses focus
    setInputValue(inputValue.trim())

    // If there’s no change in value or the user clears the field, revert to the original prop value and exit
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    // console.log('value: ', value)
    // console.log('inputValue: ', inputValue)
    // If the value has changed, call the parent function to handle the update
    onChangedValue(inputValue)
  }

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant='outlined'
      size="small"
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value) }}
      onBlur={triggerBlur}
      {...props}
      // Magic happens here :D
      sx={{
        '& label': {},
        '& input': { fontSize: inputFontSize, fontWeight: 'bold' },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
          '& fieldset': { borderColor: 'primary.main' }
        },
        '& .MuiOutlinedInput-input': {
          px: '6px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }}
    />
  )
}

export default ToggleFocusInput
