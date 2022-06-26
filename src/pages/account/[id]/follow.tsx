import type { ReactElement } from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
import usePersonFollows from '@/hooks/select/usePersonFollows'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Empty from '@/atoms/Empty'
import Layout from '@/components/provider/Layout'
import Header from '@/components/account/follow/Header'
import Account from '@/components/account/follow/Account'
import Side from '@/components/side/Side'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  if (typeof id !== 'string') return { notFound: true }

  const { data, error } = await supabase
    .from<definitions['profiles']>('profiles')
    .select('username, avatar, details')
    .eq('id', id)
    .single()

  if (error || !data) return { notFound: true }

  return {
    props: {
      item: data,
      path: id,
    },
    // 5分キャッシュ
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type FollowProps = {
  item: definitions['profiles']
  path: string
}

const Follow = ({ item, path }: FollowProps) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = usePersonFollows(path)
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  return (
    <Layout
      type='profile'
      title={item.username + 'のフォロー一覧'}
      description={item.details || ''}
      image=''
    >
      {/* ヘッダー */}
      <Header path={path} name={item.username} />

      {/* 各アカウント */}
      {data && data.pages[0].length > 0
        ? data.pages.map((page, page_index) =>
            page.map((item, index) => (
              <Account
                key={item.follower_id}
                id={item.follower_id}
                username={item.username}
                avatar={item.avatar}
                details={item.details}
                setRef={data.pages.length - 1 === page_index && page.length - 1 === index && setRef}
              />
            )),
          )
        : !isFetching && <Empty text='まだ誰もフォローしていません。' />}

      {isFetching && <Circular />}
    </Layout>
  )
}

export default Follow

Follow.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Side />
    </>
  )
}
