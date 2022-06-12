import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { definitions } from '@/types/supabase'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

type DataType = {
  id: string;
  user_id?: string | undefined;
  title: string;
  details: string;
  image?: string | undefined;
  like_count: number;
  comment_count: number;
  created_at: string;
  categories: {
    id: number
    category: number[]
  }[] | null
  profiles: {
    id: string
    usernmae: string
    avatar: string | null
  }
  likes: {
    id: number
  }
}[]

export const fetchProfilesDetails = async (id: string | undefined) => {
  if(id === undefined) throw 'error'

  const { data, error } = await supabase
    .from<definitions['articles']>('articles')
    .select('id, user_id, title, details, image, like_count, comment_count, created_at, categories(id, category), profiles(username, avatar), likes(id)')
    .eq('user_id', id)
    .limit(10)
    .order('created_at', {
      ascending: false
    })

  if(error) throw error

  return data
}

const useMyArticles = () => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching } = useQuery(['myArticles'], () => fetchProfilesDetails(supabase.auth.user()?.id), {
      // キャッシュの有効期間は5分
      staleTime: 30000,
      onError: error => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。'
        })

        console.log(error);
      }
    },
  )  

  return { data, isFetching }
}

export default useMyArticles