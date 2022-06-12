import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'

import styles from '@/styles/components/dialog/share.module.scss'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Share = () => {
  const setNotificate = useSetRecoilState(notificateState)
  const router = useRouter()

  const share: {
    url: string;
    social: 'twitter' | 'facebook' | 'line' | 'note' | 'hatena';
    label: 'Twitter' | 'Facebook' | 'LINE' | 'note' | 'はてブ'
  }[] = [{
    url: `https://twitter.com/share?url=${ process.env.NEXT_PUBLIC_WEB_URL + router.asPath }`,
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: `https://www.facebook.com/sharer/sharer.php?u=${ process.env.NEXT_PUBLIC_WEB_URL + router.asPath }`,
    social: 'facebook',
    label: 'Facebook'
  }, {
    url: `https://line.me/R/share?text=${ process.env.NEXT_PUBLIC_WEB_URL + router.asPath }`,
    social: 'line',
    label: 'LINE'
  }, {
    url: `https://note.com/intent/post?url=${ process.env.NEXT_PUBLIC_WEB_URL + router.asPath }`,
    social: 'note',
    label: 'note'
  }, {
    url: `https://b.hatena.ne.jp/add?mode=confirm&url=${ process.env.NEXT_PUBLIC_WEB_URL + router.asPath }`,
    social: 'hatena',
    label: 'はてブ'
  }]

  const handleCopy = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_WEB_URL + router.asPath)

    setNotificate({
      open: true,
      message: 'URLをコピーしました'
    })
  }

  return (
    <DialogContent>
      <Typography variant='h3'>
        この投稿をシェアする
      </Typography>

      <DialogActions
        className={ styles.stack }
        classes={{ root: styles.stack_root }}
      >
        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <IconButton className={ styles.copy_button } onClick={ handleCopy }>
              <ContentCopyIcon className={ styles.copy } />
            </IconButton> 
          }
          label='URLをコピー'
          labelPlacement='bottom'
        />

        { share.map(item => (
          <FormControlLabel
            className={ styles.label }
            classes={{ root: styles.label_root }}
            control={
              <a
                key={ item.social }
                href={ item.url }
                target='_blank'
                rel="nofollow noopener noreferrer"
              >
                <IconButton
                  className={ styles.button }
                  classes={{ root: styles.button_root }}
                >
                  <Image
                    src={ `/image/${ item.social }.png` }
                    alt='共有アイコン'
                    width={ 70 }
                    height={ 70 }
                    quality={ 70 }
                  />
                </IconButton>
              </a>
            }
            label={ item.label }
            labelPlacement='bottom'
          />
        ))}
      </DialogActions>
    </DialogContent>
  )
}

export default Share