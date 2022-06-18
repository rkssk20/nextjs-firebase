import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { ArticleType } from '@/types/types'
import ArticleImage from '@/atoms/ArticleImage'
import NoArticleImage from '@/atoms/NoArticleImage'
import Header from '@/components/post/Header'
import Content from '@/components/post/Content'
import Actions from '@/components/post/Actions'

import styles from '@/styles/components/post/post.module.scss'
import CardActionArea from '@mui/material/CardActionArea'

type PostProps = {
  data: ArticleType
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Post = ({ data, setRef }: PostProps) => {
  const router = useRouter()

  return (
    <CardActionArea
      className={ styles.actionarea }
      classes={{ root: styles.actionarea_root }}
      ref={ setRef ? (ref: HTMLDivElement) => setRef(ref) : undefined }
      component='div'
      onClick={ () => router.push(`/article/${ data.id }`) }
    >
      {/* ヘッダー */}
      <Header
        id={ data.user_id }
        username={ data.username }
        avatar={ data.avatar }
        created_at={  data.created_at }
      />

      {/* 画像 */}
      { (data.image && (data.image.length > 0)) ?
        <ArticleImage image={ data.image } />
        :
        <NoArticleImage title={ data.title } />
      }

      {/* タイトル、詳細、タグ */}
      <Content
        title={ data.title }
        details={ data.details }
        categories={ data.categories }
      />

      {/* 投稿時間、いいね、コメント数、詳細ボタン */}
      <Actions
        user_id={ data.user_id }
        like_count={ data.like_count }
        comment_count={ data.comment_count }
      />
    </CardActionArea>
  )
}

export default Post