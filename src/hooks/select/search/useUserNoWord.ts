import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collection, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'

const useUserNoWord = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const articlesCollection = collection(db, "profiles")

  useEffect(() => {
    if(loading) return;
    setLoading(true);

    (async() => {
      try {
        const articlesDocument = await getDocs(query(articlesCollection, orderBy("created_at", "desc"), limit(10)))

        const array: any[] = []
    
        if(articlesDocument.size < 10) {
          setHasNextPage(false)
        }

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          array.push({
            id: item.ref.id,
            username: itemData.username,
            avatar: itemData.avatar,
            details: itemData.details.slice(0, 50)
          })
        })

        await Promise.all(
          array.map(async(item, index) => {
            if(item.avatar) {
              array[index].avatar = await getDownloadURL(ref(getStorage(), array[index].avatar))
            }
          })
        )
    
        setData(array)

      } catch (e){
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
        const articlesDocument = await getDocs(query(articlesCollection, where("created_at", "<", data[data.length - 1].created_at), orderBy("created_at", "desc"), limit(10)))

        const array: any[] = []
    
        if(articlesDocument.size < 10) {
          setHasNextPage(false)
        }

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          array.push({
            username: itemData.username,
            avatar: itemData.avatar,
            details: itemData.details.slice(0, 50)
          })
        })

        await Promise.all(
          array.map(async(item, index) => {
            if(item.avatar) {
              array[index].avatar = await getDownloadURL(ref(getStorage(), array[index].avatar))
            }
          })
        )
    
        setData(prev => [...prev, ...array])
      } catch {
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

export default useUserNoWord
