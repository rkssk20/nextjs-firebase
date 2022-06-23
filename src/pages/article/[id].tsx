import type { GetStaticProps, GetStaticPaths } from "next";
import type { definitions } from "@/types/supabase";
import RemarkDown from '@/lib/remarkDown'
import { supabase } from '@/lib/supabaseClient'
import ArticleImage from "@/atoms/Image/ArticleImage";
import NoArtcileImage from "@/atoms/Image/NoArticleImage";
import Layout from '@/components/provider/Layout'
import Title from '@/components/article/Title'
import Header from '@/components/article/Header'
import Share from '@/components/article/Share'
import Actions from '@/components/article/Actions'
import Comments from "@/components/article/comment/Comments";
import Side from '@/components/side/Side'

import styles from '@/styles/pages/article/id.module.scss'
import Typography from '@mui/material/Typography'
import { ReactElement } from "react";

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  if(!id || typeof(id) !== 'string') return { notFound: true }

  try {
    const { data, error } = await supabase
    .from<definitions['articles']>('articles')
    .select(
      `user_id,
      title,
      details,
      image,
      like_count,
      comment_count,
      created_at,
      profiles!reference_articles_profiles(username, avatar),
      categories(id, category)'`
    )
    .eq('id', id)
    .single()

    if(error || !data) throw error

    const remark = await RemarkDown(data.details)

    return {
      props: {
        item: {
          ...data,
          details: remark
        },
        path: id
      },
      // 5分キャッシュ
      revalidate: 300
    }

  } catch {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

interface ArticleProps {
  item: {
      user_id: definitions['articles']['user_id']
      title: definitions['articles']['title']
      details: definitions['articles']['details']
      image: definitions['articles']['image']
      like_count: definitions['articles']['like_count']
      comment_count: definitions['articles']['comment_count']
      created_at: definitions['articles']['created_at']
    }
    & { profiles: definitions['profiles'] }
    & { categories: definitions['categories'][] }
  path: string
}

const Article = ({ item, path }: ArticleProps) => {
  const pages = [[{ id: 10 }, { id: 12 }], [{ id: 13 }]]

  const index = pages.map(page => page.findIndex((element) => element.id === 13))
  const page = index.findIndex(element => element !== -1)

  console.log(pages[page][index[page]])


  return (
    <Layout
      type='article'
      title={ item.title }
      description={ item.details }
      image={ item.image ? item.image : 'nextjssupabase' }
    >
      {/* 画像 */}
      { item.image ?
        <ArticleImage image={ item.image } />
        :
        <NoArtcileImage title={ item.title } />
      }

      {/* タグ、タイトル、投稿日時 */}
      <Title categories={ item.categories } title={ item.title } />

      {/* 投稿者、投稿日時 */}
      <Header
        user_id={ item.user_id }
        name={ item.profiles.username }
        created_at={ item.created_at }
      />

      {/* 記事の詳細 */}
      <div className={ styles.content }>
        {/* <Typography variant='body1'>{ item.details }</Typography> */}
        <div className={ styles.markdown } dangerouslySetInnerHTML={{ __html: item.details }} />
      </div>

      {/* 共有 */}
      <div className={ styles.content }>
        <Typography component='p' variant='h5'>
          この記事を共有する
        </Typography>

        <Share path={ path } />
      </div>

      {/* いいね、詳細ボタン */}
      <Actions
        path={ path }
        user_id={ item.user_id }
        like_count={ item.like_count }
      />

      {/* コメント欄 */}
      <Comments
        path={ path }
        comments={ item.comment_count }
      />
    </Layout>
  )
}

export default Article

Article.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      { page }

      <Side />
    </div>
  )
}