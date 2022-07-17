import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { accountState, notificateState } from '@/lib/recoil'

const useSelectLikes = (path: string) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(false)
  const account = useRecoilValue(accountState)
  const setNotificate = useSetRecoilState(notificateState)
  
  useEffect(() => {
    (async() => {
      if(!account.data) return

      try {
        const likesCollection = collection(db, "profiles", account.data.id, "likes")
        const likesRef = doc(likesCollection, path)
        const document = await getDoc(likesRef)

        document.data() && setData(true)

      } catch (e) {
        console.log(e)
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [account.data])

  return { data, loading, setData }
}

export default useSelectLikes