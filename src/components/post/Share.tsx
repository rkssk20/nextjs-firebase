import DialogPaper from '@/atoms/DialogPaper'
import ShareButton from '@/atoms/ShareButton'
import Tips from '@/atoms/Tip'

import styles from '@/styles/components/post/share.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ShareProps {
  id: string;
  open: boolean;
  handleClose: () => void;
}

const Share = ({ id, open, handleClose }: ShareProps) => {
  return (
    <DialogPaper
      open={ open }
      handleClose={ handleClose }
    >
      <DialogTitle>
        <Tips title='キャンセル'>
          <IconButton onClick={ handleClose }>
            <CloseIcon />
          </IconButton>
        </Tips>
      </DialogTitle>

      <Typography className={ styles.title } variant='h4'>この投稿をシェアする</Typography>

      <DialogActions
        className={ styles.stack }
        classes={{ root: styles.stack_root }}
      >
        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <IconButton className={ styles.copy_button }>
              <div className={ styles.copy_back }>
                <ContentCopyIcon className={ styles.copy } />
              </div>
            </IconButton> 
          }
          label='URLをコピー'
          labelPlacement='bottom'
        />

        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <ShareButton url='a' social='twitter' />
          }
          label='Twitter'
          labelPlacement='bottom'
        />

        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <ShareButton url='a' social='facebook' />
          }
          label='Facebook'
          labelPlacement='bottom'
        />

        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <ShareButton url='a' social='line' />
          }
          label='Line'
          labelPlacement='bottom'
        />

        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <ShareButton url='a' social='note' />
          }
          label='Note'
          labelPlacement='bottom'
        />

        <FormControlLabel
          className={ styles.label }
          classes={{ root: styles.label_root }}
          control={
            <ShareButton url='a' social='hatena' />
          }
          label='はてブ'
          labelPlacement='bottom'
        />
      </DialogActions>
    </DialogPaper>
  )
}

export default Share