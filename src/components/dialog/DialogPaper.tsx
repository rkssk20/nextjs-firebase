import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/components/dialog/dialog.module.scss'
import Dialog from '@mui/material/Dialog';

interface DialogPaperProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const DialogPaper = ({ open, handleClose, children }: DialogPaperProps) => {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(() => {
      handleClose()

      return true
    })

    return () => router.beforePopState(() => true)
  }, [])

  return (
    <Dialog
      className={ styles.dialog }
      classes={{ paper: styles.dialog_paper }}
      open={ open }
      onClose={ handleClose }
    >
      { children }
    </Dialog>
  )
}

export default DialogPaper