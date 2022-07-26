import type { ReactElement } from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRecoilValue } from 'recoil'
import { collectionGroup, query, limit, where, getDocs, getDoc } from 'firebase/firestore'
import { ref, getDownloadURL } from "firebase/storage";
import RemarkDown from '@/lib/remarkDown'
import { accountState } from '@/lib/recoil';
import { db, storage } from '@/lib/firebase'
import ArticleImage from '@/atoms/Image/ArticleImage'
import NoArtcileImage from '@/atoms/Image/NoArticleImage'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Title from '@/components/article/Title'
import Header from '@/components/article/Header'
import Share from '@/components/article/Share'
import Actions from '@/components/article/Actions'
import Comments from '@/components/article/comment/Comments'
import Side from '@/components/side/Side'

import 'highlight.js/styles/default.css'
import styles from '@/styles/pages/article/id.module.scss'
import Typography from '@mui/material/Typography'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try{
    const id = params?.id

    if (!id || (typeof id !== 'string')) return { notFound: true }

    const articlesCollection = collectionGroup(db, "articles")
    const articlesDocument = await getDocs(query(articlesCollection, where("id", "==", id), limit(1)))

    let result: any = {}

    articlesDocument.forEach(async(item) => {
      const data = item.data()
      const parent = item.ref.parent.parent

      result = {
        ...data,
        user_id: parent?.id,
        profilesRef: parent
      }
    })

    const item = await getDoc(result.profilesRef)
    const data: any = item.data()

    result.username = data?.username
    result.avatar = data?.avatar
    delete result.profilesRef

    if(!result) throw 'error'

    const avatarPromise = new Promise(async(resolve, reject) => {
      try {
        let path = ''

        if(result?.avatar) {
          path = await getDownloadURL(ref(storage, result?.avatar))
        }

        resolve(path)
      } catch {
        reject()
      }
    });

    // 記事画像がある場合はストレージから取得
    const imagePromise = new Promise(async(resolve, reject) => { 
      try {
        let path = ''
        
        if(result?.image) {
          path = await getDownloadURL(ref(storage, result?.image))
        }
        
        resolve(path)
      } catch {
        reject()
      }
    });

    // 記事詳細をhtmlに変換
    const remarkPromise = new Promise((resolve, reject) => {
      try {
        resolve(RemarkDown(result?.details))
      } catch {
        reject()
      }
    })

    // 3つの処理を並列で実行
    const response: any[] = await Promise.all([avatarPromise, imagePromise, remarkPromise])

    return {
      props: {
        item: {
          ...result,
          avatar: response[0],
          image: response[1],
          details: response[2],
          created_at: String(result?.created_at.toDate())
        },
        path: id
      },
      // 5分キャッシュ
      revalidate: 300,
    }

  } catch {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

interface ArticleProps {
  item: {
    title: string
    details: string
    image: string
    like_count: number
    comment_count: number
    categories: number[]
    created_at: string
    user_id: string
    username: string
    avatar: string
  }
  path: string
}

const Article = ({ item, path }: ArticleProps) => {
  const account = useRecoilValue(accountState)

  return (
    <ContainerLayout
      type='article'
      title={item.title}
      description={item.details.replace(/\_|\*|\\|\`|\#|\+|\-|\!|\{|\}|\[|\]/g, '').slice(0, 100)}
      image={item.image ?? ''}
    >
      {/* 画像 */}
      {item.image ? <ArticleImage image={item.image} /> : <NoArtcileImage title={item.title} />}

      {/* タグ、タイトル、投稿日時 */}
      <Title categories={item.categories} title={item.title} />

      {/* 投稿者、投稿日時 */}
      <Header
        user_id={item.user_id}
        avatar={ item.avatar }
        name={item.username}
        created_at={item.created_at}
      />

      {/* 記事の詳細 */}
      <div className={styles.content}>
        {/* <Typography variant='body1'>{ item.details }</Typography> */}
        <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: item.details }} />
      </div>

      {/* 共有 */}
      <div className={styles.content}>
        <Typography component='p' variant='h5'>
          この記事を共有する
        </Typography>

        <Share path={ path } />
      </div>

      {/* いいね、詳細ボタン */}
      <Actions
        path={ path }
        user_id={item.user_id}
        like_count={item.like_count}
      />

      {/* コメント欄 */}
      { !account.loading &&
        <Comments
          path={ path }
          user_id={ item.user_id }
          comments={item.comment_count}
        />
      }
    </ContainerLayout>
  )
}

export default Article

Article.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}

      <Side />
    </PageLayout>
  )
}
