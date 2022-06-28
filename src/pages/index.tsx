import { useEffect, ReactElement } from 'react'
import Side from '@/components/side/Side'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Introduction from '@/atoms/Introduction'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'

const Home = () => {
  useEffect(() => {
    fetch(`/api/getTrend`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }, [])

  return (
    <Layout type='website' title='' description='' image=''>
      {/* { data.map((item, index) => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ ((data.length - 1) === index) && setRef }
        />
      )) } */}

      {/* { loading && <Circular /> } */}
    </Layout>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <Introduction />

      {page}
    </div>
  )
}
