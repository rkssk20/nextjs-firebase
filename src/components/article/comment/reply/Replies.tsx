import { useState } from 'react'
import useReplies from '@/hooks/article/useReplies'
import Header from '@/components/article/comment/Header'
import Actions from '@/components/article/comment/reply/Actions'
import ReplyForm from '@/components/article/comment/reply/ReplyForm'

import styles from '@/styles/components/article/comment/reply/replies.module.scss'
import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CircularProgress from '@mui/material/CircularProgress'

type RepliesProps = {
  path: string
  id: number
  replies: number
}

const Replies = ({ path, id, replies }: RepliesProps) => {
  const [formOpen, setFormOpen] = useState(false)
  const { loading, data, hasNextPage, MoreFetch } = useReplies(path, id)

  return (
    <div>
      {/* リプライ欄 */}
      { data &&
        data.map(item => (
          <div key={ item.id }>
            {/* アカウント、投稿日時 */}
            <Header
              name={ item.name }
              display_id={ item.display_id }
              created_at={ item.created_at }
            />

            {/* いいね、詳細ボタン */}
            <Actions
              path={ path }
              id={ item.id }
              comment_id={ item.comment_id }
              content={ item.content }
              likes={ item.likes }
              like={ item.like }
              mine={ item.mine }
            />
          </div>
        ))
      }

      { !loading &&
        <div className={ styles.more_field }>
          {/* 返信ボタン */}
          { (data.length > 0) &&
            <Button
              className={ styles.reply_button }
              style={{marginLeft: 16, borderRadius: 9999, flexShrink: 0 }}
              variant='outlined'
              color='info'
              startIcon={
                <ChatBubbleOutlineIcon />
              }
              onClick={ () => setFormOpen(true) }
            >
              返信
            </Button>
          }

          {/* 返信が空の場合表示ボタン。存在する場合はさらに表示ボタン */}
          { hasNextPage &&
            <Button
              className={ styles.more_button }
              classes={{ root: styles.more_button_root }}
              onClick={ () => MoreFetch() }
            >
              { (data.length === 0) ?
                <>
                  <span className={ styles.more_text }>{ replies.toLocaleString() }</span>
                  件の返信を表示
                </>
                :
                '返信をさらに表示'
              }
            </Button>
          }
        </div>
      }

      {/* 返信フォーム */}
      { formOpen && <ReplyForm setFormOpen={ setFormOpen } /> }

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