import { useRouter } from 'next/router';
import { ContainedButton, OutlinedButton } from '@/atoms/Button';
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/account/profiles.module.scss'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'

const Profile = () => {
  const router = useRouter()
  const test_name = 'アカウント'
  const test_display_name = 'josigoe'

  return (
    <Stack className={ styles.profiles }>
      <Stack className={ styles.top } direction='row'>
        <UserIcon name={ test_name.slice(0, 1) } variant='large' />

        <Stack justifyContent='center' className={ styles.profile_right }>
          <Typography component='p' variant='h3'>
            { test_name }
          </Typography>

          <Typography className={ styles.display_id } variant='body1'>
            { '@' + test_display_name }
          </Typography>
          
          <Stack
            className={ styles.buttons }
            direction='row'
            alignItems='center' 
            justifyContent='center'
          >
            <ContainedButton
              text='設定'
              handle={ () => router.push(`/account/${ router.query.display_id }/setting`) }
            />

            <OutlinedButton text='ログアウト' handle={ () => console.log('ログアウト')} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Profile