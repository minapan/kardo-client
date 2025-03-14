import { styled } from '@mui/material/styles'

/**
 * Example of customizing a file input beautifully:
 * Note that the wrapper component of this `VisuallyHiddenInput` must contain `component="label"`
 * as instructed in the MUI docs:
 * https://mui.com/material-ui/react-button/#file-upload
 * ...
 * Additionally, MUI recommends this library for file inputs if needed:
 * https://github.com/viclafouch/mui-file-input
 */
const HiddenInputStyles = styled('input')({
  display: 'none' // The MUI docs use long CSS rules, but just setting `display: none` is enough to hide the file input :)

  // clip: 'rect(0 0 0 0)',
  // clipPath: 'inset(50%)',
  // height: 1,
  // overflow: 'hidden',
  // position: 'absolute',
  // // Using `bottom: 0` as in the docs can cause an issue where clicking on `Modal ActiveCard` makes the page scroll to the bottom
  // left: 0,
  // whiteSpace: 'nowrap',
  // width: 1
})

function VisuallyHiddenInput(props) {
  return <HiddenInputStyles {...props} />
}

export default VisuallyHiddenInput
