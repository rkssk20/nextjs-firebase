import { useState } from 'react'
import type { GetStaticProps, GetStaticPaths } from "next";
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { useRouter } from "next/router";
import { ArticleType } from '@/types/types';
import Tags from '@/atoms/Tag'
import AspectImage from "@/atoms/AspectImage";
import { LoginFavorite, LogoutFavorite } from '@/atoms/Favorite'
import Layout from '@/components/provider/Layout'
import Header from '@/components/post/Header'

const Share = dynamic(() => import('@/components/dialog/Share'))
const Report = dynamic(() => import('@/components/dialog/Report'))
const Delete = dynamic(() => import('@/components/dialog/Delete'))

import styles from '@/styles/pages/article/id.module.scss'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  if(!id) return { notFound: true }

  const article = await fetch(`${ process.env.NEXT_PUBLIC_WEB_URL }/api/testArticle`, {
    method: 'POST',
    body: JSON.stringify({ id })
  })

  const result = await article.json()

  if(!result.data) return { notFound: true }

  return {
    props: {
      article: result.data
    },
    // 5分キャッシュ
    revalidate: 300
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface ArticleProps {
  article: ArticleType
}

const Article = ({ article }: ArticleProps) => {
  const [dialog, setDialog] = useState<'' | 'share' | 'report' | 'delete'>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const created = new Date(article.created_at)
  const router = useRouter()

  const test_login = false

  // 詳細メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 削除ダイアログ
  const handleDelete = () => {
    setDialog('delete')
    handleClose()
  }
  
  // 報告ダイアログ
  const handleReport = () => {
    setDialog('report')
    handleClose()
  }

  const share: {
    url: string;
    social: 'twitter' | 'facebook';
    label: 'Twitter' | 'Facebook';
  }[] = [{
    url: '/',
    social: 'twitter',
    label: 'Twitter'
  }, {
    url: '/',
    social: 'facebook',
    label: 'Facebook'
  }]

  return (
    <Layout
      type='article'
      title={ article.title }
      description={ article.details }
      image={ article.image ? article.image : 'nextjssupabase' }
    >
      {/* 画像 */}
      { (article.image.length > 0) ?
          <AspectImage image={ article.image } />
          :
          <div className={ styles.noimage }>
            <Typography
              className={ styles.noimage_text }
              classes={{ root: styles.noimage_text_root }}
              color='white'
            >
              { article.title }
            </Typography>
          </div>
        }

      <CardContent>
        { (article.tags.length > 0) &&
          <Stack className={ styles.tags } direction='row' alignItems='center'>
            { article.tags.map(item => (
              <Tags key={ item } tag={ item } />
            )) }
          </Stack>
        }

        <Typography className={ styles.title } variant='h1'>
          { article.title }
        </Typography>

        {/* 投稿時間 */}
        <Typography variant='caption'>
          { created.getFullYear() + '年' + created.getMonth() + '月' + created.getDate() + '日' }
        </Typography>
      </CardContent>

      <Header display_id={ article.display_id } name={ article.name } />

      <CardContent>
        {/* 詳細 */}
        <Typography variant='body1'>{ article.details }</Typography>

        <Typography
          className={ styles.share_title }
          component='p'
          variant='h5'
        >
          この記事を共有する
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='center'>
          <IconButton
            aria-label='URLをコピー'
            className={ styles.share_button }
            classes={{ root: styles.share_button_root }}
          >
            <ContentCopyIcon className={ styles.icon } />
          </IconButton> 

          { share.map(item => (
            <IconButton
              aria-label='共有'
              key={ item.social }
              className={ styles.button }
              classes={{ root: styles.button_root }}
              onClick={ () => router.push(item.url) }
            >
              <Image
                src={ `/image/${ item.social }.png` }
                alt='共有アイコン'
                width={ 44 }
                height={ 44 }
                quality={ 70 }
              />
            </IconButton>
          )) }

          <IconButton
            aria-label='その他'
            className={ styles.share_button }
            classes={{ root: styles.share_button_root }}
            onClick={ () => setDialog('share') }
          >
            <ShareIcon className={ styles.icon } />
          </IconButton> 
        </Stack>

        <Stack
          style={{ padding: 16 }}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          {/* いいねボタンといいね数 */}
          <Stack direction='row' alignItems='center'>
            { test_login ?
              <LoginFavorite like={ article.like } likes={ article.likes } />
              :
              <LogoutFavorite likes={ article.likes } />
            }
          </Stack>

          {/* 詳細ボタン */}
          <IconButton
            aria-label='詳細'
            id="positioned-button"
            aria-controls={ open ? 'positioned-menu' : undefined }
            aria-haspopup="true"
            aria-expanded={ open ? 'true' : undefined }
            onClick={ (e) => setAnchorEl(e.currentTarget) }
          >
            <MoreVertIcon />
          </IconButton>

          {/* 詳細メニュー */}
          <Menu
            id="positioned-menu"
            anchorEl={ anchorEl }
            open={ open }
            onClose={ handleClose }
          >
            { article.mine ?
              <MenuItem onClick={ handleDelete }>記事を削除</MenuItem>
              :
              <MenuItem onClick={ handleReport }>記事の問題を報告</MenuItem>
            }
          </Menu>
        </Stack>
      </CardContent>

      {/* 共有ダイアログ */}
      { (dialog === 'share') &&
        <Share
          id={ article.id }
          open={ dialog === 'share' }
          handleClose={ () => setDialog('') }
        />
      }
      {/* 報告ダイアログ */}
      { (dialog === 'report') &&
        <Report
          id={ article.id }
          open={ dialog === 'report'}
          handleClose={ () => setDialog('') }
         />
      }
      {/* 削除ダイアログ */}
      { (dialog === 'delete') &&
        <Delete
          id={ article.id }
          open={ dialog === 'delete' }
          handleClose={ () => setDialog('') }
        />
      }
    </Layout>
  )
}

export default Article