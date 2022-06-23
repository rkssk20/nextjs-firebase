import type { ReactNode } from 'react';
import type { DialogProps } from '@/types/types';
import usePopState from '@/hooks/atoms/usePopState';

import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

type Props = DialogProps & {
  children: ReactNode
}

const Dialog = ({ dialog, setDialog, handleClose, children }: Props) => {
  // ページ遷移時にダイアログを消す
  usePopState(() => handleClose())

  return (
    <MuiDialog
      open={ dialog }
      fullWidth
      maxWidth='sm'
      onClose={ () => handleClose() }
    >
      <DialogTitle>
        <IconButton  aria-label='戻る' onClick={ handleClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        { children } 
      </DialogContent>
    </MuiDialog>
  )
}

export default Dialog