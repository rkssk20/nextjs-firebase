import type { ReactElement } from 'react'
import useCategoriesArticles from '@/hooks/select/useCategoriesArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Header from '@/components/categories/Header'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'
import Side from '@/components/side/Side'

const Front = () => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useCategoriesArticles(0)
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  return (
    <Layout type='article' title='フロント' description='' image=''>
      <Header text='フロント' url='front' />

      {/* 投稿一覧 */}
      {data &&
        data.pages.map((page, page_index) =>
          page.map((item, index) => (
            <Post
              key={item.id}
              data={item}
              setRef={data.pages.length - 1 === page_index && page.length - 1 === index && setRef}
            />
          )),
        )}

      {/* 読み込み中 */}
      {isFetching && <Circular />}
    </Layout>
  )
}

export default Front

Front.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Side />
    </>
  )
}
