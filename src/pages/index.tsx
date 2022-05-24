import type { NextPage } from 'next'
import useArticles from '@/hooks/useArticles'
import useObserver from '@/hooks/useObserver'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

const Home: NextPage = () => {
  const { intersect, setRef } = useObserver()
  const { loading, articles } = useArticles(intersect)

  return (
    <Layout
      type='website'
      title=''
      description=''
      image=''
    >
      { articles.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((articles.length - 1) === index) && setRef }
        />
      )) }

      { loading && <Circular /> }
    </Layout>
  )
}

export default Home
