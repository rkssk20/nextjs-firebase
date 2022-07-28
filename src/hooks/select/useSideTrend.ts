import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import { db, storage } from '@/lib/firebase'
import { collectionGroup, getDoc, getDocs, query, where } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

type DataType = {
  id: string
  title: string
  image: string
  username: string
}

const useSideTrend = () => {
  const [data, setData] = useState<DataType[]>([])
  const setNotificate = useSetRecoilState(notificateState)
  const articlescollection = collectionGroup(db, "articles")

  useEffect(() => {
    (async() => {
      try {
        const res = await fetch(`/api/getTrend`)

        const gaRes = await res.json()
        
        let array: any[] = []
        
        gaRes.response.map((item: any) => (
          array.push(item.dimensionValues[0].value.replace('/article/', ''))
        ));

        const articlesDocument = await getDocs(query(articlescollection, where("id", "in", array)));

        articlesDocument.forEach((item) => {
          const itemData = item.data()

          const index = array.indexOf(itemData.id)

          array.splice(index, 1, {
            id: itemData.id,
            title: itemData.title,
            image: itemData.image,
            profilesRef: item.ref.parent.parent
          })
        });

        await Promise.all(
          array.map(async(item, index) => {
            const profiles = await getDoc(item.profilesRef)
            const data: any = profiles.data();
            
            array[index].username = data.username;
            delete array[index].profilesRef;

            if(item.image) {
              array[index].image = await getDownloadURL(ref(storage, item.image))            
            }
          })
        );
    
        setData(array);

      } catch {
        setNotificate({
          open: true,
          message: 'エラーが発生しました'
        })
      }
    })();
  }, [])

  return data
} 

export default useSideTrend