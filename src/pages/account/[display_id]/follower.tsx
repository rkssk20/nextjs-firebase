import type { GetStaticProps, GetStaticPaths } from 'next'
import { ProfilePageType } from '@/types/types'
import useFollower from '@/hooks/useFollower'
import useObserver from '@/hooks/useObserver'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Header from '@/components/account/follow/Header'
import Account from '@/components/account/follow/Account'
import FollowerEmpty from '@/components/account/follow/FollowerEmpty'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const display_id = params?.display_id

  if(!display_id) return { notFound: true }

  const article = await fetch(`${ process.env.NEXT_PUBLIC_WEB_URL }/api/testProfilePage`, {
    method: 'POST',
    body: JSON.stringify({ display_id })
  })

  const result = await article.json()

  if(!result.data) return { notFound: true }

  return {
    props: {
      item: result.data,
      path: display_id
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

type FollowerProps = {
  item: ProfilePageType
  path: string
}

const Follower = ({ item, path }: FollowerProps) => {
  const { intersect, setRef } = useObserver()
  const { loading, data } = useFollower({ path, intersect })
  
  return (
    <Layout
      type='profile'
      title={ item.name + 'のフォロワー一覧' }
      description={ item.details }
      image=''
    >
      {/* タイトルと戻るボタン */}
      <Header
        path={ path }
        name={ item.name }
        categories='follower'
      />

      {/* 各アカウント */}
      { data &&
        data.map((item, index) => (
          <Account
            key={ item.display_id }
            display_id={ item.display_id }
            name={ item.name }
            setRef={ ((data.length - 1) === index) && setRef }
          />
        ))
      }

      { !loading && (data.length === 0) && <FollowerEmpty path={ path } /> }

      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Follower