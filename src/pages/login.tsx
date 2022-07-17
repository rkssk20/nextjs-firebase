import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'
import LoginContent from '@/atoms/LoginContent'
import Circular from '@/atoms/Circular'
import ContainerLayout from '@/components/provider/ContainerLayout'
import PageLayout from '@/components/provider/PageLayout'

import DialogContent from '@mui/material/DialogContent'

const Login = () => {
  const router = useRouter()
  const account = useRecoilValue(accountState)

  if(account.loading) {
    return <Circular />

  // ログイン済み
  } else if (account.data?.id) {
    router.replace('/')

    return null
    // ログアウト時
  } else {
    return (
      <ContainerLayout type='article' title='' description='' image=''>
        <DialogContent>
          <LoginContent />
        </DialogContent>
      </ContainerLayout>
    )
  }
}

export default Login

Login.getLayout = function getLayout (page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
}