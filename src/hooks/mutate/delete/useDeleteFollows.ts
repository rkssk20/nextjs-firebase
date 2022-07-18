import { Dispatch, SetStateAction, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { deleteDoc, serverTimestamp, updateDoc, doc, increment } from "firebase/firestore"
import { accountState, notificateState } from "@/lib/recoil"
import { db } from '@/lib/firebase'

const useDeleteFollows = (
  path: string,
  setData: Dispatch<SetStateAction<boolean>>
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await deleteDoc(doc(db, "profiles", account.data.id, "follows", path))

      await updateDoc(doc(db, "profiles", account.data.id), {
        follow_count: increment(-1)
      })

      await updateDoc(doc(db, "profiles", path), {
        follower_count: increment(-1)
      })

      setData(false)

      setNotificate({
        open: true,
        message: 'フォローを外しました'
      })
    } catch {
      setNotificate({
        open: true,
        message: 'エラーが発生しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return mutate  
}

export default useDeleteFollows