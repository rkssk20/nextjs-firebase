import Image from 'next/image'

import styles from '@/styles/atoms/loginContent.module.scss'
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
    <div className={ styles.content }>
      <Typography variant='h5'>
          ログイン
          <span className={ styles.title_slash }>/</span>
          新規登録
        </Typography>
  
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
          (ポートフォリオ用) 登録なしでログイン状態になります。
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
              { item.text }
            </Typography>
          </Button>
        )) }
    </div>
  )
}

export default LoginContent