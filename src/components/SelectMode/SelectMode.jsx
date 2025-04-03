import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function SelectMode() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <Select
      size="small"
      sx={{
        color: '#fff',
        padding: 0,
        '& .MuiSelect-select.MuiInputBase-input': { height: '25px', padding: '0 !important' },
        '& .MuiSelect-icon': { display: 'none' },
        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }
      }}
      labelId="demo-select-dark-light-mode-label"
      id="demo-select-dark-light-mode"
      value={mode}
      onChange={handleChange}
      renderValue={(selected) => {
        if (!selected) return <SettingsBrightnessIcon fontSize='small' />
        return {
          'light': <LightModeIcon fontSize='small' />,
          'dark': <DarkModeIcon fontSize='small' />,
          'system': <SettingsBrightnessIcon fontSize='small' />
        }[selected]
      }}
    >
      <MenuItem value={'light'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightModeIcon fontSize='small' /> Light
        </Box>
      </MenuItem>
      <MenuItem value={'dark'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DarkModeIcon fontSize='small' /> Dark
        </Box>
      </MenuItem>
      <MenuItem value={'system'}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsBrightnessIcon fontSize='small' /> System
        </Box>
      </MenuItem>
    </Select>
  )
}

export default SelectMode