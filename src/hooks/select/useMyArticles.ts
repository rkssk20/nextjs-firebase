import { useInfiniteQuery } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CustomArticlesType } from '@/types/types'
import { accountState, notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

export const fetchProfilesDetails = async (pageParam: string | undefined, id: string | undefined) => {
  const { data, error } =
    id ?
      // ログイン時 (likesも含める)
      pageParam ?
      // 追加読み込み
        await supabase
          .from<CustomArticlesType>('my_articles')
          .select('*')
          .eq('user_id', id)
          .order('created_at', {
            ascending: false
          })
          .lt('created_at', pageParam)
          .limit(10)
        :
        // 初回読み込み
        await supabase
          .from<CustomArticlesType>('my_articles')
          .select('*')
          .eq('user_id', id)
          .order('created_at', {
            ascending: false
          })
          .limit(10)
    // ログアウト時 (likesを含めない)
    :
      pageParam ?
        // 初回読み込み
        await supabase
          .from<CustomArticlesType>('my_articles')
          .select('id, user_id, image, title, details, like_count, comment_count, created_at, categories, username, avatar')
          .order('created_at', {
            ascending: false
          })
          .lt('created_at', pageParam)
          .limit(10)
        :
        // 追加読み込み
        await supabase
          .from<CustomArticlesType>('my_articles')
          .select('id, user_id, image, title, details, like_count, comment_count, created_at, categories, username, avatar')
          .order('created_at', {
            ascending: false
          })
          .limit(10)

  if(error) throw error

  console.log(data)

  return data
}

const useMyArticles = () => {
  const account = useRecoilValue(accountState)
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery('myArticles', ({ pageParam }) => fetchProfilesDetails(pageParam, account.data?.id), {
      // キャッシュの有効期間は5分
      staleTime: 30000,
      onError: error => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。'
        })

        console.log(error);
      },
      getNextPageParam: (lastPage) => (lastPage && (lastPage.length === 10)) ? lastPage[lastPage.length - 1].created_at : false
    },
  )

  return { data, isFetching, hasNextPage, fetchNextPage }
}

export default useMyArticles