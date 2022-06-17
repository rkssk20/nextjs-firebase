import type { ReactElement } from 'react'
import Side from '@/components/side/Side'
import useArticles from '@/hooks/article/useArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

const Home = () => {
  // const { loading, data, Fetch } = useArticles()
  // const setRef = useObserver(Fetch)

  return (
    <Layout
      type='website'
      title=''
      description=''
      image=''
    >
      {/* { data.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((data.length - 1) === index) && setRef }
        />
      )) } */}

      {/* { loading && <Circular /> } */}
    </Layout>
  )
}

export default Home

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <div>
      { page }

      <Side />
    </div>
  )
}