import useFollowing from '@/hooks/useFollowing'
import { useSetRecoilState } from 'recoil'
import { dialogState } from '@/lib/recoil'
import { ContainedButton, OutlinedButton } from '@/atoms/Button'
import { supabase } from '@/lib/supabaseClient'

import styles from '@/styles/components/account/following.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

const LoginFollowing = ({ path }: { path: string }) => {
  const {  }
  
  return (
    <div className={ styles.follow_button }>
      { loading ? <CircularProgress size={ 38.25 } />
        :
        data ?
        <ContainedButton text='フォロー中' handle={ () => console.log('フォローを外した')} />
        :
        <OutlinedButton text='フォロー' handle={ () => null } />
      }
    </div>
  )
}

const LogoutFollowing = () => {
  const setDialogState = useSetRecoilState(dialogState)

  return <OutlinedButton text='フォロー' handle={ () => setDialogState({ content: 'login', id: null }) } />
}

const Following = ({ path }: { path: string }) => {
  if(supabase.auth.user()) {
    return (
      <LoginFollowing path={ path } />
    )
  } else {
    <LogoutFollowing />
  }
}

export default Following