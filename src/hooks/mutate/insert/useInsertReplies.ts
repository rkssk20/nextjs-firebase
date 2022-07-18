import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { nanoid } from 'nanoid'
import { doc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'

const useInsertReplies = (path: string, id: string, articles_user_id: string, user_id: string, setFormOpen: Dispatch<SetStateAction<boolean>>, handleReply: (uuid: string, comment: string) => void) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async(comment: string) => {
    try {
      if(loading || !account.data) return
      setLoading(true)

      const uuid = nanoid()

      await setDoc(doc(db, 'profiles', account.data.id, "replies", uuid), {
        user_id: account.data.id,
        comment_id: id,
        comment,
        replies_likes: [],
        created_at: serverTimestamp()
      })

      await updateDoc(doc(db, "profiles", user_id, "comments", id), {
        reply_count: increment(1)
      })

      await updateDoc(doc(db, "profiles", articles_user_id, "articles", path), {
        comment_count: increment(1)
      })

      handleReply(uuid, comment)

      setFormOpen(false)

      setNotificate({
        open: true,
        message: 'コメントに返信しました'
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

export default useInsertReplies