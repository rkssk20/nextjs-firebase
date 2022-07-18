import { Dispatch, SetStateAction, useState } from 'react'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'
import type { RepliesType } from '@/types/types'

const useDeleteRepliesLikes = (
  index: number,
  id: string,
  user_id: string,
  setData: Dispatch<SetStateAction<RepliesType[]>>,
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await updateDoc(doc(db, "profiles", user_id, "replies", id), {
        replies_likes: arrayRemove(account.data.id)
      })

      setData(prev => prev.map((item, number) => (
        (index === number) ? {
          ...item,
          like_count: item.like_count - 1,
          replies_likes: false
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

export default useDeleteRepliesLikes