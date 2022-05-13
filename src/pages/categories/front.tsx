import { useRef } from 'react'
import Circular from '@/atoms/Circular'
import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
import Header from '@/components/categories/Header'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

const Front = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const intersect = useObserver(ref)
  const { loading, articles } = useArticles(intersect)

  return (
    <Layout
      type='article'
      title='フロント'
      description=''
      image=''
    >
      <Header text='フロント' url='front' />

      { articles.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          lastRef={ ((articles.length - 1) === index) && ref }
        />
      ))}
      
      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Front