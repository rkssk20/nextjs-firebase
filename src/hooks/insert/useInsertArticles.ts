import { useSetRecoilState } from "recoil"
import { nanoid } from "nanoid"
import { supabase } from "@/lib/supabaseClient"
import { notificateState, draftState } from "@/lib/recoil"
import { useMutation } from "react-query"

type MutateType = {
  title: string
  details: string
  image: Blob | null
  categories: number[]
}

const mutateArticles = async ({ title, details, image, categories }: MutateType) => {
  let image_result: string | undefined;

  // 画像があれば投稿
  if(image) {
    const type = image.type
    const index = type.indexOf('/');

    const { data, error } = await supabase
    .storage
    .from('articles')
    .upload(`public/${ nanoid() }.${ type.substring(index + 1) }`, image, {
      // 1年キャッシュ
      cacheControl: '31536000',
      upsert: false
    })

    if(error) throw error
    
    image_result = data?.Key
  }

  // 記事の投稿
  const { data: articlesData, error } = await supabase
  .rpc('on_insert_articles', {
    qid: nanoid(),
    title,
    details,
    image: image_result ?? null,
    categories
  })

  if(error) throw error

  return articlesData
}

const useInsertArticles = () => {
  const setNotificate= useSetRecoilState(notificateState)
  const setDraft = useSetRecoilState(draftState)

  const { mutate } = useMutation(
    ({ title, details, image, categories }: MutateType) => mutateArticles({
      title, details, image, categories
    }), {
      onSuccess: (data) => {
        // 自分の投稿一覧に追加

        // 下書きを削除
        setDraft({
          title: '',
          details: '',
          categories: []
        })

        // 通知
        setNotificate({
          open: true,
          message: '記事を投稿しました。'
        })

      },
      onError: () => {
        setNotificate({
          open: true,
          message: '投稿にエラーが発生しました。'
        })
      }
  })

  return { mutate }
}

export default useInsertArticles