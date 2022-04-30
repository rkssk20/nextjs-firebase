import { useState } from 'react';
import { ContainedButton, OutlinedButton } from '@/atoms/Button';
import UserIcon from '@/atoms/UserIcon'
import Setting from '@/components/account/Setting'

import styles from '@/styles/components/account/profiles.module.scss'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'

const Profile = () => {
  const [setting, setSetting] = useState(false)

  const test_name = 'アカウント'

  return (
    <Stack className={ styles.profiles }>
      <Stack className={ styles.top } direction='row'>
        <UserIcon name={ test_name.slice(0, 1) } variant='large' />

        <Stack
          className={ styles.buttons }
          direction='row'
          alignItems='center' 
          justifyContent='center'
        >
          <ContainedButton text='設定' handle={ () => setSetting(true) } />

          <OutlinedButton text='ログアウト' handle={ () => console.log('ログアウト')} />
        </Stack>
      </Stack>

      <Typography variant='h3'>
        { test_name }
      </Typography>

      <Setting setting={ setting } setSetting={ setSetting } />
    </Stack>
  )
}

export default Profile