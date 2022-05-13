import { DialogProps } from '@/types/types'
import DialogHeader from '@/components/dialog/DialogHeader'
import DialogPaper from '@/components/dialog/DialogPaper'

import styles from '@/styles/components/dialog/delete.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

type DeleteProps = DialogProps & {
  id: string;
}

const Delete = ({ id, open, handleClose }: DeleteProps) => {
  // 記事を削除
  const handleDelete = () => {
    console.log(id)
  }

  return (
    <DialogPaper open={ open } handleClose={ handleClose }>
      <DialogHeader handleClose={ handleClose } />

      <DialogContent>
        <Typography variant='h3'>
          この記事を削除しますか？
        </Typography>

        <Typography
          className={ styles.error }
          variant='body1'
          color='error'
        >
          削除された記事は戻すことができません。
        </Typography>

        <Stack direction='row' justifyContent='center'>
          <Button
            className={ styles.button }
            color="error"
            variant="contained"
            disableElevation
            onClick={ handleDelete }
          >
            削除
          </Button>

          <Button
            className={ styles.cancel }
            classes={{ root: styles.cancel_root }}
            color="inherit"
            variant="contained"
            disableElevation
            onClick={ handleClose }
          >
            キャンセル
          </Button>
        </Stack>
      </DialogContent>
    </DialogPaper>
  )
}

export default Delete