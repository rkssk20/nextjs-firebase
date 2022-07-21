import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db } from '@/lib/firebase'
import { collection, getDoc, getDocs, limit, orderBy, query, startAt, endAt } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import type { ArticleType } from '@/types/types'
import { notificateState } from '@/lib/recoil'

const useUserSearch = (word: string | string[]) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const profilesDocument = collection(db, "profiles")

  useEffect(() => {
    if(loading) return;
    setLoading(true);

    (async() => {
      try {
        const articlesDocument = await getDocs(query(profilesDocument, orderBy("username"), orderBy("details"), startAt(word), endAt(word + '\uf8ff'), limit(1)))

        const array: any[] = []

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

export default useUserSearch
