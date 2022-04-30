import { useRouter } from 'next/router'
import AspectImage from '@/atoms/AspectImage'
import Header from '@/components/post/Header'
import Content from '@/components/post/Content'
import Actions from '@/components/post/Actions'

import styles from '@/styles/components/post/post.module.scss'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

interface PostProps {
  id: string;
  display_id: string;
  image: string;
  name: string;
  title: string;
  details: string;
  created_at: string;
  tags: number[],
  likes: number;
  like: boolean;
  mine: boolean;
}

const Post = ({ id, display_id, image, name, title, details, tags, created_at, likes, like, mine }: PostProps) => {
  const router = useRouter()

  return (
    <Card className={ styles.card } elevation={ 0 }>
      <CardActionArea onClick={ () => router.push(`/post/${ id }`) }>
        {/* ヘッダー */}
        <Header display_id={ display_id } name={ name } />

        {/* 画像 */}
        { (image.length > 0) ?
          <AspectImage image={ image } />
          :
          <div className={ styles.noimage }>
            <Typography variant='h1' color='white'>
              { title }
            </Typography>
          </div>
        }

        {/* タイトル、詳細、タグ */}
        <Content title={ title } details={ details } tags={ tags } />

        {/* 投稿時間、各種ボタン */}
        <Actions
          likes={ likes }
          like={ like }
          mine={ mine }
          created_at={ created_at }
        />
      </CardActionArea>
    </Card>
  )
}

export default Post