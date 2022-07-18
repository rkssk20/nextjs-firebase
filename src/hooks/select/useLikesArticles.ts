import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
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

        let likesArray: any[] = []

        likesDocument.forEach(item => {
          likesArray.push(item.ref.id)
        })

        const articlesDocument = await getDocs(query(articlesCollection, where("id", "in", likesArray), limit(10)))

        console.log(articlesDocument.size)

        articlesDocument.forEach((item) => {
          const data = item.data()

          const index = likesArray.indexOf(data.id)

          likesArray.splice(index, 1, {
            user_id: item.ref.parent.parent?.id,
            profilesRef: item.ref.parent.parent,
            id: item.id,
            ...data,
            created_at: data.created_at.toDate()
          })
        })

        await Promise.all(
          likesArray.map(async(item, index) => {
            const profiles = await getDoc(item.profilesRef)
            const data: any = profiles.data();
            
            likesArray[index].username = data.username;
            likesArray[index].avatar = data.avatar;
            delete likesArray[index].profilesRef;

            if(item.avatar) {
              likesArray[index].avatar = await getDownloadURL(ref(getStorage(), likesArray[index].avatar))
            }

            if(item.image) {
              likesArray[index].image = await getDownloadURL(ref(getStorage(), item.image))            
            }
          })
        )
    
        setData(likesArray)

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

        let likesArray: any[] = []

        likesDocument.forEach(item => {
          likesArray.push(item.ref.id)
        })

        const articlesDocument = await getDocs(query(articlesCollection, where("id", "in", likesArray), limit(10)))

        articlesDocument.forEach((item) => {
          const data = item.data()

          const index = likesArray.indexOf(data.id)

          likesArray.splice(index, 1, {
            user_id: item.ref.parent.parent?.id,
            profilesRef: item.ref.parent.parent,
            id: item.id,
            ...data,
            created_at: data.created_at.toDate()
          })
        })

        await Promise.all(
          likesArray.map(async(item, index) => {
            const profiles = await getDoc(item.profilesRef)
            const data: any = profiles.data();
            
            likesArray[index].username = data.username;
            likesArray[index].avatar = data.avatar;
            delete likesArray[index].profilesRef;

            if(item.avatar) {
              likesArray[index].avatar = await getDownloadURL(ref(getStorage(), likesArray[index].avatar))
            }

            if(item.image) {
              likesArray[index].image = await getDownloadURL(ref(getStorage(), item.image))            
            }
          })
        )
    
        setData(prev => [...prev, ...likesArray])
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
