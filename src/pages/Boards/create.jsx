import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'

import { createNewBoardAPI, uploadCoverImageAPI } from '~/apis'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { Upload } from '@mui/icons-material'
import { Image } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { CardMedia, IconButton } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { useEffect } from 'react'
import axios from 'axios'
import { Close } from '@mui/icons-material'
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

// const BOARD_TYPES = {
//   PUBLIC: 'public',
//   PRIVATE: 'private'
// }

function SidebarCreateBoardModal({ afterCreate }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => setIsOpen(true)

  const handleCloseModal = () => {
    setIsOpen(false)
    setCoverPreview(null)
    setUnsplashPhotos([])
    reset()
  }

  const [coverPreview, setCoverPreview] = useState(null)
  const [unsplashPhotos, setUnsplashPhotos] = useState([])
  const [isUnsplashOpen, setIsUnsplashOpen] = useState(false)

  useEffect(() => {
    if (isUnsplashOpen && unsplashPhotos.length === 0) {
      fetchRandomUnsplashPhotos()
    }
  }, [isUnsplashOpen, unsplashPhotos.length])
  const handleFileChange = (event) => {
    const file = event?.target?.files[0]

    if (file) {
      const error = singleFileValidator(file)
      if (error) {
        toast.error(error)
        return
      }

      const previewUrl = URL.createObjectURL(file)
      setCoverPreview({ file, previewUrl })
    }
  }

  const fetchRandomUnsplashPhotos = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          count: 12,
          query: 'landscape nature scenery',
          orientation: 'landscape',
          featured: true,
          client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }
      })
      setUnsplashPhotos(response.data)
    } catch (error) {
      toast.error('Failed to fetch Unsplash cover images')
    }
  }

  const submitCreateNewBoard = async (data) => {
    const boardData = {
      title: data.title,
      description: data.description || ''
    }

    let coverUrl = null
    if (coverPreview?.file) {
      const formData = new FormData()
      formData.append('boardCover', coverPreview.file)

      await toast.promise(
        uploadCoverImageAPI(formData),
        { loading: 'Uploading...' }
      ).then(res => {
        if (!res.error) {
          coverUrl = res
        }
      })
    }
    else if (coverPreview?.previewUrl?.startsWith('https://'))
      coverUrl = coverPreview.previewUrl

    if (coverUrl) {
      boardData.cover = coverUrl
    }

    createNewBoardAPI(boardData).then(() => {
      handleCloseModal()
      afterCreate()
    })
  }

  return (
    <>
      {/* Sidebar item to trigger modal */}
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      {/* Modal for creating a new board */}
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', md: '500px' },
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: '8px',
            border: 'none',
            outline: 0,
            padding: '20px 30px',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
          }}
        >
          {/* Close button */}
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
          >
            <IconButton onClick={handleCloseModal}>
              <Close fontSize='medium' />
            </IconButton>
          </Box>

          {/* Modal title */}
          <Box id="modal-modal-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryAddIcon />
            <Typography variant="h6" component="h2">Create a new board</Typography>
          </Box>

          {/* Form for board creation */}
          <Box id="modal-modal-description" sx={{ my: 2 }}>
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Board Title Field */}
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AbcIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min length is 3 characters' },
                      maxLength: { value: 50, message: 'Max length is 50 characters' }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                {/* Board Description Field */}
                <Box>
                  <TextField
                    fullWidth
                    label="Description (Optional)"
                    type="text"
                    variant="outlined"
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    {...register('description', {
                      maxLength: { value: 255, message: 'Max length is 255 characters' }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                {/* Board Cover Field */}
                <Box>
                  <Typography sx={{ mb: 1, color: 'text.secondary', fontSize: '0.75rem !important' }}>
                    Cover (Optional)
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size='small'
                      component="label"
                      startIcon={<Upload />}
                    >
                      Upload Image
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Image />}
                      onClick={() => setIsUnsplashOpen(true)}
                    >
                      Choose from Unsplash
                    </Button>

                    <Modal
                      open={isUnsplashOpen}
                      onClose={() => setIsUnsplashOpen(false)}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'background.paper',
                          outline: 'none',
                          borderRadius: '8px',
                          p: 2,
                          width: { xs: '90%', md: '600px' },
                          maxHeight: '80vh',
                          overflowY: 'auto'
                        }}
                      >
                        <Typography variant="h6" sx={{ mb: 2 }}>Choose from Unsplash</Typography>
                        <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                          <Typography color="text.secondary">Select a random image</Typography>
                          <IconButton
                            variant="text"
                            size="small"
                            sx={{ ml: 1, p: 0 }}
                            onClick={fetchRandomUnsplashPhotos}
                          >
                            <Refresh />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                          {unsplashPhotos.length > 0 ? (
                            unsplashPhotos.map((photo) => (
                              <CardMedia
                                key={photo.id}
                                component="img"
                                image={photo.urls.small}
                                alt={photo.alt_description || 'Random image'}
                                sx={{
                                  width: { xs: '48%', sm: '32%' },
                                  height: 'auto',
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  '&:hover': { opacity: 0.8 }
                                }}
                                onClick={() => {
                                  setCoverPreview({ previewUrl: photo.urls.full })
                                  setIsUnsplashOpen(false)
                                }}
                              />
                            ))
                          ) : (
                            <Typography color="text.secondary">Click Refresh to load random images</Typography>
                          )}
                        </Box>
                      </Box>
                    </Modal>

                    {coverPreview && (
                      <Box sx={{ mt: 1 }}>
                        <CardMedia
                          component="img"
                          image={coverPreview.previewUrl}
                          alt="Cover preview"
                          sx={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', backgroundPosition: 'center' }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Board Type Selection
                MUI RadioGroup requires Controller for react-hook-form integration
                * https://stackoverflow.com/a/73336101
                * https://mui.com/material-ui/react-radio-button/ */}
                {/* <Controller
                  name="type"
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(event, value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size="small" />}
                        label="Public"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size="small" />}
                        label="Private"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  )}
                /> */}

                {/* Submit Button */}
                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                </Box>

              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SidebarCreateBoardModal
