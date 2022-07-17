import useArticlesSearch from '@/hooks/select/search/useArticlesSearch'
import Circular from '@/atoms/Circular'
import Empty from '@/atoms/Empty'
import Post from '@/components/post/Post'

const ArticlesSearch = ({ word }: { word: string | string[] }) => {
  const { data, loading } = useArticlesSearch(word)

  return (
    <>
      {data && (data.length > 0) ? data.map((item, index) => (
        <Post
          key={item.id}
          data={item}
          setRef={ false }
        />
        )) : !loading && <Empty text='検索結果はありません' />
      }

      {loading && <Circular />}
    </>
  )
}

export default ArticlesSearch
