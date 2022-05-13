import LoginContent from '@/atoms/LoginContent'

import { DialogProps } from '@/types/types'
import DialogHeader from '@/components/dialog/DialogHeader'
import DialogPaper from '@/components/dialog/DialogPaper'

const Login = ({ open, handleClose }: DialogProps) => {
  return (
    <DialogPaper open={ open } handleClose={ handleClose }>
      <DialogHeader handleClose={ handleClose } />

      <LoginContent />
    </DialogPaper>
  )
}

export default Login