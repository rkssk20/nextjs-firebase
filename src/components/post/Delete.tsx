import DialogPaper from "@/atoms/DialogPaper"

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

interface DeleteProps {
  open: boolean;
  handleClose: () => void;
  id: string;
}

const Delete = ({ open, handleClose, id }: DeleteProps) => {
  return (
    <DialogPaper
      open={ open }
      handleClose={ handleClose }
    >
      <DialogTitle>
        <IconButton onClick={ handleClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant='h4'>この記事を削除しますか？</Typography>
        <Typography variant='body1' color='error'>削除された記事は戻すことができません。</Typography> 
      </DialogContent>
    </DialogPaper>
  )
}

export default Delete