import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { accountState } from '@/lib/recoil'
import { auth, db, storage } from '@/lib/firebase'

const useProfile = () => {
  const setAccount = useSetRecoilState(accountState)

  useEffect(() => {
    // ログイン状態の変更を検知
    onAuthStateChanged(auth, async(user) => {
      // ログイン時
      if(user) {
        const profilesCollection = collection(db, "profiles")
        const profilesRef = doc(profilesCollection, user.uid)
        const document = await getDoc(profilesRef)
        const data = document.data()

        let fullPath = '';

        if(data?.avatar) {
          fullPath = await getDownloadURL(ref(storage, data.avatar))
        }

        // 既存のアカウントにログイン
        if(data) {
          setAccount({
            loading: false,
            data: {
              id: user.uid,
              username: data?.username,
              avatar: fullPath
            }
          })

        // 新規アカウントでログイン
        } else {
          setDoc(profilesRef, {
            id: user.uid,
            username: user.displayName ?? "アカウント",
            avatar: "",
            details: "",
            follow_count: 0,
            follower_count: 0,
            created_at: serverTimestamp()
          }).then(() => {
            setAccount({
              loading: false,
              data: {
                id: user.uid,
                username: user.displayName ?? "アカウント",
                avatar: ""
              }
            })
          })
        }

      // ログアウト時
      } else {
        setAccount({
          loading: false,
          data: null
        })
      }
    })
  }, [])
}

export default useProfile