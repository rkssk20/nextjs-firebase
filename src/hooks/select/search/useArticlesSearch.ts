import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, limit, orderBy, query, startAt, endAt } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'

const useArticlesSearch = (word: string | string[]) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const articlesCollection = collectionGroup(db, "articles")

  useEffect(() => {
    if(loading) return;
    setLoading(true);

    (async() => {
      try {
        const articlesDocument = await getDocs(query(articlesCollection, orderBy("title"), orderBy("details"), startAt(word), endAt(word + '\uf8ff'), limit(10)))

        const array: any[] = []

        articlesDocument.forEach((item) => {
          const data = item.data()

          array.push({
            user_id: item.ref.parent.parent?.id,
            profilesRef: item.ref.parent.parent,
            id: item.id,
            ...data,
            created_at: data.created_at.toDate()
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

  return { data, loading }
}

export default useArticlesSearch