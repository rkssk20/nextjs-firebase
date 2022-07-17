import { Dispatch, SetStateAction, useState } from 'react'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'
import type { CommentType } from '@/types/types'

const useDeleteCommentsLikes = (
  index: number,
  id: string,
  setData: Dispatch<SetStateAction<CommentType[]>>,
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await updateDoc(doc(db, "profiles", account.data.id, "comments", id), {
        comments_likes: arrayRemove(account.data.id)
      })

      setData(prev => prev.map((item, number) => (
        (index === number) ? {
          ...item,
          like_count: item.like_count - 1,
          comments_likes: false
        } : item
      ))
    )

      setNotificate({
        open: true,
        message: 'いいねを取り消しました'
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

export default useDeleteCommentsLikes