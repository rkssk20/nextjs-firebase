import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db, storage } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'

const useLikesArticles = (path: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const likesCollection = collectionGroup(db, "likes")
  const articlesCollection = collectionGroup(db, "articles")

  useEffect(() => {
    (async() => {
      try {
        const likesDocument = await getDocs(query(likesCollection, where("user_id", "==", path), orderBy("created_at", "desc"), limit(10)))

        if(likesDocument.size < 10) {
          setHasNextPage(false)

          if(likesDocument.size === 0) {
            return
          }
        }

        let array: any[] = []

        likesDocument.forEach(item => {
          array.push(item.ref.id)
        })

        console.log(array)

        const articlesDocument = await getDocs(query(articlesCollection, where("id", "in", array), limit(10)))

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          const index = array.indexOf(itemData.id)

          array.splice(index, 1, {
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
              array[index].avatar = await getDownloadURL(ref(storage, array[index].avatar))
            }

            if(item.image) {
              array[index].image = await getDownloadURL(ref(storage, item.image))            
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
        const likesDocument = await getDocs(query(likesCollection, where("user_id", "==", path), where("created_at", "<", data[data.length - 1].created_at), orderBy("created_at", "desc"), limit(10)))        

        if(likesDocument.size < 10) {
          setHasNextPage(false)

          if(likesDocument.size === 0) {
            return
          }
        }

        let array: any[] = []

        likesDocument.forEach(item => {
          array.push(item.ref.id)
        })

        const articlesDocument = await getDocs(query(articlesCollection, where("id", "in", array), limit(10)))

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          const index = array.indexOf(itemData.id)

          array.splice(index, 1, {
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
              array[index].avatar = await getDownloadURL(ref(storage, array[index].avatar))
            }

            if(item.image) {
              array[index].image = await getDownloadURL(ref(storage, item.image))            
            }
          })
        )
    
        setData(prev => [...prev, ...array])
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

export default useLikesArticles
