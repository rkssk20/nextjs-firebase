import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import TopImage from '@/atoms/TopImage'
import NoImage from '@/atoms/NoImage'
import Header from '@/components/post/Header'
import Content from '@/components/post/Content'
import Actions from '@/components/post/Actions'

import styles from '@/styles/components/post/post.module.scss'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'

type PostProps = {
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
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Post = ({ data, setRef }: PostProps) => {
  const router = useRouter()

  return (
    <Card ref={ setRef ? (ref) => setRef(ref) : undefined } elevation={ 0 }>
      <CardActionArea
        className={ styles.card_actionarea }
        onClick={ () => router.push(`/article/${ data.id }`) }
      >
        {/* ヘッダー */}
        <Header display_id={ data.display_id } name={ data.name } />

        {/* 画像 */}
        { (data.image.length > 0) ?
          <TopImage image={ data.image } />
          :
          <NoImage title={ data.title } />
        }

        {/* タイトル、詳細、タグ */}
        <Content
          title={ data.title }
          details={ data.details }
          tags={ data.tags }
        />

        {/* 投稿時間、各種ボタン */}
        <Actions
          display_id={ data.display_id }
          likes={ data.likes }
          like={ data.like }
          created_at={ data.created_at }
        />
      </CardActionArea>
    </Card>
  )
}

export default Post