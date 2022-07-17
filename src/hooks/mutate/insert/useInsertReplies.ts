import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { nanoid } from 'nanoid'
import { doc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'

const useInsertReplies = (id: string, user_id: string, setText: Dispatch<SetStateAction<string>>, handleReply: (uuid: string, comment: string) => void) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async(comment: string) => {
    try {
      if(loading || !account.data) return
      setLoading(true)

      const uuid = nanoid()

      await setDoc(doc(db, 'profiles', account.data.id, "replies", id), {
        user_id: account.data.id,
        comment_id: uuid,
        comment,
        replies_likes: [],
        created_at: serverTimestamp()
      })

      await updateDoc(doc(db, "profiles", user_id, "comments", id), {
        reply_count: increment(1)
      })

      handleReply(uuid, comment)

      setText('')

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