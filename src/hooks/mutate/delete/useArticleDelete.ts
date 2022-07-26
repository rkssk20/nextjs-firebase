import { useState } from 'react'
import { useRouter } from 'next/router'
import { doc, collection, collectionGroup, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { useSetRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'

const useArticleDelete = (path: string, user_id: string) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const router = useRouter()

  const mutate = async() => {
    if(loading) return
    setLoading(true)

    try {
      const articleCollection = collection(db, "profiles", user_id, "articles")
      const articleRef = doc(articleCollection, path)
      const articleDocument = await getDoc(articleRef)

      const avatar = articleDocument.data()?.avagar
      
      if(avatar) {
        const desertRef = ref(storage, avatar)
        await deleteObject(desertRef)
      }

      await deleteDoc(doc(db, "profiles", user_id, "articles", path))

      // 関連データの削除は、本来はCloud Functionで発動させる処理
      const commentsCollection = collectionGroup(db, "comments")
      const comments = await getDocs(query(commentsCollection, where("articles_id", "==", path)))

      comments.forEach(async(item) => {
        const itemData = item.data()

        await deleteDoc(doc(db, "profiles", itemData.user_id, "comments", item.ref.id))
      })

      const likesCollection = collectionGroup(db, "likes")
      const likes = await getDocs(query(likesCollection, where("articles_id", "==", path)))

      likes.forEach(async(item) => {
        const itemData = item.data()

        await deleteDoc(doc(db, "profiles", itemData.user_id, "likes", item.ref.id))
      })

      router.push('/').then(() => {
        setNotificate({
          open: true,
          message: '投稿を削除しました'
        })
      })
    } catch {
      setNotificate({
        open: true,
        message: 'エラーが発生しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return mutate
}

export default useArticleDelete
