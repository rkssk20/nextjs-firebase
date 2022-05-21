import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { dialogState } from '@/lib/recoil';
import Header from '@/components/dialog/Header'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'

const DialogPaper = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useRecoilState(dialogState)
  const router = useRouter()
  const content = dialog.content

  const handleClose = () => {
    setDialog({ content: '', id: null })
  }

  // ページ遷移でダイアログを閉じる
  useEffect(() => {
    router.beforePopState(() => {
      handleClose()

      return true
    })

    return () => router.beforePopState(() => true)
  }, [])

  return (
    <Dialog
      open={ content !== '' }
      fullWidth
      maxWidth='sm'
      onClose={ handleClose }
    >
      <Header handleClose={ handleClose } />

      <DialogContent>
        { children }
      </DialogContent>
    </Dialog>
  )
}

export default DialogPaper