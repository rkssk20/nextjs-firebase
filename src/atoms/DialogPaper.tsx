import { ReactNode } from 'react'

import styles from '@/styles/atoms/dialogPaper.module.scss'
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'; 

interface DialogPaperProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const DialogPaper = ({ open, handleClose, children }: DialogPaperProps) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      className={ styles.dialog }
      classes={{ paper: styles.dialog_paper }}
      fullScreen={ mobile }
      open={ open }
      onClose={ handleClose }
    >
      { children }
    </Dialog>
  )
}

export default DialogPaper