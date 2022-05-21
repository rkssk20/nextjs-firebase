import { Children, ReactElement } from "react"
import { useRecoilValue } from "recoil";
import { accountState } from "@/lib/recoil";
import Circular from '@/atoms/Circular'

const LoginOnly = ({ children }: { children: ReactElement }) => {
  const account = useRecoilValue(accountState)

  return (
    account.loading ?
    <Circular size="large" />
    :
    account.display_id ? Children.only(children) : <></>
  )
}

export default LoginOnly