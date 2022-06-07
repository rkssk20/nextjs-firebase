import React, { ReactNode } from "react"
import type { NextPage } from 'next'
import useAuth from '@/hooks/useAuth'

type Props = {
  children: ReactNode
}

const AuthProvider: NextPage<Props> = ({ children }) => {
  // 認証処理
  useAuth()

  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  )
}

export default AuthProvider