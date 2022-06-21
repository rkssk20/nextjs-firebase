import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { definitions } from '@/types/supabase'
import { notificateState } from '@/lib/recoil'
import { supabase } from '@/lib/supabaseClient'

export const fetchFollowing = async (id: string | undefined, path: string) => {
  if(id === undefined) throw 'error'

  const { data, error } = await supabase
    .from<definitions['follows']>('follows')
    .select('id')
    .match({ 'user_id': id, 'follower_id': path })

  if(error) throw error

  return data[0]
}

const useFollowing = (path: string) => {
  const setNotificate = useSetRecoilState(notificateState)

  const { data, isFetching } = useQuery(['following', path], () => fetchFollowing(supabase.auth.user()?.id, path), {
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

export default useFollowing