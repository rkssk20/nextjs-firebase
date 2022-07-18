import useFirstObserve from '@/hooks/atoms/useFirstObserve'
import useSelectComments from '@/hooks/select/useSelectComments'
import Circular from '@/atoms/Circular'
import CommentForm from '@/components/article/comment/CommenForm'
import Header from '@/components/article/comment/Header'
import Actions from '@/components/article/comment/Actions'
import Replies from '@/components/article/comment/reply/Replies'

import styles from '@/styles/components/article/comment/comments.module.scss'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

type CommentsProps = {
  path: string
  user_id: string
  comments: number
}

const Comments = ({ path, user_id, comments }: CommentsProps) => {
  // コメントの取得
  const { data, refetch, loading, hasNextPage, fetchMore, setData } = useSelectComments(path)
  // タイトルを監視して初回の取得
  const ref = useFirstObserve(refetch)

  return (
    <div>
      {/* タイトル */}
      <Typography ref={ref} className={styles.title} variant='h6'>
        コメント
        {comments > 0 && (
          <>
            <span className={styles.comments}>{comments.toLocaleString()}</span>件
          </>
        )}
      </Typography>

      {/* コメントフォーム */}
      <CommentForm
        path={path}
        user_id={ user_id }
        setData={ setData }
      />

      {/* コメント欄 */}
      {data && (data.length > 0) ? data.map((item, index) =>
        <Card
          key={item.id}
          id={'comment' + String(item.id)}
          className={styles.card}
          elevation={0}
        >
          {/* アカウント、投稿時間 */}
          <Header
            username={item.username}
            user_id={item.user_id}
            avatar={item.avatar}
            created_at={item.created_at}
          />

          {/* いいね、詳細ボタン */}
          <Actions
            index={ index }
            path={path}
            id={item.id}
            articles_user_id={ user_id }
            user_id={item.user_id}
            comment={item.comment}
            like_count={item.like_count}
            comments_likes={item.comments_likes}
            setData={ setData }
          />

          {/* リプライ欄 */}
          {(item.reply_count > 0) && (
            <Replies
              path={ path }
              id={item.id}
              articles_user_id={ user_id }
              user_id={ item.user_id }
              reply_count={item.reply_count}
            />
          )}
        </Card>
      ) : !loading && (
        <div className={styles.empty_field}>
          <Typography variant='body1'>まだコメントがありません。</Typography>
        </div>
      )}

      {/* さらに表示ボタン */}
      {data && (data.length > 0) && !loading && hasNextPage && (
        <Button
          className={styles.more_button}
          classes={{ root: styles.more_button_root }}
          onClick={() => fetchMore()}
        >
          さらに表示
        </Button>
      )}

      {/* ローディング */}
      {loading && <Circular />}
    </div>
  )
}

export default Comments
