import type { ReactElement } from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import Side from '@/components/side/Side'
import { ProfilePageType } from '@/types/types'
import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
import useLikesArticles from '@/hooks/select/useLikesArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import Post from '@/components/post/Post'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  if(!id || typeof(id) !== 'string') return { notFound: true }

  try {
    const { data, error } = await supabase
    .from<definitions['profiles']>('profiles')
    .select('username, avatar, details, follow_count, follower_count')
    .eq('id', id)
    .single()

    if(error) throw error

    return {
      props: {
        item: data,
        path: id
      },
      // 5分キャッシュ
      revalidate: 300
    }

  } catch {
    return { notFound: true }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

type AccountProps = {
  item: ProfilePageType
  path: string
}

const Likes = ({ item, path }: AccountProps) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useLikesArticles(path)
  const setRef = useObserver({ hasNextPage, fetchNextPage })
  
  return (
    <Layout
      type='profile'
      title={ item.username + 'がいいねした投稿一覧' }
      description={ item.details }
      image=''
    >
      {/* アカウント情報 */}
      <Profile path={ path } item={ item } />
      
      {/* ページ選択バー */}
      <Bar path={ path } />

      {/* 自分の投稿一覧 */}
      { data && data.pages.map((page, page_index) => (
        page.map((item, index) => (
          <Post
            key={ item.id }
            data={ item }
            setRef={
              ((data.pages.length - 1) === page_index) && ((page.length - 1) === index) && setRef
            }
          />
        ))
      ))}

      { isFetching && <Circular /> }
    </Layout>
  )
}

export default Likes

Likes.getLayout = function getLayout (page: ReactElement) {
  return (
    <div>
      { page }

      <Side />
    </div>
  )
}