import useUserSearch from '@/hooks/select/search/useUserSearch'
import Circular from '@/atoms/Circular'
import Empty from '@/atoms/Empty'
import Account from '@/components/account/follow/Account'

const UserSearch = ({ word }: { word: string | string[] }) => {
  const { data, loading } = useUserSearch(word)

  return (
    <>
      {data && (data.length > 0) ? data.map((item) => (
        <Account
          key={item.id}
          id={item.id}
          username={item.username}
          avatar={item.avatar}
          details={item.details}
          setRef={ false }
        />
        )) : !loading && <Empty text='検索結果はありません' />
      }

      {loading && <Circular />}
    </>
  )
}

export default UserSearch
