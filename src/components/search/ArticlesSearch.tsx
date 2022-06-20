import React from 'react'
import useObserver from '@/hooks/atoms/useObserver'
import useArticlesSearch from '@/hooks/select/search/useArticlesSearch'
import Circular from '@/atoms/Circular'
import Post from '@/components/post/Post'

import styles from '@/styles/components/search/_search.module.scss'
import Typography from '@mui/material/Typography'

const ArticlesSearch = ({ word }: { word: string | string[] }) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useArticlesSearch(word)
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  console.log(data?.pages.length)

  return (
    <React.Fragment>
      { data && (data.pages[0].length > 0) ? data.pages.map((page, page_index) => (
          page.map((item, index) => (
            <Post
              key={ item.id }
              data={ item }
              setRef={
                ((data.pages.length - 1) === page_index) && ((page.length - 1) === index) && setRef
              }
            />
          ))
        ))
        :
        !isFetching &&
        <Typography className={ styles.no_result } variant='h6'>
          結果がありません
        </Typography>
      }

      { isFetching && <Circular /> }
    </React.Fragment>
  )
}

export default ArticlesSearch