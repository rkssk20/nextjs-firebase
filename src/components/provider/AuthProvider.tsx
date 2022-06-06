import { ReactElement } from "react"
import useAuth from '@/hooks/useAuth'

const AuthProvider = ({ children }:{ children: ReactElement }) => {
  // 認証処理
  useAuth()

  return children
}

export default AuthProvider