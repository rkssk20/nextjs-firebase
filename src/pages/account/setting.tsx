import NextLink from 'next/link'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useProfilePage from '@/hooks/useProfilePage'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import LoginOnly from '@/components/provider/LoginOnly'
import Input from '@/components/account/setting/Input'

import styles from '@/styles/pages/account/setting.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import MuiLink from '@mui/material/Link'

const Setting = () => {
  const account = useRecoilValue(accountState)
  console.log(account)
  const { loading, data } = useProfilePage(account.display_id)  
  
  return (
    <Layout
      type='article'
      title='設定'
      description=''
      image=''
    >
      <LoginOnly>
        <DialogContent>
        { loading ?
          <Circular size='large' />
          :
           data &&<Input data={ data } />
        }

        <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

        <NextLink href='/account/withdrawal' passHref>
          <MuiLink
            variant='caption'
            color='gray'
            underline='hover'
          >
            退会する
          </MuiLink>
        </NextLink>

        <Divider className={ styles.under_divider } />
        </DialogContent>
      </LoginOnly>
    </Layout>
  )
}

export default Setting