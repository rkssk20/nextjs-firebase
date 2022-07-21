import type { DialogProps } from '@/types/types'
import useArticleDelete from '@/hooks/mutate/delete/useArticleDelete'
import Dialog from '@/components/dialog/Dialog'

import styles from '@/styles/components/dialog/articleDelete.module.scss'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

type Props = DialogProps & {
  path: string
  user_id: string
}

const ArticleDelete = ({ dialog, handleClose, path, user_id }: Props) => {
  const mutate = useArticleDelete(path, user_id)

  const list = ['記事に関するデータ', '記事へのコメント', '記事、コメントへのいいね']

  return (
    <Dialog dialog={dialog} handleClose={handleClose}>
      <Typography variant='h3'>この記事を削除しますか？</Typography>

      <Typography className={styles.error} variant='body1' color='error'>
        以下の情報が全て削除されます。
      </Typography>

      {list.map((item) => (
        <Typography key={item} className={styles.list} variant='body1' color='error'>
          ・{item}
        </Typography>
      ))}

      <Stack className={styles.button_field} direction='row' justifyContent='center'>
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

export default ArticleDelete
