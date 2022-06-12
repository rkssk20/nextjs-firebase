import { useMutation, useQueryClient } from "react-query"
import { definitions } from "@/types/supabase"
import { useRecoilState, useSetRecoilState } from "recoil"
import { accountState, notificateState } from "@/lib/recoil"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  newUserName: string
  newDetails: string | null
}

type MutateSettingProps = Props & {
  id: string | undefined
}

type ExistingType = {
  id: string;
  username: string;
  avatar?: string | undefined;
  details?: string | undefined;
  follow_count: number;
  follower_count: number;
} | undefined

const mutateSetting = async ({ id, newUserName, newDetails }: MutateSettingProps) => {
  const update: {
    [prop: string]: string | null
  } = {};

  if(newUserName) update.username = newUserName;
  if(newUserName) update.details = newDetails;

  console.log(update)

  const { data, error } = await supabase
  .from<definitions['profiles']>('profiles')
  .update(update, {
    returning: 'minimal'
  })
  .eq('id',id)

  if(error) throw error

  return data
}

const useSetting = ({ newUserName, newDetails }: Props) => {
  const setNotificate = useSetRecoilState(notificateState)
  const [account, setAccount] = useRecoilState(accountState)
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    () => mutateSetting({ id: account.data?.id, newUserName, newDetails }), {
      onSuccess: () => {
        const existing: ExistingType = queryClient.getQueryData(['profilesDetails'])
        
        // 完了通知
        setNotificate({
          open: true,
          message: 'プロフィールを変更しました'
        })

        if(existing?.username === newUserName) return

        // キャッシュがあるなら変更
        if(existing) {
          queryClient.setQueryData('profilesDetails', {
            ...existing,
            username: newUserName,
            details: newDetails
          })
        }

        // ユーザーの状態を変更
        setAccount({
          loading: false,
          data: {
            id: account.data?.id ?? '',
            username: newUserName,
            avatar: account.data?.avatar
          }
        })
      },
      onError: () => {
        setNotificate({
          open: true,
          message: 'エラーが発生しました。'
        })
      }
    }
  )

  return { isLoading, mutate }
}

export default useSetting