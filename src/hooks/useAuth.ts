import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { definitions } from "@/types/supabase"
import { accountState, notificateState } from "@/lib/recoil"
import { supabase } from "@/lib/supabaseClient"

const useAuth = () => {
  const setAccount = useSetRecoilState(accountState)
  const setNotificate = useSetRecoilState(notificateState)

  // ユーザー情報の取得
  const getProfiles = async () => {
    try {
      const user = supabase.auth.user()

      if(!user?.id) throw 'error'

      const { data, error } = await supabase
      .from<definitions["profiles"]>('profiles')
      .select('username, avatar')
      .eq('id', user.id)
      .single()

      if(error) throw error

      setAccount({
        loading: false,
        data: {
          id: user.id,
          username: data.username,
          avatar: data.avatar ? process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/avatars/' + data.avatar : undefined
        }
      })
    } catch (error) {
      console.log(error)

      setNotificate({
        open: true,
        message: '認証に失敗しました。'
      })

      supabase.auth.signOut()
    }
  }

  useEffect(() => {
    // ログイン状態の確認
    const session = supabase.auth.session();

    // ログイン中
    if(session) {
      getProfiles()

    // ログアウト中
    } else {
      setAccount({
        loading: false,
        data: null
      })
    }

    // session変更の検知
    supabase.auth.onAuthStateChange((_, currentSession) => {
      // ログイン
      if(currentSession) {
        getProfiles()

      // ログアウト
      } else {
        setAccount({
          loading: false,
          data: null
        })
      }
    })
  }, [])
}

export default useAuth