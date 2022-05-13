import { useRef } from 'react'
import type { NextPage } from 'next'
import useArticles from '@/hooks/useArticles'
import useObserver from '@/hooks/useObserver'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const intersect = useObserver(ref)
  const { loading, articles } = useArticles(intersect)

  console.log(loading)

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
          lastRef={ ((articles.length - 1) === index) && ref }
          data={ item }
        />
      )) }

      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Home
