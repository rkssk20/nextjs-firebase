import type { Dispatch, SetStateAction } from 'react'
import type { CommentType, DialogProps } from '@/types/types'
import useDeleteComments from '@/hooks/mutate/delete/useDeleteComments'
import Dialog from '@/components/dialog/Dialog'

import styles from '@/styles/components/dialog/_delete.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

type Props = DialogProps & {
  index: number
  user_id: string
  path: string
  id: string
  setData: Dispatch<SetStateAction<CommentType[]>>
}

const CommentDelete = ({ dialog, handleClose, index, user_id, path, id, setData }: Props) => {
  const mutate = useDeleteComments(index, id, user_id, path, setData, handleClose)

  return (
    <Dialog dialog={dialog} handleClose={handleClose}>
      <Typography variant='h3'>このコメントを削除しますか？</Typography>

      <Typography className={styles.error} variant='body1' color='error'>
        削除されたコメントは戻すことができません。
      </Typography>

      <Stack direction='row' justifyContent='center'>
        <Button
          className={styles.button}
          color='error'
          variant='contained'
          disableElevation
          onClick={() => mutate()}
        >
          削除
        </Button>

        <Button
          className={styles.cancel}
          classes={{ root: styles.cancel_root }}
          color='inherit'
          variant='contained'
          disableElevation
          onClick={handleClose}
        >
          キャンセル
        </Button>
      </Stack>
    </Dialog>
  )
}

export default CommentDelete
