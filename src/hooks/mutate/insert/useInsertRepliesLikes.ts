import { Dispatch, SetStateAction, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { accountState, notificateState } from "@/lib/recoil"
import { db } from '@/lib/firebase'
import type { RepliesType } from '@/types/types'

const useInsertRepliesLikes = (
  index: number,
  id: string,
  user_id: string,
  setData: Dispatch<SetStateAction<RepliesType[]>>
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      const profilesDocument = doc(db, "profiles", user_id, "replies", id)

      await updateDoc(profilesDocument, {
        replies_likes: arrayUnion(account.data.id)
      })

      setData(prev => prev.map((item, number) => (
          (index === number) ? {
            ...item,
            like_count: item.like_count + 1,
            replies_likes: true
          } : item
        ))
      )

      setNotificate({
        open: true,
        message: 'この返信にいいねしました'
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

export default useInsertRepliesLikes