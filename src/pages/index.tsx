import type { ReactElement } from 'react'
import SideUser from '@/components/side/SideUser'
import useTrend from '@/hooks/select/useTrend'
import Circular from '@/atoms/Circular'
import Introduction from '@/atoms/Introduction'
import PageLayout from '@/components/provider/PageLayout'
import ContainerLayout from '@/components/provider/ContainerLayout'
import Post from '@/components/post/Post'

const Home = () => {
  const { data, loading } = useTrend()

  return (
    <ContainerLayout
      type='website'
      title=''
      description=''
      image=''
    >
      { data.map(item => (
        <Post
          key={ item.id }
          data={ item }
          setRef={ false }
        />
      )) }

      { loading && <Circular /> }
    </ContainerLayout>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      <Introduction details />
      
      { page }

      <SideUser />
    </PageLayout>
  )
}