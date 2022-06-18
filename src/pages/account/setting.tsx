import NextLink from 'next/link'
import Layout from '@/components/provider/Layout'
import LoginOnly from '@/components/provider/LoginOnly'
import Input from '@/components/account/setting/Input'

import styles from '@/styles/pages/account/setting.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import MuiLink from '@mui/material/Link'
import { ReactElement } from 'react'

const Setting = () => {
  return (
    <Layout
      type='article'
      title='設定'
      description=''
      image=''
    >
      <DialogContent>
        <Input />

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
    </Layout>
  )
}

export default Setting

Setting.getLayout = function getLayout (page: ReactElement) {
  return (
    <LoginOnly>
      { page }
    </LoginOnly>
  )
}