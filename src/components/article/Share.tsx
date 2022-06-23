import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
import { notificateState } from '@/lib/recoil';

const ShareDialog = dynamic((import('@/components/dialog/Share')))

import styles from '@/styles/components/article/share.module.scss'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'

const Share = ({ path }: { path: string }) => {
  const [dialog, setDialog] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const url = process.env.NEXT_PUBLIC_WEB_URL + '/article/' + path

  const share: {
    url: string;
    social: 'twitter' | 'facebook';
    label: 'Twitter' | 'Facebook';
  }[] = [{
    url: `https://twitter.com/share?url=${ url }`,
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: `https://www.facebook.com/sharer/sharer.php?u=${ url }`,
    social: 'facebook',
    label: 'Facebook'
  }]

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    .then(() => {
      setNotificate({
        open: true,
        message: 'URLをコピーしました'
      })
    }). catch(() => {
      setNotificate({
        open: true,
        message: 'コピーに失敗しました'
      })
    })

  }

  return (
    <div className={ styles.field }>
      {/* URLのコピーボタン */}
      <IconButton
        aria-label='URLをコピー'
        className={ styles.share_button }
        classes={{ root: styles.share_button_root }}
        onClick={ handleCopy }
      >
        <ContentCopyIcon className={ styles.icon } classes={{ root: styles.icon_root }} />
      </IconButton> 

      {/* Twitter, Facebookの共有 */}
      { share.map(item => (
        <a
          key={ item.social }
          href={ item.url }
          target='_blank'
          rel="nofollow noopener noreferrer"
        >
          <IconButton
            aria-label='共有'
            className={ styles.button }
            classes={{ root: styles.button_root }}
          >
            <Image
              src={ `/image/${ item.social }.png` }
              alt='共有アイコン'
              width={ 44 }
              height={ 44 }
              quality={ 70 }
            />
          </IconButton>
        </a>
      )) }

      {/* その他共有ボタン */}
      <IconButton
        aria-label='その他'
        className={ styles.share_button }
        classes={{ root: styles.share_button_root }}
        onClick={ () => setDialog(true) }
      >
        <ShareIcon className={ styles.icon } classes={{ root: styles.icon_root }} />
      </IconButton>

      { dialog &&
        <ShareDialog
          dialog={ dialog }
          setDialog={ setDialog }
          handleClose={ () => setDialog(false) }
          path={ path }
        />
      }
    </div>
  )
}

export default Share