import type { GetStaticProps, GetStaticPaths } from "next";
import { ArticleType } from '@/types/types';
import RemarkDown from '@/lib/remarkDown'
import ArticleImage from "@/atoms/ArticleImage";
import NoArtcileImage from "@/atoms/NoArticleImage";
import Layout from '@/components/provider/Layout'
import Title from '@/components/article/Title'
import Header from '@/components/article/Header'
import Share from '@/components/article/Share'
import Actions from '@/components/article/Actions'
// import Comments from "@/components/article/comment/Comments";

import styles from '@/styles/pages/article/id.module.scss'
import Typography from '@mui/material/Typography'

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

  const remark = await RemarkDown(result.data.details)

  return {
    props: {
      item: {
        ...result.data,
        details: remark
      },
      path: id
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
  item: ArticleType
  path: string
}

const Article = ({ item, path }: ArticleProps) => {
  return (
    <Layout
      type='article'
      title={ item.title }
      description={ item.details }
      image={ item.image ? item.image : 'nextjssupabase' }
    >
      {/* 画像 */}
      { (item.image.length > 0) ?
        <ArticleImage image={ item.image } />
        :
        <NoArtcileImage title={ item.title } />
      }

      {/* タグ、タイトル、投稿日時 */}
      <Title tags={ item.tags } title={ item.title } />

      {/* 投稿者、投稿日時 */}
      <Header
        display_id={ item.display_id }
        name={ item.name }
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
        like={ item.like }
        likes={ item.likes }
        mine={ item.mine }
        path={ path }
      />

      {/* コメント欄 */}
      {/* <Comments
        path={ path }
        comments={ item.comments }
      /> */}
    </Layout>
  )
}

export default Article