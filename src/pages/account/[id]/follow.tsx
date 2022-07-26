import type { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { collection, doc, getDoc } from 'firebase/firestore'
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/lib/firebase'
import type { ProfileType } from '@/types/types';
import usePersonFollows from '@/hooks/select/usePersonFollows'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Empty from '@/atoms/Empty'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Header from '@/components/account/follow/Header'
import Account from '@/components/account/follow/Account'
import Side from '@/components/side/Side'

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

const Follow = ({ item, path }: AccountProps) => {
  const { data, loading, hasNextPage, fetchMore } = usePersonFollows(path)
  const setRef = useObserver({ hasNextPage, fetchMore })

  return (
    <ContainerLayout
      type='profile'
      title={item.username + 'のフォロー一覧'}
      description={item.details || ''}
      image={ item.avatar ?? '' }
    >
      {/* ヘッダー */}
      <Header path={path} name={item.username} />

      {/* 各アカウント */}
      {data && (data.length > 0) ? data.map((item, index) => (
        <Account
          key={item.id}
          id={item.id}
          username={item.username}
          avatar={item.avatar}
          details={item.details}
          setRef={((data.length - 1) === index) && setRef}
        />
        )) : !loading && <Empty text='まだ誰もフォローしていません。' />
      }

      {loading && <Circular />}
    </ContainerLayout>
  )
}

export default Follow

Follow.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
      <Side />
    </PageLayout>
  )
}
