import { useEffect, ReactElement } from 'react'
import Side from '@/components/side/Side'
import useArticles from '@/hooks/article/useArticles'
import useObserver from '@/hooks/atoms/useObserver'
import Circular from '@/atoms/Circular'
import Introduction from '@/atoms/Introduction'
import Layout from '@/components/provider/Layout'
import Post from '@/components/post/Post'

import { definitions } from '@/types/supabase'
import { supabase } from '@/lib/supabaseClient'
const Home = () => {
  // const { loading, data, Fetch } = useArticles()
  // const setRef = useObserver(Fetch)

  useEffect(() => {
    (async() => {
      const { data, error } = await supabase
      .from<definitions['articles']>('articles')
      .select('*, profiles!reference_articles_profiles(username, avatar), categories(id, category)')
      .eq('id', 's_r8Z62RTL3nnS1B9VELK')
      .single()
      
      console.log(data)
      console.log(error)
    })()
  }, [])

  return (
    <Layout
      type='website'
      title=''
      description=''
      image=''
    >
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

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <div>
      { page }

      <Side />
    </div>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <div>
      <Introduction />

      { page }
    </div>
  )
}