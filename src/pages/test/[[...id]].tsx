import type { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'

// ISR
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  if(!id) return { notFound: true }

  return {
    props: {
      item: String(new Date()),
      path: id
    },
    // 5分キャッシュ
    revalidate: 300
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const Test = ({ item, path }: { item: string, path: string }) => {
  console.log(path)

  const date = new Date(item)
  
  return (
    <>
      <div>{ date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds() }</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href='/test/a'>aaaaaaaaaaa</Link>
      <Link href='/test/b'>bbbbbbbbbbbb</Link>
      <Link href='/test/c'>cccccccccccccc</Link>
      </div>
    </>
  )
}

export default Test