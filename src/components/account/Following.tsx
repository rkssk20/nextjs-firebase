import useFollowing from '@/hooks/useFollowing'
import { useSetRecoilState } from 'recoil'
import { dialogState } from '@/lib/recoil'
import { ContainedButton, OutlinedButton } from '@/atoms/Button'
import { supabase } from '@/lib/supabaseClient'

import styles from '@/styles/components/account/following.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

// ログイン時、フォローまたはフォローを外すボタン
const LoginFollowing = ({ path }: { path: string }) => {
  const { data, isFetching } = useFollowing(path)

  return (
    isFetching ? <CircularProgress size={ 38.25 } />
    :
    data ?
    <ContainedButton text='フォロー中' handle={ () => console.log('フォローを外した')} />
    :
    <OutlinedButton text='フォロー' handle={ () => null } />
  )
}

// ログアウト時、ログインボタン
const LogoutFollowing = () => {
  const setDialogState = useSetRecoilState(dialogState)

  return <OutlinedButton
    text='フォロー'
    handle={ () =>
      setDialogState({
        open :true,
        content: 'login',
        id: null
      })
    }
  />
}

const Following = ({ path }: { path: string }) => {
  return (
    <div className={ styles.follow_button }>
      {/* ログイン状態で切り替え */}
      { supabase.auth.user() ?
        <LoginFollowing path={ path } />
        :
        <LogoutFollowing />
      }
    </div>
  )
}

export default Following