import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import LoginContent from '@/atoms/LoginContent'
import Layout from '@/components/provider/Layout'

import DialogContent from '@mui/material/DialogContent'

const Login = () => {
  const setNotificate = useSetRecoilState(notificateState)
  const router = useRouter()

  // ログイン時
  if (supabase.auth.user()) {
    router.replace('/').then(() => {
      setNotificate({
        open: true,
        message: '既にログインしています。',
      })
    })

    return null
    // ログアウト時
  } else {
    return (
      <Layout type='article' title='' description='' image=''>
        <DialogContent>
          <LoginContent />
        </DialogContent>
      </Layout>
    )
  }
}

export default Login
