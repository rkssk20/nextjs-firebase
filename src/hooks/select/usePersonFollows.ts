import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { notificateState } from '@/lib/recoil'

const usePersonFollows = (path: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const followsCollection = collection(db, "profiles", path, "follows")
  const profilesCollection = collection(db, "profiles")

  useEffect(() => {
    (async() => {
      try {
        const followsDocument = await getDocs(query(followsCollection, orderBy("created_at", "desc"), limit(10)))

        if(followsDocument.size < 10) {
          setHasNextPage(false)

          if(followsDocument.size === 0) {
            return
          }
        }

        let followsArray: any[] = []

        followsDocument.forEach(item => {
          followsArray.push(item.ref.id)
        })

        const profilesDocument = await getDocs(query(profilesCollection, where("id", "in", followsArray), limit(10)))

        console.log(profilesDocument.size)

        profilesDocument.forEach((item) => {
          const data = item.data()

          console.log(data)

          const index = followsArray.indexOf(data.id)

          followsArray.splice(index, 1, {
            ...data,
            details: data.details.slice(0, 50),
            created_at: data.created_at.toDate()
          })
        })

        console.log(followsArray)

        await Promise.all(
          followsArray.map(async(item, index) => {
            if(item.avatar) {
              followsArray[index].avatar = await getDownloadURL(ref(getStorage(), followsArray[index].avatar))
            }
          })
        )
    
        setData(followsArray)

      } catch(e) {
        console.log(e)
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      } finally {
        setLoading(false)
      }
    })();
  }, [])

  const fetchMore = () => {
    if(loading) return;
    setLoading(true);

    (async() => {
      try {
        const followsDocument = await getDocs(query(followsCollection, where("user_id", "==", path), where("created_at", "<", data[data.length - 1].created_at), orderBy("created_at", "desc"), limit(10)))        

        if(followsDocument.size < 10) {
          setHasNextPage(false)

          if(followsDocument.size === 0) {
            return
          }
        }

        let followsArray: any[] = []

        followsDocument.forEach(item => {
          followsArray.push(item.ref.id)
        })

        const articlesDocument = await getDocs(query(profilesCollection, where("id", "in", followsArray), limit(10)))

        articlesDocument.forEach((item) => {
          const data = item.data()

          const index = followsArray.indexOf(data.id)

          followsArray.splice(index, 1, {
            ...data,
            details: data.details.slice(0, 50),
            created_at: data.created_at.toDate()
          })
        })

        await Promise.all(
          followsArray.map(async(item, index) => {
            if(item.avatar) {
              followsArray[index].avatar = await getDownloadURL(ref(getStorage(), followsArray[index].avatar))
            }
          })
        )
    
        setData(prev => [...prev, ...followsArray])
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
  }

  return { data, loading, hasNextPage, fetchMore }
}

export default usePersonFollows
