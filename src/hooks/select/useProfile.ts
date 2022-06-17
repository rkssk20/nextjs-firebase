import { useSetRecoilState } from "recoil"
import { useQuery } from "react-query"
import { definitions } from "@/types/supabase"
import { accountState, notificateState } from "@/lib/recoil"
import { supabase } from "@/lib/supabaseClient"

const FetchData = async () => {
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

  const { data, isFetching } = useQuery(['profiles'], FetchData, {
    onSuccess: data => {
      setAccount({
        loading: false,
        data: {
          username: data.username,
          avatar: data.avatar ? process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/avatars/' + data.avatar : undefined
        }
      })
    },
    onError: () => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました。'
      })
    }
  })

  return { data, isFetching }
}

export default useProfile