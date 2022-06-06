import { NextPage } from "next";
import React, { ReactNode } from "react"
import { useRecoilValue } from "recoil";
import { accountState } from "@/lib/recoil";
import { useRouter } from "next/router";
import Circular from '@/atoms/Circular'

type Props = {
  children :ReactNode
}

const LoginOnly: NextPage<Props> = ({ children }) => {
  const account = useRecoilValue(accountState)
  const router = useRouter()

  // ユーザー読み込み中
  if(account.loading) {
    return <Circular />
    
  // ログアウト時
  } else if(!account.data) {
    router.replace('/')

    return null
    
  // ログイン時
  } else {
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }
}

export default LoginOnly