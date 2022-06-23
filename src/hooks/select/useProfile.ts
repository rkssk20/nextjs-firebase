import { useSetRecoilState } from "recoil"
import { useQuery } from "react-query"
import { definitions } from "@/types/supabase"
import { accountState, notificateState } from "@/lib/recoil"
import { supabase } from "@/lib/supabaseClient"

const FetchData = async () => {
  if(typeof window === 'undefined') return

  const user = supabase.auth.user()

  if(!user?.id) throw 'error'

  const { data, error } = await supabase
  .from<definitions["profiles"]>('profiles')
  .select('username, avatar')
  .eq('id', user.id)
  .single()

  if(error) throw error

  return data
}


const useProfile = () => {
  const setNotificate = useSetRecoilState(notificateState)
  const setAccount = useSetRecoilState(accountState)

  useQuery(['profiles'], FetchData, {
    onSuccess: data => {
      if(data) {
        setAccount({
          loading: false,
          data: {
            username: data.username,
            avatar: data.avatar ? process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/avatars/' + data.avatar : undefined
          }
        })
      } else {
        setAccount({
          loading: false,
          data: {
            username: '',
            avatar: undefined
          }
        })

        setNotificate({
          open: true,
          message: 'ユーザー情報が見つかりませんでした'
        })
      }
    },
    onError: () => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました。'
      })
    }
  })
}

export default useProfile