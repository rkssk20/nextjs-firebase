import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { ProfilePageType } from '@/types/types'
import useFollow from '@/hooks/useFollow'
import useObserver from '@/hooks/atoms/useObserver'
import Bar from '@/atoms/Bar'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Header from '@/components/account/follow/Header'
import Account from '@/components/account/follow/Account'
import FollowEmpty from '@/components/account/follow/FollowEmpty'

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

type FollowProps = {
  item: ProfilePageType
  path: string
}

const Follow = ({ item, path }: FollowProps) => {
  const { loading, data, Fetch } = useFollow(item.display_id)
  const setRef = useObserver(Fetch)
  const router = useRouter()

  console.log(router)

  const tab_list = [{
    name: 'フォロー中',
    url: `/account/${ router.query.display_id }/follow`
  }, {
    name: 'フォロワー',
    url: `/account/${ router.query.display_id }/follower`
  }]
  
  return (
    <Layout
      type='profile'
      title={ item.name + 'のフォロー一覧' }
      description={ item.details }
      image=''
    >
      {/* タイトルと戻るボタン */}
      <Header
        path={ path }
        name={ item.name }
        categories='follow'
      />

      {/* 選択バー */}
      <Bar
        tab_list={ tab_list }
        value={ router.pathname === '/account/[display_id]/follow' ? 0 : 1 }
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

      { !loading && (data.length === 0) && <FollowEmpty path={ path } /> }

      { loading && <Circular /> }
    </Layout>
  )
}

export default Follow