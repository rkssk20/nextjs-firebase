import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { accountState, notificateState } from '@/lib/recoil'

const useAvatarDelete = () => {
  const [loading, setLoading] = useState(false)
  const setNotificate = useSetRecoilState(notificateState)
  const [account, setAccount] = useRecoilState(accountState)

  const mutate = async() => {
    if(loading) return
    setLoading(true)

    try {
      const profilesCollection = collection(db, "profiles")
      const profilesRef = doc(profilesCollection, account.data?.id)
      const document = await getDoc(profilesRef)
  
      const desertRef = ref(storage, document.data()?.avatar)
      await deleteObject(desertRef)
  
      await updateDoc(doc(db, 'profiles', account.data?.id as string), {
        avatar: ''
      })

      setAccount({
        loading: false,
        data: {
          id: account.data?.id as string,
          username: account.data?.username as string,
          avatar: ''
        }
      })

      setNotificate({
        open: true,
        message: 'プロフィール画像を変更しました'
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

export default useAvatarDelete
