import { NextPage } from "next";
import React, { ReactNode } from "react"
import { useSetRecoilState } from "recoil";
import { notificateState } from "@/lib/recoil";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

type Props = {
  children :ReactNode
}

const LoginOnly: NextPage<Props> = ({ children }) => {
  const setNotificate = useSetRecoilState(notificateState)
  const router = useRouter()

  // ログイン時
  if(supabase.auth.user()) {
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
    
  // ログアウト時 (ログインが必要なページなのでログインページに遷移)
  } else {
    router.replace('/login')
    .then(() => {
      setNotificate({
        open: true,
        message: 'ログインが必要なページです'
      })
    })
    
    return null
  }
}

export default LoginOnly