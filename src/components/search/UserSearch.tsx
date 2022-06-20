import React from 'react'
import useObserver from '@/hooks/atoms/useObserver'
import useUserSearch from '@/hooks/select/search/useUserSearch'
import Circular from '@/atoms/Circular'
import Account from '@/components/account/follow/Account'

import styles from '@/styles/components/search/_search.module.scss'
import Typography from '@mui/material/Typography'

const UserSearch = ({ word }: { word: string | string[] }) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useUserSearch(word)
  const setRef = useObserver({ hasNextPage, fetchNextPage })

  return (
    <React.Fragment>
      { data && (data.pages[0].length > 0) ? data.pages.map((page, page_index) => (
          page.map((item, index) => (
            <Account
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

export default UserSearch