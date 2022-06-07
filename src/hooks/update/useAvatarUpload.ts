import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { nanoid } from 'nanoid'
import { supabase } from "@/lib/supabaseClient";
import { accountState, notificateState } from "@/lib/recoil";

type MutateType = {
  blob: Blob
  type: string
}

type ExistingType = {
  username: string
  details: string | null
  avatar: string | null
} | undefined

const mutateAvatar = async ({ blob, type }: MutateType) => {
  const { error, data } = await supabase
  .storage
  .from('avatars')
  .upload(`public/${ nanoid() }.${ type }`, blob, {
    // 1年キャッシュ
    cacheControl: '31536000',
    upsert: false
  })
  
  if(error) throw error

  return data
}

const useAvatarUpload = () => {
  const setNotificate = useSetRecoilState(notificateState)
  const [account, setAccount] = useRecoilState(accountState)
  const queryClient = useQueryClient()

  const { mutate } = useMutation(({ blob, type }: MutateType) => mutateAvatar({ blob, type }), {
    onSuccess: data => {
      console.log(data)

      setAccount({
        loading: false,
        data: {
          id: account.data?.id ?? '',
          username: account.data?.username ?? '',
          avatar: process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/' + data?.Key
        }
      })

      const existing: ExistingType = queryClient.getQueryData('profilesDetails')

      console.log(existing)

      if(existing) {
        queryClient.setQueryData('profilesDetails', {
          ...existing,
          avatar: data?.Key
        })
      }

      setNotificate({
        open: true,
        message: 'アイコンをアップロードしました'
      })
    },
    onError: error => {
      setNotificate({
        open: true,
        message: 'アップロードに失敗しました'
      })

      console.log(error)
    }
  })
  
  return { mutate }
}

export default useAvatarUpload