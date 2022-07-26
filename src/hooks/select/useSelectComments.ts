import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState, notificateState } from '@/lib/recoil'
import { db, storage } from '@/lib/firebase'
import type { CommentType } from '@/types/types'
import { collectionGroup, getDocs, getDoc, limit, orderBy, query, where, doc } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

const useSelectComments = (path: string) => {
  const [data, setData] = useState<CommentType[]>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const setNotificate = useSetRecoilState(notificateState)
  const account = useRecoilValue(accountState)

  const refetch = async() => {
    setLoading(true)

    try {
      const commentsCollection = collectionGroup(db, "comments")
      const comments = await getDocs(query(commentsCollection, where("articles_id", "==", path), orderBy("created_at", "asc"), limit(10)))

      if(comments.size < 10) {
        setHasNextPage(false)
      }

      let array: any[] = []
      
      comments.forEach(item => {
        const itemData = item.data()

        array.push({
          ...itemData,
          id: item.ref.id,
          like_count: itemData.comments_likes.length,
          comments_likes: itemData.comments_likes.indexOf(account.data?.id) > -1 ? true : false,
          user_id: itemData.user_id,
          created_at: itemData.created_at.toDate(),
          profilesRef: item.ref.parent.parent
        })
      })

      await Promise.all (
        array.map(async(item, index) => {
          const profiles = await getDoc(item.profilesRef)
          const itemData: any = profiles.data();

          array[index].username = itemData?.username
          array[index].avatar = itemData?.avatar
          delete array[index].profilesRef
          
          if(item.avatar) {
            array[index].avatar = await getDownloadURL(ref(storage, item.avatar))  
          }
        })
      )

      setData(array)
    } catch (e) {
      console.log(e)
      setNotificate({
        open: true,
        message: 'コメントの取得に失敗しました'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMore = async() => {
    if(loading) return
    setLoading(true)

    try {
      const commentsCollection = collectionGroup(db, "comments")
      const comments = await getDocs(query(commentsCollection, where("articles_id", "==", path), where("created_at", ">", data[data.length - 1].created_at), orderBy("created_at", "asc"), limit(10)))

      if(comments.size < 10) {
        setHasNextPage(false)
      }

      let array: any[] = []
      
      comments.forEach(item => {
        const itemData = item.data()

        array.push({
          ...itemData,
          id: item.ref.id,
          like_count: itemData.comments_likes.length,
          comments_likes: itemData.comments_likes.indexOf(account.data?.id) > -1 ? true : false,
          user_id: itemData.user_id,
          created_at: itemData.created_at.toDate(),
          profilesRef: item.ref.parent.parent
        })
      })

      await Promise.all (
        array.map(async(item, index) => {
          const profiles: any = await getDoc(item.profilesRef)
          const itemData = profiles.data()

          array[index].username = itemData?.username
          array[index].avatar = itemData?.avatar
          delete array[index].profilesRef

          if(item.avatar) {
            array[index].avatar =  await getDownloadURL(ref(storage, item.avatar))  
          }
        })
      )

      setData(prev => [...prev, ...array])
    } catch {
      setNotificate({
        open: true,
        message: 'コメントの取得に失敗しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return { data, refetch, loading, hasNextPage, fetchMore, setData }
}

export default useSelectComments