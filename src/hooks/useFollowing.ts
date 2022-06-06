import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
import { accountState, notificateState } from '@/lib/recoil'

const useFollowing = (follower_id: string) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<number | null>(null)
  const account = useRecoilValue(accountState)
  const setNotificate = useSetRecoilState(notificateState)

  
  useEffect(() => {
    if(!account.loading || !account.data) return

    (async() => {
      try {
        console.log(account)
        const { data, error }  = await supabase
        .from<definitions['follow']>('follow')
        .select('id')
        .match({ 'user_id': account?.data?.id, 'follower_id': follower_id })
        .single()
  
        if(error) throw error
  
        setData(data.id)
  
      } catch {
        setNotificate({
          open: true,
          message: '一部でエラーが発生しました。'
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [account])

  return { loading, data }
}

export default useFollowing