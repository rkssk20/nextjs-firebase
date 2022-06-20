import { useInfiniteQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

const FetchData = async (pageParam: { follower_count: number, id: string }, word: string | string[]) => {
  const { data, error } = pageParam ?
  // 初回読み込み
  await supabase
    .rpc('handle_user_search_more', {
      word,
      fcount: pageParam.follower_count,
      id: pageParam.id
    })
  :
  // 追加読み込み
  await supabase
    .rpc('handle_user_search', {
      word
    })

  if(error) throw error

  console.log(data)

  return data
}

const useUserSearch = (word: string | string[]) => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(['user_search', word],
    ({ pageParam }) => FetchData(pageParam, word), {
      onError: error => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。'
        })

        console.log(error);
      },
      getNextPageParam: (lastPage) => (lastPage && (lastPage.length === 10)) ? { follower_count: lastPage[lastPage.length - 1].follower_count, id: lastPage[lastPage.length - 1].id} : false
    },
  )

  return { data, isFetching, hasNextPage, fetchNextPage }
}

export default useUserSearch