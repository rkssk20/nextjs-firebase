import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { nanoid } from 'nanoid'
import { db, storage } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { accountState, notificateState } from '@/lib/recoil'

const useAvatarUpload = (handleClose: () => void) => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const [account, setAccount] = useRecoilState(accountState)

  const mutate = async (blob: Blob) => {
    if(loading || !account.data) return
    setLoading(true)

    try {
      const type = blob.type
      const index = type.indexOf('/')
      const url = `avatar/${nanoid()}.${type.substring(index + 1)}`

      const storageRef = ref(storage, url);
      await uploadBytes(storageRef, blob)

      // 画像をアップロード
      await updateDoc(doc(db, 'profiles', account.data.id), {
        avatar: url
      })

      const fullPath = await getDownloadURL(ref(storage, url))

      let oldAvatar = account.data.avatar

      // アカウントの状態を変更
      setAccount({
        loading: false,
        data: {
          id: account.data.id,
          username: account.data.username,
          avatar: fullPath
        }
      })

      // ダイアログを閉じる
      handleClose()

      // 通知
      setNotificate({
        open: true,
        message: 'プロフィール画像を変更しました'
      })

      if(oldAvatar) { 
        // 既存の画像を削除
        deleteObject(ref(storage, oldAvatar))
      }

    } catch {
      setNotificate({
        open: true,
        message: 'エラーが発生しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading }
}

export default useAvatarUpload
