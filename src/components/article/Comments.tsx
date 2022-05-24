import useComments from '@/hooks/useComments'
import useObserver from '@/hooks/useObserver'
import Circular from '@/atoms/Circular'
import Form from '@/components/article/Form'
import Header from '@/components/article/Comment/Header'
import Content from '@/components/article/Comment/Content'
import Replies from '@/components/article/Replies'

import styles from '@/styles/components/article/comments.module.scss'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

type CommentsProps = {
  path: string
  comments: number
}

const Comments = ({ path, comments }: CommentsProps) => {
  const { intersect, setRef } = useObserver()
  const { loading: loading, data: data } = useComments(path, intersect)

  return (
    <div>
      {/* タイトル */}
      <Typography className={ styles.title } variant='h6'>
        コメント
        { (comments > 0) &&
          <span className={ styles.comments }>{ comments.toLocaleString() }</span>
        }
        件
      </Typography>

      {/* コメントフォーム */}
      <Form />

      {/* コメント欄 */}
      { (data.length > 0) &&
        data.map((item, index) => (
          <Card
            key={ item.id }
            ref={ ((data.length - 1) === index) ? ref =>  setRef(ref) : undefined }
            className={ styles.card }
            elevation={ 0 }
          >
            {/* アカウント、投稿時間 */}
            <Header
              name={ item.name }
              display_id={ item.display_id }
              created_at={ item.created_at }
            />

            {/* 本文、いいね、詳細ボタン */}
            <Content
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

      { loading && <Circular /> }
    </div>
  )
}

export default Comments