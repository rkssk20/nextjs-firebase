import dynamic from 'next/dynamic'
import { useRecoilState } from 'recoil';
import { dialogState } from '@/lib/recoil';
import usePopState from '@/hooks/atoms/usePopState';
import Header from '@/components/dialog/Header'

const LoginContent = dynamic(import('@/atoms/LoginContent'))
const Share = dynamic(() => import('@/components/dialog/Share'))
const Report = dynamic(() => import('@/components/dialog/Report'))
const Delete = dynamic(() => import('@/components/dialog/Delete'))

import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'

const Dialog = () => {
  const [dialog, setDialog] = useRecoilState(dialogState)
  const content = dialog.content

  // ダイアログを閉じる
  const handleClose = () => {
    setDialog({
      open: false,
      content: '',
      id: null
    })
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
        { (content === 'login') && <LoginContent /> }
        { (content === 'share') && <Share /> }
        { ((content === 'article_report') || (content === 'comment_report')) && <Report /> }
        { ((content === 'article_delete') || (content === 'comment_delete')) && <Delete /> }
      </DialogContent>
    </MuiDialog>
  )
}

export default Dialog