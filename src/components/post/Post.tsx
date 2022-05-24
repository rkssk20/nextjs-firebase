import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { ArticleType } from '@/types/types'
import ArticleImage from '@/atoms/ArticleImage'
import NoImage from '@/atoms/NoImage'
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
        display_id={ data.display_id }
        name={ data.name }
        created_at={ data.created_at }
      />

      {/* 画像 */}
      { (data.image.length > 0) ?
        <ArticleImage image={ data.image } />
        :
        <NoImage title={ data.title } />
      }

      {/* タイトル、詳細、タグ */}
      <Content
        title={ data.title }
        details={ data.details }
        tags={ data.tags }
      />

      {/* 投稿時間、いいね、コメント数、詳細ボタン */}
      <Actions
        display_id={ data.display_id }
        likes={ data.likes }
        like={ data.like }
        comments={ data.comments }
      />
    </CardActionArea>
  )
}

export default Post