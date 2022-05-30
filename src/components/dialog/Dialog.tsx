import type { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { dialogState } from '@/lib/recoil';
import usePopState from '@/hooks/atoms/usePopState';
import Header from '@/components/dialog/Header'

import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'

const Dialog = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useRecoilState(dialogState)
  const content = dialog.content

  const handleClose = () => {
    setDialog({ content: '', id: null })
  }

  // ページ遷移時にダイアログを消す
  usePopState(handleClose)

  return (
    <MuiDialog
      open={ content !== '' }
      fullWidth
      maxWidth='sm'
      onClose={ handleClose }
    >
      <Header handleClose={ handleClose } />

      <DialogContent>
        { children }
      </DialogContent>
    </MuiDialog>
  )
}

export default Dialog