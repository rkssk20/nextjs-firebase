import { useState, MutableRefObject } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import AspectImage from '@/atoms/AspectImage'
import Header from '@/components/post/Header'
import Content from '@/components/post/Content'
import Actions from '@/components/post/Actions'

const Share = dynamic(() => import('@/components/dialog/Share'))

import styles from '@/styles/components/post/post.module.scss'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

type PostProps = {
  lastRef: MutableRefObject<HTMLDivElement | null> | false
  data: {
    id: string;
    display_id: string;
    title: string;
    created_at: string;
    image: string;
    likes: number;
    like: boolean;
    details: string;
    name: string;
    tags: number[];
    mine: boolean;
  }
}

const Post = ({ lastRef, data }: PostProps) => {
  const [shareDialog, setShareDialog] = useState(false)
  const router = useRouter()

  return (
    <Card elevation={ 0 }>
      <CardActionArea
        className={ styles.card_actionarea }
        onClick={ () => router.push(`/article/${ data.id }`) }
      >
        {/* ヘッダー */}
        <Header display_id={ data.display_id } name={ data.name } />

        {/* 画像 */}
        { (data.image.length > 0) ?
          <AspectImage image={ data.image } />
          :
          <div className={ styles.noimage }>
            <Typography
              className={ styles.noimage_text }
              classes={{ root: styles.noimage_text_root }}
              color='white'
            >
              { data.title }
            </Typography>
          </div>
        }

        {/* タイトル、詳細、タグ */}
        <Content
          title={ data.title }
          details={ data.details }
          tags={ data.tags }
        />

        {/* 投稿時間、各種ボタン */}
        <Actions
          likes={ data.likes }
          like={ data.like }
          created_at={ data.created_at }
          setShareDialog={ setShareDialog }
        />
      </CardActionArea>

      {/* 無限スクロールのref */}
      { lastRef && <div ref={ lastRef } /> }

      {/* 共有ダイアログ */}
      { shareDialog &&
        <Share
          id={ data.id }
          open={ shareDialog }
          handleClose={ () => setShareDialog(false) }
        />
      }
    </Card>
  )
}

export default Post