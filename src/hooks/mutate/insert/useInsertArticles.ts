import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { nanoid } from 'nanoid'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage} from '@/lib/firebase'
import { accountState, notificateState, draftState } from '@/lib/recoil'

type MutateType = {
  title: string
  details: string
  image: Blob | null
  categories: number[]
}

const useInsertArticles = () => {
  const [loading, setLoading] = useState(false)
  const account = useRecoilValue(accountState)
  const setNotificate = useSetRecoilState(notificateState)
  const setDraft = useSetRecoilState(draftState)
  const router = useRouter()

  const mutate = async ({ title, details, image, categories }: MutateType) => {
    if(loading) return
    setLoading(true)

    if(account.data) {
      let url = ''

      // 画像がある場合アップロード
      if(image) {
        const type = image.type
        const index = type.indexOf('/')
        url = `image/${nanoid()}.${type.substring(index + 1)}`
  
        const storageRef = ref(storage, url);
        await uploadBytes(storageRef, image).catch(() => {
          setNotificate({
            open: true,
            message: '投稿に失敗しました'
          })

          setLoading(false)
          return
        });
      }

      const id = nanoid()

      // 記事を投稿
      const profilesCollection = collection(db, 'profiles', account.data.id, 'articles')
      setDoc(doc(profilesCollection, id), {
        id,
        title,
        details,
        categories,
        image: url,
        like_count: 0,
        comment_count: 0,
        created_at: serverTimestamp()
      }).then(() => {
        // 下書きを削除
        setDraft({
          title: '',
          details: '',
          categories: [],
        })

        router.push(`/account/${ account.data?.id }`).then(() => {
          setNotificate({
            open: true,
            message: '記事を投稿しました'
          })
        })
      }).catch((error) => {
        console.log(error)
        setNotificate({
          open: true,
          message: '投稿に失敗しました'
        })
      }).finally(() => {
        setLoading(false)
      })
    }
  }
  

  return { mutate, loading }
}

export default useInsertArticles