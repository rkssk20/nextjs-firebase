import Image from 'next/image'
import NextLink from 'next/link'

import { signInWithEmailAndPassword, signInWithRedirect, TwitterAuthProvider, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

import styles from '@/styles/atoms/loginContent.module.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MuiLink from '@mui/material/Link'

const LoginContent = () => {
  const social = [
    {
      text: 'Twitter',
      src: 'twitter.png',
    },
    {
      text: 'Facebook',
      src: 'facebook.png',
    },
    {
      text: 'Google',
      src: 'google.svg',
    },
  ]

  const handleEazy = async() => {
    await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_EAZY_LOGIN_EMAIL as string,
      process.env.NEXT_PUBLIC_EAZY_LOGIN_PASSWORD as string
    )
  }

  const handleAuth = async (provider: string) => {
    let authProvider: TwitterAuthProvider | FacebookAuthProvider | GoogleAuthProvider;

    if(provider === 'twitter') {
      authProvider = new TwitterAuthProvider()
    } else if(provider === 'facebook') {
      authProvider = new FacebookAuthProvider()
    } else {
      authProvider = new GoogleAuthProvider()
    }

    return signInWithRedirect(auth, authProvider)
  }

  return (
    <div className={styles.content}>
      <Typography variant='h5'>
        ログイン
        <span className={styles.title_slash}>/</span>
        新規登録
      </Typography>

      <Button
        className={styles.eazy}
        classes={{ root: styles.eazy_root }}
        variant='contained'
        color='info'
        onClick={ handleEazy }
      >
        簡単ログイン
      </Button>

      <Typography
        className={styles.eazy_caption}
        classes={{ root: styles.eazy_caption_root }}
        variant='caption'
      >
        (ポートフォリオ用) 登録なしでログイン状態になります。
      </Typography>

      {social.map((item) => (
        <Button
          key={item.text}
          className={styles.social}
          classes={{ root: styles.social_root }}
          variant='contained'
          color='info'
          startIcon={<Image src={`/image/${item.src}`} width={40} height={40} quality={70} />}
          onClick={() => handleAuth(item.text)}
        >
          <Typography className={styles.social_text} variant='h5'>
            {item.text}
          </Typography>
        </Button>
      ))}

      <Typography variant='body1' className={ styles.firebase }>
        Next.js × Firebaseでは退会機能を制限しています。詳細は、
        <NextLink href={ `/article/GEN_YJAfox2mKj2V47frO` } passHref>
          <MuiLink underline='hover'>
            Firebaseの退会機能を見送った
          </MuiLink>
        </NextLink>
        をご覧ください。
      </Typography>
    </div>
  )
}

export default LoginContent
