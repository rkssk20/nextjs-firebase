import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { collection, doc, getDoc } from 'firebase/firestore'
import { accountState, notificateState } from '@/lib/recoil'
import { db } from '@/lib/firebase'

const useSelectFollows = (path: string) => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)
  const account = useRecoilValue(accountState)
  const setNotificate= useSetRecoilState(notificateState)

  useEffect(() => {
    (async() => {
      try {
        const followsCollection = collection(db, "profiles", account.data?.id as string, "follows")
        const followsRef = doc(followsCollection, path)
        const document = await getDoc(followsRef)
        const data = document.data()

        data && setData(true)

      } catch {
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { data, loading, setData }
}

export default useSelectFollows