import { InfiniteData, useMutation, useQuery, useQueryClient } from "react-query"; 
import { useSetRecoilState } from "recoil";
import { definitions } from "@/types/supabase";
import { notificateState } from "@/lib/recoil";
import { supabase } from "@/lib/supabaseClient";

const Mutate = async (follower_id: string, id: number | undefined) => {
  // フォローを外す
  if(id) {
    const { data, error } = await supabase
    .from<definitions['follows']>('follows')
    .delete({ returning: 'minimal' })

    if(error) throw error

    return data as unknown as null

  // フォローする
  } else {
    const { data, error } = await supabase
    .from<definitions['follows']>('follows')
    .insert({ follower_id })
    .single()
    
    if(error) throw error
    
    return data
  }
}

const useMutateFollow = (path: string, follower_id: string, id: number | undefined) => {
  const setNotificate = useSetRecoilState(notificateState)
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(() => Mutate(follower_id, id), {
    onSuccess: data => {
      console.log(data)

      // フォローした場合、キャッシュに追加
      if(data) {
        queryClient.setQueryData(['following', path], {
          id: data?.id
        })

        setNotificate({
          open: true,
          message: 'フォローしました。'
        })
        
        // フォローを外した場合、キャッシュから削除
      } else {
        queryClient.removeQueries(['followding', path], { exact: true })

        setNotificate({
          open: true,
          message: 'フォローを外しました。'
        })
      }
    },
    onError: error => {
      console.log(error)

      setNotificate({
        open: true,
        message: 'エラーが発生しました。'
      })
    }
  })

  return { mutate, isLoading }
}

export default useMutateFollow