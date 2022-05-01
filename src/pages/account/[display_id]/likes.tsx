import Profile from '@/components/account/Profile'
import Bar from '@/components/account/Bar'
import MyLikes from '@/components/account/Likes'

import { useRouter } from 'next/router'

const Likes = () => {
  const router = useRouter()
  console.log(router)
  
  return (
    <div>
      <Profile />
      
      <Bar />

      <MyLikes />
    </div>
  )
}

export default Likes