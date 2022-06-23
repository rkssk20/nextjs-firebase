import type { DialogProps } from '@/types/types'
import Dialog from '@/components/dialog/Dialog'
import LoginContent from '@/atoms/LoginContent'

const Login = ({ dialog, setDialog, handleClose }: DialogProps) => {
  return (
    <Dialog
      dialog={ dialog }
      setDialog={ setDialog }
      handleClose={ handleClose }
    >
      <LoginContent />
    </Dialog>
  )
}

export default Login