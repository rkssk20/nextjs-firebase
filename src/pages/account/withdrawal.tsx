import { ReactElement, useState } from 'react'
import NextLink from 'next/link'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Side from '@/components/side/Side'

import styles from '@/styles/pages/account/withdrawal.module.scss'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MuiLink from '@mui/material/Link'

const Withdrawal = () => {
  const [confirm, setConfirm] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)

  const list = ['アカウントデータ', '記事、コメント', '記事、コメントへのいいね']

  return (
    <ContainerLayout
      type='profile'
      title='アカウント削除'
      description=''
      image=''
    >
      <div className={styles.field}>
        <Typography className={styles.title} variant='h3'>
          アカウントを削除しますか?
        </Typography>

        <Typography className={styles.details} variant='body1'>
          アカウントを削除すると、以下の情報も全て削除されます。
        </Typography>

        <List className={ styles.list } classes={{ root: styles.list_root }}>
          { list.map(item => (
            <ListItem  className={ styles.list_item } classes={{ root: styles.list_item_root }}>
              <ListItemText primary={ item } primaryTypographyProps={{ color: 'error' }} />
            </ListItem>
          ))}
        </List>

        <FormControlLabel
          className={styles.checkbox}
          control={<Checkbox checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />}
          label='上記の注意事項を確認した'
        />

        {confirm ? (
          <ContainedButton text='削除する' handle={() => setNotificate({ open: true, message: '機能を制限しています'})} />
        ) : (
          <DisabledButton text='削除する' />
        )}
        
        <p>
          Next.js × Firebaseでは退会機能を制限しています。詳細は、
          <NextLink href={ `/article/GEN_YJAfox2mKj2V47frO`} passHref>
            <MuiLink underline='hover'>
              Firebaseの退会機能を見送った
            </MuiLink>
          </NextLink>
          に書き残しています。
        </p>
      </div>
    </ContainerLayout>
  )
}

export default Withdrawal

Withdrawal.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
      
      <Side />
    </PageLayout>
  )
}
