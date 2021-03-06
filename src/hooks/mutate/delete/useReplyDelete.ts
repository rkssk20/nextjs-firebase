import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { deleteDoc, updateDoc, doc, increment } from 'firebase/firestore'
import { accountState, notificateState } from '@/lib/recoil'
import { db } from '@/lib/firebase'
import type { RepliesType } from '@/types/types'

const useReplyDelete = (
  path: string,
  articles_user_id: string,
  comment_id: string,
  user_id: string,
  index: number,
  id: string,
  setData: Dispatch<SetStateAction<RepliesType[]>>,
  handleClose: () => void
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await deleteDoc(doc(db, "profiles", account.data.id, "replies", id))

      await updateDoc(doc(db, "profiles", user_id, "comments", comment_id), {
        reply_count: increment(-1)
      })

      await updateDoc(doc(db, "profiles", articles_user_id, "articles", path), {
        comment_count: increment(-1)
      })

      setData(prev => prev.filter((item, number) => index !== number))

      handleClose()

      setNotificate({
        open: true,
        message: 'コメントを削除しました'
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

export default useReplyDelete
