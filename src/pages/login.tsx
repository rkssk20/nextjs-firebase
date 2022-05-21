import LoginContent from '@/atoms/LoginContent'
import Layout from '@/components/provider/Layout'

import DialogContent from '@mui/material/DialogContent'

const Login = () => {
  return (
    <Layout
      type='article'
      title=''
      description=''
      image=''
    >
      <DialogContent>
        <LoginContent />
      </DialogContent>
    </Layout>
  )
}

export default Login