import useReplies from '@/hooks/useReplies'

import styles from '@/styles/components/article/replies.module.scss'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

type RepliesProps = {
  path: string
  id: number
  replies: number
}

const Replies = ({ path, id, replies }: RepliesProps) => {
  const { loading, data, page, hasNextPage, MoreFetch } = useReplies(path, id)

  return (
    <div>
      {/* リプライを読み込むボタン */}
      { (!loading && (data.length === 0)) &&
        <Button
          className={ styles.more_button }
          classes={{ root: styles.more_button_root }}
          onClick={ () => MoreFetch() }
        >
          { replies.toLocaleString() }
          <span className={ styles.more_text }>件の返信を表示</span>
        </Button>
      }

      {/* リプライ欄 */}
      { data &&
        data.map(item => (
          <p key={ item.id }>{ item.name }</p>
        ))
      }

      {/* ローディング */}
      { loading &&
        <div className={ styles.circular_field }>
          <CircularProgress size={ 32 } />
        </div>
      }
    </div>
  )
}

export default Replies