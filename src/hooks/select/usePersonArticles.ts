import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const usePersonArticles = (path: string) => {
  const [account, setAccount] = useState({
    username: '',
    avatar: ''
  })
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const profilesCollection = collection(db, "profiles")
  const articlesCollection = collection(db, "profiles", path, "articles")

  useEffect(() => {
    (async() => {
      try {
        // 投稿主の情報
        const profilesDocument = await getDoc(doc(profilesCollection, path))
        const profiles = profilesDocument.data()

        let avatar = '';

        if(profiles?.avatar) { 
          avatar = await getDownloadURL(ref(getStorage(), profiles?.avatar))
        }

        setAccount({
          username: profiles?.username,
          avatar: avatar
        })

        // 投稿10件
        const articlesDocument = await getDocs(query(articlesCollection, orderBy("created_at", "desc"), limit(10))) 

        const array: any[] = []
    
        if(articlesDocument.size < 10) {
          setHasNextPage(false)
        }

        articlesDocument.forEach((item) => {   
          const itemData = item.data()

          array.push({
            user_id: path,
            username: profiles?.username,
            avatar,
            id: item.id,
            ...itemData,
            details: itemData.details.slice(0, 50),
            created_at: itemData.created_at.toDate()
          })
        })

        await Promise.all(
          array.map(async(item, index) => {          
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

  // 追加の読み込み
  const fetchMore = async () => {
    if(loading) return
    setLoading(true)

    try {
      const articlesDocument = await getDocs(query(articlesCollection, where("created_at", "<", data[data.length - 1].created_at), orderBy("created_at", "desc"), limit(10)))

      const array: any[] = []
    
      if(articlesDocument.size < 10) {
        setHasNextPage(false)
      }

      articlesDocument.forEach((item) => {
        const itemData = item.data()

        array.push({
          user_id: path,
          username: account.username,
          avatar: account.avatar,
          id: item.id,
          ...itemData,
          details: itemData.details.slice(0, 50),
          created_at: itemData.created_at.toDate()
        })
      })

      await Promise.all(
        array.map(async(item, index) => {          
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
  }

  return { data, loading, hasNextPage, fetchMore }
} 

export default usePersonArticles