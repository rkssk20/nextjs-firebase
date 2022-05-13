import { useRouter } from 'next/router'
import Image from 'next/image'
import { DialogProps } from '@/types/types'
import DialogHeader from '@/components/dialog/DialogHeader'
import DialogPaper from '@/components/dialog/DialogPaper'

import styles from '@/styles/components/dialog/share.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type ShareProps = DialogProps & {
  id: string;
}

const Share = ({ open, handleClose, id }: ShareProps) => {
  const router = useRouter()
  const share: {
    url: string;
    social: 'twitter' | 'facebook' | 'line' | 'note' | 'hatena';
    label: 'Twitter' | 'Facebook' | 'LINE' | 'note' | 'はてブ'
  }[] = [{
    url: '/',
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: '/',
    social: 'facebook',
    label: 'Facebook'
  }, {
    url: '/',
    social: 'line',
    label: 'LINE'
  }, {
    url: '/',
    social: 'note',
    label: 'note'
  }, {
    url: '/',
    social: 'hatena',
    label: 'はてブ'
  }]

  return (
    <DialogPaper open={ open } handleClose={ handleClose }>
      <DialogHeader handleClose={ handleClose } />

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
              <IconButton className={ styles.copy_button }>
                <ContentCopyIcon className={ styles.copy } />
              </IconButton> 
            }
            label='URLをコピー'
            labelPlacement='bottom'
          />

          { share.map(item => (
            <FormControlLabel
              key={ item.social }
              className={ styles.label }
              classes={{ root: styles.label_root }}
              control={
                <IconButton
                  className={ styles.button }
                  classes={{ root: styles.button_root }}
                  onClick={ () => router.push(item.url) }
                >
                  <Image
                    src={ `/image/${ item.social }.png` }
                    alt='共有アイコン'
                    width={ 70 }
                    height={ 70 }
                    quality={ 70 }
                  />
                </IconButton>
              }
              label={ item.label }
              labelPlacement='bottom'
            />
          ))}
        </DialogActions>
      </DialogContent>
    </DialogPaper>
  )
}

export default Share