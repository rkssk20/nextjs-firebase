import { useRouter } from 'next/router'
import AspectImage from '@/atoms/AspectImage'
import Header from '@/components/post/Header'
import Content from '@/components/post/Content'
import Actions from '@/components/post/Actions'
import Share from '@/components/post/Share'

import styles from '@/styles/pages/index.module.scss'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

interface PostProps {
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

const Post = ({ data }: PostProps) => {
  const router = useRouter()

  return (
    <Card key={ data.id } className={ styles.card } elevation={ 0 }>
      <CardActionArea onClick={ () => router.push(`/post/${ data.id }`) }>
        {/* ヘッダー */}
        <Header display_id={ data.display_id } name={ data.name } />

        {/* 画像 */}
        { (data.image.length > 0) ?
          <AspectImage image={ data.image } />
          :
          <div className={ styles.noimage }>
            <Typography variant='h1' color='white'>
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
          id={ data.id }
          likes={ data.likes }
          like={ data.like }
          created_at={ data.created_at }
        />
      </CardActionArea>

      {/* 詳細メニュー */}
      {/* <Menu
        elevation={ 3 }
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={ detailsOpen }
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        open={ detailsBoolean }
        onClose={ handleDetailsClose }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        <MenuItem
          onClick={ () => {
            Router.push({ pathname: `${ router.asPath }`, query: { dialog: 'share' } })
          }}
        >
          { data.mine ? '削除' : '報告' }
        </MenuItem>
      </Menu> */}

      {/* 投稿を共有 */}
      { (router.query.share === data.id) &&  <Share /> }
    </Card>
  )
}

export default Post