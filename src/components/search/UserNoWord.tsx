import useObserver from '@/hooks/atoms/useObserver'
import useUserNoWord from '@/hooks/select/search/useUserNoWord'
import Circular from '@/atoms/Circular'
import Account from '@/components/account/follow/Account'

const UserNoWord = () => {
  const { data, loading, hasNextPage, fetchMore } = useUserNoWord()
  const setRef = useObserver({ hasNextPage, fetchMore })

  return (
    <>
      {data && data.map((item, index) => (
          <Account
            key={item.id}
            id={item.id}
            username={item.username}
            avatar={item.avatar}
            details={item.details}
            setRef={((data.length - 1) === index) && setRef}
          />
        ))
      }

      {loading && <Circular />}
    </>
  )
}

export default UserNoWord
