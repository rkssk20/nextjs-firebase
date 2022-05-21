import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { accountState } from "@/lib/recoil"

const useAuth = () => {
  const setAccount = useSetRecoilState(accountState)

  useEffect(() => {
    fetch('/api/testLogin')
    .then(res => res.json())
    .then(result => {
      setAccount({
        ...result.data,
        loading: false
      })
    }).catch(error => {
      console.log(error)

      setAccount({
        name: '',
        display_id: '',
        image: '',
        loading: false
      })
    })
  }, [])
}

export default useAuth