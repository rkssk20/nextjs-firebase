import type { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { collection, doc, getDoc } from 'firebase/firestore'
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/lib/firebase'
import type { ProfileType } from '@/types/types'
import useLikesArticles from '@/hooks/select/useLikesArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Empty from '@/atoms/Empty'
import Side from '@/components/side/Side'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import Post from '@/components/post/Post'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id

  if (!id || typeof id !== 'string') return { notFound: true }

  const profilesCollection = collection(db, "profiles")
  const profilesRef = doc(profilesCollection, id)
  const document = await getDoc(profilesRef);

  let fullPath = '';

  if(document.data()?.avatar) {
    fullPath = await getDownloadURL(ref(storage, document.data()?.avatar))
  }

  if(document.data()) {
    return {
      props: {
        item: {
          id: document.data()?.id ?? "",
          username: document.data()?.username,
          avatar: fullPath,
          details: document.data()?.details,
          follow_count: document.data()?.follow_count,
          follower_count: document.data()?.follower_count
        },
        path: id
      }
    };
  } else {
    return { notFound: true }
  };
}

type AccountProps = {
  item: ProfileType
  path: string
}

const Likes = ({ item, path }: AccountProps) => {
  const { data, loading, hasNextPage, fetchMore } = useLikesArticles(path)
  const setRef = useObserver({ hasNextPage, fetchMore })

  return (
    <ContainerLayout
      type='profile'
      title={item.username + 'がいいねした投稿一覧'}
      description={item.details || ''}
      image={ item.avatar ?? '' }
    >
      {/* アカウント情報 */}
      <Profile path={path} item={item} />

      {/* ページ選択バー */}
      <Bar path={path} />

      {/* 自分の投稿一覧 */}
      {data && (data.length > 0) ? data.map((item, index) =>
        <Post
          key={item.id}
          data={item}
          setRef={((data.length - 1) === index) && setRef}
        />
      ) : !loading && <Empty text='まだいいねした投稿がありません' />}

      {loading && <Circular />}
    </ContainerLayout>
  )
}

export default Likes

Likes.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}

      <Side />
    </PageLayout>
  )
}
