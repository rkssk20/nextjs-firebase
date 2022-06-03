import useFirstObserve from '@/hooks/article/useFirstObserve'
import useComments from '@/hooks/article/useComments'
import Circular from '@/atoms/Circular'
import CommentForm from '@/components/article/comment/CommentForm'
import Header from '@/components/article/comment/Header'
import Actions from '@/components/article/comment/Actions'
import Replies from '@/components/article/comment/reply/Replies'

import styles from '@/styles/components/article/comment/comments.module.scss'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

type CommentsProps = {
  path: string
  comments: number
}

const Comments = ({ path, comments }: CommentsProps) => {
  // コメントの取得
  const { loading, data, hasNextPage, Fetch } = useComments(path)
  // タイトルを監視して初回の取得
  const ref = useFirstObserve(Fetch)

  return (
    <div>
      {/* タイトル */}
      <Typography ref={ ref } className={ styles.title } variant='h6'>
        コメント
        { (comments > 0) &&
          <>
            <span className={ styles.comments }>{ comments.toLocaleString() }</span>
            件
          </>
        }
      </Typography>

      {/* コメントフォーム */}
      <CommentForm />

      {/* コメント欄 */}
      { (data.length > 0) &&
        data.map(item => (
          <Card
            key={ item.id }
            className={ styles.card }
            elevation={ 0 }
          >
            {/* アカウント、投稿時間 */}
            <Header
              name={ item.name }
              display_id={ item.display_id }
              created_at={ item.created_at }
            />

            {/* いいね、詳細ボタン */}
            <Actions
              path={ path }
              id={ item.id }
              content={ item.content }
              likes={ item.likes }
              like={ item.like }
              mine={ item.mine }
            />

            {/* リプライ欄 */}
            { (item.replies > 0) &&
              <Replies
                path={ path }
                id={ item.id }
                replies={ item.replies }
              />
            }
          </Card>
        ))
      }

      {/* さらに表示ボタン */}
      { ((data.length > 0 ) && !loading && hasNextPage) &&
        <Button
          className={ styles.more_button }
          classes={{ root: styles.more_button_root }}
          onClick={ () => Fetch() }
        >
          さらに表示
        </Button>
      }

      {/* ローディング */}
      { loading && <Circular /> }
    </div>
  )
}

export default Comments