import useArticlesNoWord from '@/hooks/select/search/useArticlesNoWord'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Post from '@/components/post/Post'

const ArticlesNoWord = () => {
  const { data, loading, hasNextPage, fetchMore } = useArticlesNoWord()
  const setRef = useObserver({ hasNextPage, fetchMore })

  return (
    <>
      {data && data.map((item, index) => (
        <Post
          key={item.id}
          data={item}
          setRef={((data.length - 1) === index) && setRef}
        />
        ))
      }

      {loading && <Circular />}
    </>
  )
}

export default ArticlesNoWord
