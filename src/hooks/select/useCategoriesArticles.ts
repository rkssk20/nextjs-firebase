import { useInfiniteQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

export const FetchData = async (pageParam: string | undefined, category: 0 | 1) => {
  const id = supabase.auth.user()?.id
  const view = (category === 0) ? 'front_articles' : 'serverless_articles'

  const { data, error } =
    id ?
      // ログイン時 (likesも含める)
      pageParam ?
      // 追加読み込み
        await supabase
        .from<ArticleType>(view)
        .select('*, likes(id)')
          .eq('user_id', id)
          .order('created_at', {
            ascending: false
          })
          .lt('created_at', pageParam)
          .limit(10)
          :
          // 初回読み込み
          await supabase
          .from<ArticleType>(view)
        .select('*, likes(id)')
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
        .from<ArticleType>(view)
        .select('*')
        .order('created_at', {
          ascending: false
        })
        .lt('created_at', pageParam)
        .limit(10)
        :
        // 追加読み込み
        await supabase
        .from<ArticleType>(view)
        .select('*')
        .order('created_at', {
          ascending: false
        })
        .limit(10)

  if(error) throw error

  console.log(data)

  return data
}

const useCategoriesArticles = (category: 0 | 1) => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(['categories_articles', category],
    ({ pageParam }) => FetchData(pageParam, category), {
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

export default useCategoriesArticles