import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

const Header = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <DialogTitle>
      <IconButton  aria-label='戻る' onClick={ handleClose }>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  )
}

export default Header