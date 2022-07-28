import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { db, storage } from '@/lib/firebase'
import { collection, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { notificateState } from '@/lib/recoil'

const useTrendUser = () => {
  const [data, setData] = useState<any[]>([])
  const setNotificate = useSetRecoilState(notificateState)
  const articlesCollection = collection(db, "profiles")

  useEffect(() => {
    (async() => {
      try {
        const articlesDocument = await getDocs(query(articlesCollection, orderBy("follower_count", "desc"), limit(5)))

        const array: any[] = []

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
              array[index].avatar = await getDownloadURL(ref(storage, array[index].avatar))
            }
          })
        )
    
        setData(array)

      } catch (e){
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      }
    })();
  }, [])

  return data
}

export default useTrendUser