import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { supabase } from '@/lib/supabaseClient'
import { notificateState } from '@/lib/recoil'
import { FetchData } from './useProfilesDetails'

const useLazyProfilesDetails = () => {
  const setNotificate = useSetRecoilState(notificateState)
  const id = supabase.auth.user()?.id

  const { data, isFetching, refetch } = useQuery(['profilesDetails'],
  () => id ? FetchData(id) : null, {
      // キャッシュの有効期間は5分
      staleTime: 30000,
      // 初回の取得を禁止
      enabled: true,
      onError: error => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。'
        })

        console.log(error);
      }
    }
  )  

  return { data, isFetching, refetch }
}

export default useLazyProfilesDetails