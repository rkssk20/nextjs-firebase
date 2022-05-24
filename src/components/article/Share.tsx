import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
import { dialogState } from '@/lib/recoil';

import styles from '@/styles/components/article/share.module.scss'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'

const Share = ({ path }: { path: string }) => {
  const setDialog = useSetRecoilState(dialogState)

  const share: {
    url: string;
    social: 'twitter' | 'facebook';
    label: 'Twitter' | 'Facebook';
  }[] = [{
    url: '/',
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: '/',
    social: 'facebook',
    label: 'Facebook'
  }]

  return (
    <Stack direction='row' alignItems='center' justifyContent='center'>
      {/* URLのコピーボタン */}
      <IconButton
        aria-label='URLをコピー'
        className={ styles.share_button }
        classes={{ root: styles.share_button_root }}
      >
        <ContentCopyIcon className={ styles.icon } />
      </IconButton> 

      {/* Twitter, Facebookの共有 */}
      { share.map(item => (
        <IconButton
          aria-label='共有'
          key={ item.social }
          className={ styles.button }
          classes={{ root: styles.button_root }}
          component='a'
          href={ item.url }
        >
          <Image
            src={ `/image/${ item.social }.png` }
            alt='共有アイコン'
            width={ 44 }
            height={ 44 }
            quality={ 70 }
          />
        </IconButton>
      )) }

      {/* その他共有ボタン */}
      <IconButton
        aria-label='その他'
        className={ styles.share_button }
        classes={{ root: styles.share_button_root }}
        onClick={ () => setDialog({ content: 'share', id: path }) }
      >
        <ShareIcon className={ styles.icon } />
      </IconButton> 
    </Stack>
  )
}

export default Share