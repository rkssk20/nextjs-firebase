import type { Dispatch, SetStateAction } from 'react'
import type { DialogProps, RepliesType } from '@/types/types'
import useReplyDelete from '@/hooks/mutate/delete/useReplyDelete'
import Dialog from '@/components/dialog/Dialog'

import styles from '@/styles/components/dialog/_delete.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

type Props = DialogProps & {
  path: string
  articles_user_id: string
  user_id: string
  index: number
  comment_id: string
  id: string
  setData: Dispatch<SetStateAction<RepliesType[]>>
}

const ReplyDelete = ({ dialog, handleClose, path, articles_user_id, user_id, index, comment_id, id, setData }: Props) => {
  const mutate = useReplyDelete(path, articles_user_id, comment_id, user_id, index, id, setData, handleClose)

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

export default ReplyDelete
