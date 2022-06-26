import React from 'react'
import useArticlesNoWord from '@/hooks/select/search/useArticlesNoWord'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Post from '@/components/post/Post'

const ArticlesNoWord = () => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useArticlesNoWord()
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  return (
    <React.Fragment>
      {data &&
        data.pages.map((page, page_index) =>
          page.map((item, index) => (
            <Post
              key={item.id}
              data={item}
              setRef={data.pages.length - 1 === page_index && page.length - 1 === index && setRef}
            />
          )),
        )}

      {isFetching && <Circular />}
    </React.Fragment>
  )
}

export default ArticlesNoWord
