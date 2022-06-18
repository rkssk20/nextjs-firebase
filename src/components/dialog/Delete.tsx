import { useRecoilState, useSetRecoilState } from 'recoil'
import { dialogState } from '@/lib/recoil'
import { notificateState } from '@/lib/recoil'

import styles from '@/styles/components/dialog/delete.module.scss'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Delete = () => {
  const [dialog, setDialog] = useRecoilState(dialogState)
  const setNotificate = useSetRecoilState(notificateState)
  
  // 記事を削除
  const handleDelete = () => {
    setNotificate({
      open: true,
      message: 'ポートフォリオのため、この記事は保護されています。 新規投稿の記事は削除できます。'
    })
  }

  return (
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
          onClick={ () =>
            setDialog({
              open: false,
              content: '',
              id: null
            })
          }
        >
          キャンセル
        </Button>
      </Stack>
    </DialogContent>
  )
}

export default Delete