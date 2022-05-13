import { useState } from 'react'
import { useRouter } from 'next/router'
import { ContainedButton, DisabledButton } from '@/atoms/Button'
import Layout from '@/components/provider/Layout'
import Auth from '@/components/provider/Auth'

import styles from '@/styles/pages/account/setting.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'

const Setting = () => {
  const [name, setName] = useState('')
  const [displayId, setDisplayId] = useState('')
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleUpdate = () => {

  }
  
  return (
    <Layout
      type='article'
      title=''
      description=''
      image=''
    >
      <Auth>
        <DialogContent>
          <Typography className={ styles.title } variant='h5'>プロフィールの変更</Typography>

          <Typography className={ styles.sub_title } variant='h6'>アカウント名</Typography>

          <div className={ styles.input_field }>
            <InputBase
              className={ styles.input }
              inputProps={{
                maxLength: 15,
              }}
              placeholder='名前'
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />

            { (name.length > 0) &&
              <Typography>{ name.length + ' / 15' }</Typography>
            }
          </div>

          <Typography className={ styles.sub_title } variant='h6'>アカウントID</Typography>

          <div className={ styles.input_field }>
            <InputBase
              className={ styles.input }
              inputProps={{
                maxLength: 15,
              }}
              placeholder='ID'
              value={ displayId }
              onChange={ (e) => setDisplayId(e.target.value) }
            />

            { (displayId.length > 0) &&
              <Typography>{ displayId.length + ' / 15' }</Typography>
            }
          </div>

          <div className={ styles.save }>
            { ((name.length > 0) || (displayId.length > 0)) ?
              <ContainedButton text='変更' handle={ handleUpdate } /> :
              <DisabledButton text='変更' />
            }
          </div>

          <Typography className={ styles.title } variant='h6'>退会</Typography>
          
          <Stack direction='row' alignItems='center'>
            <Typography
              className={ styles.option }
              classes={{ root: styles.option_root }}
              variant='caption'
              >
              ※ ポートフォリオのため、退会機能を制限しています。
            </Typography>

            <DisabledButton text='退会' />
          </Stack>
        </DialogContent>
      </Auth>
    </Layout>
  )
}

export default Setting