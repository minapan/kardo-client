import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
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
    <FormControl size="small">
      <InputLabel id="demo-select-dark-light-mode-label">Mode</InputLabel>
      <Select
        labelId="demo-select-dark-light-mode-label"
        id="demo-select-dark-light-mode "
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value={'light'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LightModeIcon fontSize='small' />Light
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkModeIcon fontSize='small' />Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsBrightnessIcon fontSize='small' />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectMode