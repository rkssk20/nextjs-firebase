import type { ReactElement } from 'react'
import useCategoriesArticles from '@/hooks/select/useCategoriesArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Header from '@/components/categories/Header'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Post from '@/components/post/Post'
import Side from '@/components/side/Side'

const Nextjs = () => {
  const { data, loading, hasNextPage, fetchMore } = useCategoriesArticles(0)
  const setRef = useObserver({ hasNextPage, fetchMore })

  return (
    <ContainerLayout
      type='article'
      title='Next.js'
      description=''
      image=''
    >
      <Header text='Next.js' url='nextjs' />

      {/* 投稿一覧 */}
      {data && data.map((item, index) => (
        <Post
          key={item.id}
          data={item}
          setRef={((data.length - 1) === index) && setRef}
        />
      ))}

      {/* 読み込み中 */}
      {loading && <Circular />}
    </ContainerLayout>
  )
}

export default Nextjs

Nextjs.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
      
      <Side />
    </PageLayout>
  )
}
