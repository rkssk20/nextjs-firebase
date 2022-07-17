import { NextPage } from 'next'
import { ReactNode } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, notificateState } from '@/lib/recoil'
import { useRouter } from 'next/router'
import Circular from '@/atoms/Circular'

type Props = {
  children: ReactNode
}

const LoginOnly: NextPage<Props> = ({ children }) => {
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)
  const router = useRouter()

  if(account.loading) {
    return <Circular />
  } else if(account.data) {
    return <>{ children }</>
  } else {
    router.push('/login').then(() => setNotificate({ open: true, message: 'ログインが必要です。' }))

    return null
  }
}

export default LoginOnly
