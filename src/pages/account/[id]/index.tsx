import type { GetStaticProps, GetStaticPaths } from 'next'
import { ProfilePageType } from '@/types/types'
import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
import useProfileDetails from '@/hooks/useProfileDetails'
import useObserver from '@/hooks/atoms/useObserver'
import useArticles from '@/hooks/article/useArticles'
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

const Account = ({ item , path }: AccountProps) => {
  const { loading: profile_loading, data: profile_data } = useProfileDetails(path)
  const { loading, data, Fetch } = useArticles()
  const setRef = useObserver(Fetch)

  return (
    <Layout
      type='profile'
      title={ item.username }
      description={ item.details }
      image=''
    >
      {/* アカウント情報 */}
      <Profile path={ path } item={ item } />

      {/* ページ選択バー */}
      <Bar />

      {/* 自分の投稿一覧 */}
      { data.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((data.length - 1) === index) && setRef }
        />
      ))}

      { loading && <Circular /> }
    </Layout>
  )
}

export default Account