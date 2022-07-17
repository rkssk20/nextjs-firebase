import { Dispatch, SetStateAction, useState } from 'react'
import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'

const useArticlesLikesDelete = (
  path: string,
  user_id: string,
  setData: Dispatch<SetStateAction<boolean>>,
  setLikesCount: Dispatch<SetStateAction<number>>
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await deleteDoc(doc(db, "profiles", account.data.id, "likes", path))
      await updateDoc(doc(db, "profiles", user_id, "articles", path), {
        like_count: increment(-1)
      })

      setData(false)

      setLikesCount(prev => prev - 1)

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

export default useArticlesLikesDelete