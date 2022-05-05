import { GetStaticProps, GetStaticPaths } from "next";
import Image from 'next/image'
import { useRouter } from "next/router";
import Tags from '@/atoms/Tag'
import AspectImage from "@/atoms/AspectImage";
import Favorite from '@/atoms/Favorite'
import Layout from '@/components/provider/Layout'
import Header from '@/components/post/Header'
import Share from '@/components/post/Share'

import styles from '@/styles/pages/post/id.module.scss'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// ISR
export const getStaticProps: GetStaticProps = async () => {
  const test = {
    id: 'fsdf-fsdf-erte-vdf',
    display_id: 'cvdfg',
    title: '技術選定',
    created_at: '2022-04-30 04:00:00.00000',
    image: '/image/ginza.png',
    likes: 0,
    like: false,
    details: 'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
    name: 'フロントエンジニアA',
    tags: [0, 1],
    mine: true
  }

  return {
    props: {
      test
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

interface PostProps {
  test: {
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

const Post = ({ test }: PostProps) => {
  const created = new Date(test.created_at)
  const router = useRouter()

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

  const handleOther = () => {
    router.push({
      pathname: router.asPath,
      query: { share: test.id }
    }, undefined, {
      shallow: true
    })
  }
  
  return (
    <Layout
      type='article'
      title={ test.title }
      description={ test.details }
      ogp={ test.image ? test.image : 'nextjssupabase' }
    >
      <AspectImage image={ test.image } />

      <CardContent>
        { (test.tags.length > 0) &&
          <Stack className={ styles.tags } direction='row' alignItems='center'>
            { test.tags.map(item => (
              <Tags key={ item } tag={ item } />
            )) }
          </Stack>
        }

        <Typography className={ styles.title } classes={{ root: styles.title_root }} variant='h1'>
          { test.title }
        </Typography>

        {/* 投稿時間 */}
        <Typography variant='caption'>
          { created.getFullYear() + '年' + created.getMonth() + '月' + created.getDate() + '日' }
        </Typography>
      </CardContent>

      <Header display_id={ test.display_id } name={ test.name } />

      <CardContent>
        {/* 詳細 */}
        <Typography variant='body1'>{ test.details }</Typography>

        <Typography className={ styles.share_title } variant='h5'>この記事を共有する</Typography>

        <Stack direction='row' alignItems='center' justifyContent='center'>
          <IconButton
            className={ styles.share_button }
            classes={{ root: styles.share_button_root }}
            aria-label='URLをコピー'
          >
            <ContentCopyIcon className={ styles.icon } />
          </IconButton> 

          { share.map(item => (
            <IconButton
              aria-label='共有'
              className={ styles.button }
              classes={{ root: styles.button_root }}
              onClick={ () => router.push(item.url) }
            >
              <Image
                src={ `/image/${ item.social }.png` }
                alt='共有アイコン'
                width={ 50 }
                height={ 50 }
                quality={ 70 }
              />
            </IconButton>
          )) }

          <IconButton
            aria-label='その他'
            className={ styles.share_button }
            classes={{ root: styles.share_button_root }}
            onClick={ handleOther }
          >
            <ShareIcon className={ styles.icon } />
          </IconButton> 
        </Stack>

        <Share />

        <Stack style={{ padding: 16 }} direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center'>
            <Favorite like={ test.like } likes={ test.likes } />
          </Stack>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Layout>
  )
}

export default Post