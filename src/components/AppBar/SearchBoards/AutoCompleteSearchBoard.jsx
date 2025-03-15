import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { fetchBoardsAPI } from '~/apis'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

// https://mui.com/material-ui/react-autocomplete/#asynchronous-requests
function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  // State to manage whether the search results should be displayed
  const [open, setOpen] = useState(false)
  // State to store the list of fetched boards
  const [boards, setBoards] = useState(null)
  // Shows loading when the API request starts fetching boards
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // When the result list is closed, reset the boards state to null
    if (!open) { setBoards(null) }
  }, [open])

  // Handles user input from the search field and triggers API calls (should be debounced)
  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value
    if (!searchValue) return
    // console.log(searchValue)

    // Uses createSearchParams from react-router-dom to construct a valid search path with q[title] for API requests
    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
    // console.log(searchPath)

    setLoading(true)
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  // Implement useDebounceFn...
  const debounceSearch = useDebounceFn(handleInputSearchChange, 1000)

  // When a specific board is selected, navigate to that board
  const handleSelectedBoard = (event, selectedBoard) => {
    // Ensure a valid board is selected before calling navigate
    if (!selectedBoard) return
    navigate(`/b/${selectedBoard._id}`)
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      // This text appears when boards are null or when no results are found after fetching
      noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}

      // Handle opening and closing the search result dropdown
      open={open}
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}

      // getOptionLabel: Determines how Autocomplete extracts and displays board titles
      getOptionLabel={(board) => board.title}

      // Autocomplete requires options to be an array, but since we initialize boards as null, we add || [] to prevent errors
      options={boards || []}

      // Fixes an MUI warning: Autocomplete compares objects by reference, but two identical JSON objects in JavaScript are not equal when compared directly.
      // Instead, we compare a unique primitive value (_id) to avoid issues.
      // Reference: https://stackoverflow.com/a/65347275/8324172
      isOptionEqualToValue={(option, value) => option._id === value._id}

      // Handles loading state
      loading={loading}

      // onInputChange fires when text is typed in the input field. Debouncing is needed to prevent API spam.
      onInputChange={debounceSearch}

      // onChange fires when a board is selected from the dropdown
      onChange={handleSelectedBoard}

      // Renders the input field for searching
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            },
            '.MuiSvgIcon-root': { color: 'white' }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
