import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { nanoid } from 'nanoid'
import { doc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CommentType } from '@/types/types'
import { accountState, notificateState } from '@/lib/recoil'

const useInsertComments = (path: string, user_id: string, setData: Dispatch<SetStateAction<CommentType[]>>, setText: Dispatch<SetStateAction<string>>) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async(comment: string) => {
    try {
      if(loading || !account.data) return
      setLoading(true)

      const id = nanoid()

      await setDoc(doc(db, 'profiles', account.data.id, "comments", id), {
        user_id: account.data.id,
        articles_id: path,
        comment,
        comments_likes: [],
        reply_count: 0,
        created_at: serverTimestamp()
      })

      await updateDoc(doc(db, "profiles", user_id, "articles", path), {
        comment_count: increment(1)
      })

      setData(prev => [{
          id,
          user_id: account.data?.id as string,
          comment,
          like_count: 0,
          comments_likes: false,
          reply_count: 0,
          created_at: String(new Date()),
          username: account.data?.username as string,
          avatar: account.data?.avatar as string
        }, ...prev
      ])

      setText('')

      setNotificate({
        open: true,
        message: 'コメントを送信しました'
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

export default useInsertComments
