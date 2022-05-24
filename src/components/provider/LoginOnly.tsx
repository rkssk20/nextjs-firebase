import { Children, ReactElement } from "react"
import { useRecoilValue } from "recoil";
import { accountState } from "@/lib/recoil";

import CircularProgress from "@mui/material/CircularProgress";

const LoginOnly = ({ children }: { children: ReactElement }) => {
  const account = useRecoilValue(accountState)

  return (
    account.loading ?
    <CircularProgress size={ 40 } />
    :
    account.display_id ? Children.only(children) : <></>
  )
}

export default LoginOnly