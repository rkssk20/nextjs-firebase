import { useState, useEffect, Children, ReactElement } from "react"
import { useRouter } from "next/router";
import Circular from '@/atoms/Circular'

const Auth = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/testLogin')
    .then(res => res.json())
    .then(result => {
      if(result.length > 0) {
        setAuth(true)
      } else {
        router.replace('/login')
      }
    }).catch(error => {
      console.log(error)
    }).finally(() => setLoading(false) )
  }, [])

  return (
    loading ?
    <Circular size="large" />
    :
    auth ? Children.only(children) : <></>
  )
}

export default Auth