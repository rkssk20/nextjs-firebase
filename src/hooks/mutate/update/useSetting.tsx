import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { accountState, notificateState } from '@/lib/recoil'

type MutateType = {
  newUserName: string
  newDetails: string | null
}

const useSetting = () => {
  const [loading ,setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const [account, setAccount] = useRecoilState(accountState)

  const mutate = ({ newUserName, newDetails }: MutateType) => {
    console.log(loading)
    if(loading || !account.data) return
    setLoading(true)

    updateDoc(doc(db, 'profiles', account.data.id), {
      username: newUserName,
      details: newDetails
    }).then(() => {
      setAccount({
        loading: false,
        data: {
          id: account.data?.id as string,
          username: newUserName,
          avatar: account.data?.avatar
        }
      })
      setNotificate({
        open: true,
        message: 'プロフィールを変更しました'
      })
    }).catch(() => {
      setNotificate({
        open: true,
        message: 'エラーが発生しました'
      })
    }).finally(() => setLoading(false))
  }

  return mutate
}

export default useSetting