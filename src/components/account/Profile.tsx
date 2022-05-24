import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { ProfileDetailsType } from '@/types/types'
import { ContainedButton, OutlinedButton } from '@/atoms/Button';
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/account/profiles.module.scss'
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'

type ProfileProps = {
  path: string
  data: ProfileDetailsType
  name: string
  details: string
}

const Profile = ({ path, data, name, details }: ProfileProps) => {
  const router = useRouter()

  return (
    <DialogContent>
      <Stack direction='row' alignItems='center'>
        <UserIcon name={ name.slice(0, 1) } variant='large' />

        <Stack justifyContent='center' className={ styles.profile_right }>
          <Typography component='p' variant='h3'>
            { name }
          </Typography>

          <Typography className={ styles.display_id } variant='body1'>
            { '@' + path }
          </Typography>
          
          { data.mine ?
            <Stack
              className={ styles.buttons }
              direction='row'
              alignItems='center' 
              justifyContent='center'
            >
              <ContainedButton
                text='設定'
                handle={ () => router.push(`/account/setting`) }
              />

              <OutlinedButton text='ログアウト' handle={ () => console.log('ログアウト')} />
            </Stack>
            :
            <div className={ styles.follow_button }>
              { data.following ?
                <ContainedButton text='フォロー中' handle={ () => console.log('フォローを外した')} />
                :
                <OutlinedButton text='フォロー' handle={ () => console.log('フォロー') } />
              }
            </div>
          }
        </Stack>
      </Stack>

      <Typography className={ styles.details }>{ details }</Typography>

      <Stack direction='row'>
        <NextLink href={ `/account/${ router.query.display_id }/follow` } passHref>
          <MuiLink color='inherit' underline='hover' variant='body1'>
            <span className={ styles.span_count }>{ data.follow.toLocaleString() }</span>
            フォロー
          </MuiLink>
        </NextLink>

        <NextLink href={ `/account/${ router.query.display_id }/follower` } passHref>
          <MuiLink
            className={ styles.follower }
            classes={{ root: styles.follower_root }}
            color='inherit'
            underline='hover'
            variant='body1'
          >
            <span className={ styles.span_count }>{ data.follower.toLocaleString() }</span>
            フォロワー
          </MuiLink>
        </NextLink>
      </Stack>
    </DialogContent>
  )
}

export default Profile