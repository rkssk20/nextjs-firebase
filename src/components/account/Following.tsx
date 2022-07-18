import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useSelectFollow from '@/hooks/select/useSelectFollows'
import useInsertFollows from '@/hooks/mutate/insert/useInsertFollows'
import useDeleteFollows from '@/hooks/mutate/delete/useDeleteFollows'
import { ContainedButton, OutlinedButton } from '@/atoms/Button'

const Login = dynamic(import('@/components/dialog/Login'))

import styles from '@/styles/components/account/following.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

const InsertFollows = ({ path, setData }: { path: string, setData: Dispatch<SetStateAction<boolean>> }) => {
  const mutate = useInsertFollows(path, setData)

  return <OutlinedButton text='フォロー' handle={() => mutate()} />
}

const DeleteFollows = ({ path, setData }: { path: string, setData: Dispatch<SetStateAction<boolean>> }) => {
  const mutate = useDeleteFollows(path, setData)

  return <ContainedButton text='フォロー中' handle={() => mutate()} />
}

// ログイン時、フォローまたはフォローを外すボタン
const LoginFollowing = ({ path }: { path: string }) => {
  const { data, loading, setData } = useSelectFollow(path)

  return loading ?
  <CircularProgress size={38.25} />
  : (data ?
  <DeleteFollows path={ path } setData={ setData } />
  :
  <InsertFollows path={ path } setData={ setData } />
  )
}

// ログアウト時、ログインボタン
const LogoutFollowing = () => {
  const [dialog, setDialog] = useState(false)

  if (dialog) return <Login dialog={dialog} handleClose={() => setDialog(false)} />

  return <OutlinedButton text='フォロー' handle={() => setDialog(true)} />
}

const Following = ({ path }: { path: string }) => {
  const account = useRecoilValue(accountState)

  return (
    <div className={styles.follow_button}>
      {/* ログイン状態で切り替え */}
      {account.data ? <LoginFollowing path={path} /> : <LogoutFollowing />}
    </div>
  )
}

export default Following
