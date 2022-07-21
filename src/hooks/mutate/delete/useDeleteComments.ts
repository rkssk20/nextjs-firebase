import { Dispatch, SetStateAction, useState } from 'react'
import { collectionGroup, getDocs, query, where, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'
import type { CommentType } from '@/types/types'

const useDeleteComments = (
  index: number,
  id: string,
  user_id: string,
  path: string,
  setData: Dispatch<SetStateAction<CommentType[]>>,
  handleClose: () => void
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await deleteDoc(doc(db, "profiles", account.data.id, "comments", id))

      await updateDoc(doc(db, "profiles", user_id, "articles", path), {
        comment_count: increment(-1)
      })

      setData(prev => prev.filter((item, number) => index !== number))

      // 関連データの削除は、本来はCloud Functionで発動させる処理
      const repliesCollection = collectionGroup(db, "replies")
      const replies = await getDocs(query(repliesCollection, where("comment_id", "==", id)))

      replies.forEach(async(item) => {
        const itemData = item.data()

        await deleteDoc(doc(db, "profiles", itemData.user_id, "replies", item.ref.id))
      })

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

export default useDeleteComments