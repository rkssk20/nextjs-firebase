import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import { db, storage } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, query, where } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

const useSideTrend = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const setNotificate = useSetRecoilState(notificateState)
  const articlescollection = collectionGroup(db, "articles")

  useEffect(() => {
    (async() => {
      try {
        fetch('/api/getTrend').then(data => data.json()).then(async(result) => {

          console.log(result)

          let array: any[] = []
        
          result.response.map((item: any) => (
            array.push(item.dimensionValues[0].value.replace('/article/', ''))
          ))

          const articlesDocument = await getDocs(query(articlescollection, where("id", "in", array)))

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
        })

      } catch (e) {
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

export default useSideTrend