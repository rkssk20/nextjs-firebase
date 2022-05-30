import useObserver from '@/hooks/atoms/useObserver'
import useArticles from '@/hooks/article/useArticles'
import Circular from '@/atoms/Circular'
import Layout from '@/components/provider/Layout'
import Header from '@/components/categories/Header'
import Post from '@/components/post/Post'

const Serverless = () => {
  const { loading, data, Fetch } = useArticles()
  const setRef = useObserver(Fetch)

  return (
    <Layout
      type='article'
      title='フロント'
      description=''
      image=''
    >
      <Header text='サーバーレス' url='serverless' />

      { data.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((data.length - 1) === index) && setRef }
        />
      ))}

      { loading && <Circular /> }
    </Layout>
  )
}

export default Serverless