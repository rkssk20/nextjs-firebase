import { QueryClient } from 'react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // エラー時の再試行回数
      retry: 0,
      // ブラウザへのマウスの再フォーカス時の再試行
      refetchOnWindowFocus: false,
    },
  },
})

export default client