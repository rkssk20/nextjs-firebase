import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import useSelectReplies from '@/hooks/select/useSelectReplies'
import Header from '@/components/article/comment/Header'
import Actions from '@/components/article/comment/reply/Actions'
import ReplyForm from '@/components/article/comment/reply/ReplyForm'

import styles from '@/styles/components/article/comment/reply/replies.module.scss'
import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CircularProgress from '@mui/material/CircularProgress'

type ShowReplyProps = {
  id: string
  user_id: string
}

const ShowReplies = ({ id, user_id }: ShowReplyProps) => {
  const [formOpen, setFormOpen] = useState(false)
  const { data, loading, hasNextPage, fetchMore, setData } = useSelectReplies(id)
  const account = useRecoilValue(accountState)

  const handleReply = (uuid: string, comment: string) => {
    setData(prev => [{
      id: uuid,
      user_id: account.data?.id as string,
      comment,
      like_count: 0,
      replies_likes: false,
      created_at: String(new Date()),
      username: account.data?.username as string,
      avatar: account.data?.avatar as string
    }, ...prev
  ])
  }

  return (
    <div>
      {/* リプライ欄 */}
      {data && data.map((item) =>
        <div key={item.id} id={'reply' + String(item.id)}>
          {/* アカウント、投稿日時 */}
          <Header
            username={item.username}
            user_id={item.user_id}
            avatar={item.avatar}
            created_at={item.created_at}
          />

          {/* いいね、詳細ボタン */}
          <Actions
            id={item.id}
            user_id={item.user_id}
            comment={item.comment}
            replies_like={item.replies_likes}
            like_count={item.like_count}
          />
        </div>
      )}

      {!loading && (
        <div className={styles.more_field}>
          {/* 返信ボタン */}
          {data && (data.length > 0) && (
            <Button
              className={styles.reply_button}
              style={{ marginLeft: 16, borderRadius: 9999, flexShrink: 0 }}
              variant='outlined'
              color='inherit'
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => setFormOpen(true)}
            >
              返信
            </Button>
          )}

          {/* さらに表示ボタン */}
          {data && (data.length > 0) && !loading && hasNextPage && (
            <Button
              className={styles.more_button}
              classes={{ root: styles.more_button_root }}
              onClick={() => fetchMore()}
            >
              返信をさらに表示
            </Button>
          )}
        </div>
      )}

      {/* 返信フォーム */}
      { formOpen &&
        <ReplyForm
          id={id}
          user_id={ user_id }
          setFormOpen={setFormOpen}
          handleReply={ handleReply }
        />
      }

      {/* ローディング */}
      {loading && (
        <div className={styles.circular_field}>
          <CircularProgress size={32} />
        </div>
      )}
    </div>
  )
}

type RepliesProps = ShowReplyProps & {
  reply_count: number
}

const Replies = ({ id, user_id, reply_count }: RepliesProps) => {
  const [open, setOpen] = useState(false)

  return open ? (
    <ShowReplies id={id} user_id={ user_id } />
  ) : (
    <Button
      className={styles.more_button}
      classes={{ root: styles.more_button_root }}
      onClick={() => setOpen(true)}
    >
      <span className={styles.more_text}>{reply_count.toLocaleString()}</span>
      件の返信を表示
    </Button>
  )
}

export default Replies
