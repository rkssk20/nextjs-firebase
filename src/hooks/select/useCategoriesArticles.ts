import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'

const useCategoriesArticles = (category: 0 | 1 | 2 | 3) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const articlesCollection = collectionGroup(db, "articles")

  useEffect(() => {
    if(loading) return;
    setLoading(true);

    (async() => {
      try {
        const articlesDocument = await getDocs(query(articlesCollection, where("categories", "array-contains", category), orderBy("created_at", "desc"), limit(10)))

        const array: any[] = []
    
        if(articlesDocument.size < 10) {
          setHasNextPage(false)
        }

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          array.push({
            user_id: item.ref.parent.parent?.id,
            profilesRef: item.ref.parent.parent,
            id: item.id,
            ...itemData,
            details: itemData.details.slice(0, 50),
            created_at: itemData.created_at.toDate()
          })
        })

        await Promise.all(
          array.map(async(item, index) => {
            const profiles = await getDoc(item.profilesRef)
            const data: any = profiles.data();
            
            array[index].username = data.username;
            array[index].avatar = data.avatar;
            delete array[index].profilesRef;

            if(item.avatar) {
              array[index].avatar = await getDownloadURL(ref(getStorage(), array[index].avatar))
            }

            if(item.image) {
              array[index].image = await getDownloadURL(ref(getStorage(), item.image))            
            }
          })
        )
    
        setData(array)

      } catch {
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
        const articlesDocument = await getDocs(query(articlesCollection, where("created_at", "<", data[data.length - 1].created_at), where("categories", "array-contains", category), orderBy("created_at", "desc"), limit(10)))

        const array: any[] = []
    
        if(articlesDocument.size < 10) {
          setHasNextPage(false)
        }

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          array.push({
            user_id: item.ref.parent.parent?.id,
            profilesRef: item.ref.parent.parent,
            id: item.id,
            ...itemData,
            details: itemData.details.slice(0, 50),
            created_at: itemData.created_at.toDate()
          })
        })

        await Promise.all(
          array.map(async(item, index) => {
            const profiles = await getDoc(item.profilesRef)
            const data: any = profiles.data();
            array[index].username = data.username;
            array[index].avatar = data.avatar;
            delete array[index].profilesRef;

            if(item.avatar) {
              array[index].avatar = await getDownloadURL(ref(getStorage(), array[index].avatar))
            }

            if(item.image) {
              array[index].image = await getDownloadURL(ref(getStorage(), item.image))            
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

export default useCategoriesArticles
