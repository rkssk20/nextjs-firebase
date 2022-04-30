import DialogPaper from "@/atoms/DialogPaper"

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

interface ReportProps {
  open: boolean;
  handleClose: () => void;
  id: string;
}

const Report = ({ open, handleClose, id }: ReportProps) => {
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
        <Typography variant='h4'>問題を報告する</Typography>
        <Typography variant='caption'>問題の詳細をお知らせください。</Typography> 
      </DialogContent>
    </DialogPaper>
  )
}

export default Report