import useObserver from '@/hooks/useObserver'
import useArticles from '@/hooks/useArticles'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Header from '@/components/categories/Header'
import Post from '@/components/post/Post'

const Serverless = () => {
  const { intersect, setRef } = useObserver()
  const { loading, articles } = useArticles(intersect)

  return (
    <Layout
      type='article'
      title='フロント'
      description=''
      image=''
    >
      <Header text='サーバーレス' url='serverless' />

      { articles.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((articles.length - 1) === index) && setRef }
        />
      ))}

      { loading && <Circular size='large' /> }
    </Layout>
  )
}

export default Serverless