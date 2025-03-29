import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CancelIcon from '@mui/icons-material/Cancel'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'

import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { singleFileValidator } from '~/utils/validators'
import CardUserGroup from './CardUserGroup'
import CardActivitySection from './CardActivitySection'
import { styled } from '@mui/material/styles'

import { useDispatch } from 'react-redux'
import { clearAndHideCurrActiveCard, selectCurrActiveCard, selectIsShowModal, updateCurrActiveCard } from '~/redux/activeCard/activeCardSlice'
import { useSelector } from 'react-redux'
import { updateBoardDetailsAPI, updateCardDetailsAPI } from '~/apis'
import { selectCurrActiveBoard, updateCardInBoard, updateCurrActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { selectCurrUser } from '~/redux/user/userSlice'
import { CARD_MEMBER_ACTIONS } from '~/utils/constants'
import { PersonRemoveOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'
import CardDescriptionEditor from './CardDescriptionEditor'
import CardLabelGroup from './CardLabelGroup'
import ChecklistGroup from './Checklist/ChecklistGroup'
import { useState } from 'react'
import { Chip } from '@mui/material'
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  userSelect: 'none',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))

function ActiveCard() {
  const dispatch = useDispatch()
  const currUser = useSelector(selectCurrUser)
  const activeCard = useSelector(selectCurrActiveCard)
  const activeBoard = useSelector(selectCurrActiveBoard)
  const isShowModal = useSelector(selectIsShowModal)

  const [anchorPopover, setAnchorPopover] = useState(null)
  const FE_CardLabels = activeCard?.labelIds?.map(
    labelId => activeBoard?.labels?.find(label => label.id === labelId)
  ).filter(label => label)

  const [isAddingChecklistOpen, setIsAddingChecklistOpen] = useState(false)

  // const [isOpen, setIsOpen] = useState(true)
  // const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => {
    dispatch(clearAndHideCurrActiveCard())
  }

  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData)

    dispatch(updateCurrActiveCard(updatedCard))
    dispatch(updateCardInBoard(updatedCard))

    return updatedCard
  }

  const onUpdateCardTitle = (newTitle) => {
    callApiUpdateCard({ title: newTitle.trim() })
  }

  const onUpdateCardDescription = (newDescription) => {
    callApiUpdateCard({ description: newDescription })
  }

  const onUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      callApiUpdateCard(reqData).finally(() => event.target.value = ''),
      {
        loading: 'Updating...',
        success: 'Updated successfully'
      }
    )
  }

  const onAddCardComment = async (commentToAdd) => {
    await callApiUpdateCard({ commentToAdd })
  }

  const onUpdateCardMembers = (memberInfo) => {
    callApiUpdateCard({ memberInfo })
  }

  const onUpdateCardLabels = (labelInfo) => {
    if (labelInfo.action === 'CREATE')
      updateBoardDetailsAPI(activeCard.boardId, { newLabel: labelInfo.newLabel })
        .then(res => {
          dispatch(updateCurrActiveBoard({ ...activeBoard, labels: res.labels }))
        })

    else if (labelInfo.action === 'UPDATE')
      updateBoardDetailsAPI(activeCard.boardId, { updatedLabel: labelInfo.updatedLabel })
        .then(res => {
          dispatch(updateCurrActiveBoard({ ...activeBoard, labels: res.labels }))
        })

    else if (labelInfo.action === 'DELETE') {
      updateBoardDetailsAPI(activeCard.boardId, { removeLabelId: labelInfo.labelId })
        .then(res => {
          dispatch(updateCurrActiveBoard({ ...activeBoard, labels: res.labels }))
        })
    }
    else callApiUpdateCard({ labelInfo })
  }

  const handleUpdateCardChecklists = (checklistInfo) => {
    callApiUpdateCard({ checklistInfo })
  }

  return (
    <Modal
      disableScrollLock
      open={isShowModal}
      onClose={handleCloseModal} // Use onClose when you want to close the Modal with the ESC key or by clicking outside the Modal
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        maxWidth: 1000,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: '40px 20px 20px',
        margin: '50px auto',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#f1f2f4'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>

        {activeCard?.cover &&
          <Box sx={{ my: 2 }}>
            <img
              style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover', objectPosition: 'center' }}
              src={activeCard?.cover}
              alt="card-cover"
            />
          </Box>
        }

        <Box sx={{ mt: -2, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon />

          {/* Feature: Handle the Card title */}
          <ToggleFocusInput
            inputFontSize='22px'
            value={activeCard?.title || ''}
            onChangedValue={onUpdateCardTitle} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid xs={12} sm={9}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              {/* Feature: Manage Card members */}
              <Box>
                <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>
                <CardUserGroup
                  cardMemberIds={activeCard?.memberIds}
                  onUpdateCardMembers={onUpdateCardMembers}
                />
              </Box>

              {/* Feature: Manage Card labels */}
              <Box sx={{ visibility: FE_CardLabels?.length > 0 ? 'visible' : 'hidden', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Labels</Typography>
                <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {FE_CardLabels?.map((label, index) => (
                    <Chip
                      key={index}
                      label={label?.name}
                      sx={{
                        backgroundColor: label?.color,
                        color: '#fff',
                        height: 32,
                        maxWidth: 250,
                        borderRadius: 1
                      }}
                    />
                  ))}
                  <Tooltip title="Add or edit labels">
                    <Box
                      onClick={(e) => setAnchorPopover(e.currentTarget)}
                      sx={{
                        width: 36,
                        height: 36,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        borderRadius: 2,
                        color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d'),
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[300]),
                        '&:hover': {
                          color: (theme) => (theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4'),
                          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff')
                        }
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Box>
                  </Tooltip>
                </Box>

                {/* Feature: Manage Card labels */}
                <CardLabelGroup
                  cardLabelIds={activeCard?.labelIds}
                  board={activeBoard}
                  onUpdateCardLabels={onUpdateCardLabels}
                  anchorEl={anchorPopover}
                  onClose={() => setAnchorPopover(null)}
                />
              </Box>
            </Box>

            {/* Feature: Handle the Card description */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Description</Typography>
              </Box>

              <CardDescriptionEditor
                cardDescriptionProp={activeCard?.description || ''}
                handleUpdateCardDescription={onUpdateCardDescription}
              />

            </Box>

            {/* Feature: Handle the Card checklists */}
            {(activeCard?.checklists?.length > 0 || isAddingChecklistOpen) &&
              <Box sx={{ mb: 3 }}>
                <ChecklistGroup
                  checklists={activeCard?.checklists}
                  onUpdateCardChecklists={handleUpdateCardChecklists}
                  isAddingChecklistOpen={isAddingChecklistOpen}
                  setIsAddingChecklistOpen={setIsAddingChecklistOpen}
                />
              </Box>
            }

            {/* Feature: Handle actions such as adding comments to the Card */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Activity</Typography>
              </Box>

              <CardActivitySection
                cardComments={activeCard?.comments}
                onAddCardComment={onAddCardComment}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
            <Stack direction="column" spacing={1}>
              {/* Feature: Allow the user to join the Card themselves */}
              {!activeCard?.memberIds?.includes(currUser?._id)
                ? (
                  <SidebarItem className="active" onClick={() => onUpdateCardMembers({
                    userId: currUser._id,
                    action: CARD_MEMBER_ACTIONS.ADD
                  })}>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                    Join
                  </SidebarItem>
                )
                : (
                  <SidebarItem className="active" onClick={() => onUpdateCardMembers({
                    userId: currUser._id,
                    action: CARD_MEMBER_ACTIONS.REMOVE
                  })}>
                    <PersonRemoveOutlined fontSize="small" />
                    Leave
                  </SidebarItem>
                )}
              {/* Feature: Update the Card Cover image */}
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              {/* <SidebarItem><LocalOfferOutlinedIcon fontSize="small" />Labels</SidebarItem> */}
              <SidebarItem
                className="active"
                onClick={(e) => setAnchorPopover(e.currentTarget)}
              >
                <LocalOfferOutlinedIcon fontSize="small" />
                Labels
              </SidebarItem>

              <CardLabelGroup
                cardLabelIds={activeCard?.labelIds}
                board={activeBoard}
                onUpdateCardLabels={onUpdateCardLabels}
                anchorEl={anchorPopover}
                onClose={() => setAnchorPopover(null)}
              />

              <SidebarItem className="active" onClick={() => setIsAddingChecklistOpen(true)}>
                <TaskAltOutlinedIcon fontSize="small" />
                Checklist
              </SidebarItem>

              {/* <SidebarItem><AttachFileOutlinedIcon fontSize="small" />Attachment</SidebarItem>
              <SidebarItem><WatchLaterOutlinedIcon fontSize="small" />Dates</SidebarItem>
              <SidebarItem><AutoFixHighOutlinedIcon fontSize="small" />Custom Fields</SidebarItem> */}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Power-Ups</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><AspectRatioOutlinedIcon fontSize="small" />Card Size</SidebarItem>
              <SidebarItem><AddToDriveOutlinedIcon fontSize="small" />Google Drive</SidebarItem>
              <SidebarItem><AddOutlinedIcon fontSize="small" />Add Power-Ups</SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><ArrowForwardOutlinedIcon fontSize="small" />Move</SidebarItem>
              <SidebarItem><ContentCopyOutlinedIcon fontSize="small" />Copy</SidebarItem>
              <SidebarItem><AutoAwesomeOutlinedIcon fontSize="small" />Make Template</SidebarItem>
              <SidebarItem><ArchiveOutlinedIcon fontSize="small" />Archive</SidebarItem>
              <SidebarItem><ShareOutlinedIcon fontSize="small" />Share</SidebarItem>
            </Stack> */}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
