import { Dispatch, SetStateAction, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { setDoc, serverTimestamp, updateDoc, doc, increment } from "firebase/firestore"
import { accountState, notificateState } from "@/lib/recoil"
import { db } from '@/lib/firebase'

const useInsertArticlesLikes = (
  user_id: string,
  path: string,
  setLikeCountState: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<boolean>>
) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const mutate = async() => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      await setDoc(doc(db, "profiles", account.data.id, "likes", path), {
        user_id: account.data.id,
        created_at: serverTimestamp()
      })

      await updateDoc(doc(db, "profiles", user_id, "articles", path), {
        like_count: increment(1)
      })

      setLikeCountState(prev => prev + 1)

      setData(true)

      setNotificate({
        open: true,
        message: 'この記事にいいねしました'
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

export default useInsertArticlesLikes