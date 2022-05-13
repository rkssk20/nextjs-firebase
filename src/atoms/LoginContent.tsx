import Image from 'next/image'

import styles from '@/styles/atoms/login.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const LoginContent = () => {
  const social = [{
    text: 'Twitter',
    src: 'twitter.png'
  }, {
    text: 'Facebook',
    src: 'facebook.png'
  }, {
    text: 'Google',
    src: 'google.svg'
  }]

  return (
    <DialogContent className={ styles.content }>
        <Typography variant='h3'>ログイン</Typography>

        <Button
          className={ styles.eazy }
          classes={{ root: styles.eazy_root }}
          variant='contained'
          color='info'
        >
          簡単ログイン
        </Button>

        <Typography
          className={ styles.eazy_caption }
          classes={{ root: styles.eazy_caption_root }}
          variant='caption'
          color='error'
        >
          ポートフォリオ用 (そのままログイン状態になります。)
        </Typography>

        { social.map(item => (
          <Button
            key={ item.text }
            className={ styles.social }
            classes={{ root: styles.social_root }}
            variant='contained'
            color='info'
            startIcon={
              <Image
                src={ `/image/${ item.src }` }
                width={ 40 }
                height={ 40 }
                quality={ 70 }
              />
            }
          >
            <Typography className={ styles.social_text } variant='h5'>
              { item.text + ' ログイン / 登録' }
            </Typography>
          </Button>
        )) }
      </DialogContent>
  )
}

export default LoginContent