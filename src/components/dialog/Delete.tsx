import { useRecoilState } from 'recoil'
import { dialogState } from '@/lib/recoil'
import DialogPaper from '@/components/dialog/DialogPaper'

import styles from '@/styles/components/dialog/delete.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Delete = () => {
  const [dialog, setDialog] = useRecoilState(dialogState)
  // 記事を削除
  const handleDelete = () => {
    console.log(dialog.id)
  }

  return (
    <DialogPaper>
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
          onClick={ () => setDialog({ content: '', id: null }) }
        >
          キャンセル
        </Button>
      </Stack>
    </DialogPaper>
  )
}

export default Delete