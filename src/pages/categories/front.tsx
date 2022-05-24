import Circular from '@/atoms/Circular'
import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
import Header from '@/components/categories/Header'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

const Front = () => {
  const { intersect, setRef } = useObserver()
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
          setRef={ ((articles.length - 1) === index) && setRef }
        />
      ))}
      
      { loading && <Circular /> }
    </Layout>
  )
}

export default Front