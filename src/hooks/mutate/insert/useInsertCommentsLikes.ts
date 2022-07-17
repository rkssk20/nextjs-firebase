import { Dispatch, SetStateAction, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { accountState, notificateState } from "@/lib/recoil"
import { db } from '@/lib/firebase'
import type { CommentType } from '@/types/types'

const useInsertCommentsLikes = (
  index: number,
  id: string,
  setData: Dispatch<SetStateAction<CommentType[]>>
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      const profilesDocument = doc(db, "profiles", account.data.id, "comments", id)

      await updateDoc(profilesDocument, {
        comments_likes: arrayUnion(account.data.id)
      })

      console.log(index)

      setData(prev => prev.map((item, number) => (
          (index === number) ? {
            ...item,
            like_count: item.like_count + 1,
            comments_likes: true
          } : item
        ))
      )

      setNotificate({
        open: true,
        message: 'このコメントにいいねしました'
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

export default useInsertCommentsLikes