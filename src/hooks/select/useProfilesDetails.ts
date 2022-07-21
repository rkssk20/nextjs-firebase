import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { accountState, notificateState } from '@/lib/recoil'

const useProfilesDetails = () => {
  const [data, setData] = useState<null | { username: string, details: string }>(null)
  const [loading, setLoading] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  useEffect(() => {
    if(!account.data) return;

    (async() => {
      try {
        const profilesCollection = collection(db, "profiles")
        const profilesRef = doc(profilesCollection, account.data?.id)
        const document = await getDoc(profilesRef)

        setData({
          username: document.data()?.username,
          details: document.data()?.details
        })

      } catch {
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      } finally {
        setLoading(false)
      }
  })();
  }, [account.data])

  return { data, loading }
}

export default useProfilesDetails