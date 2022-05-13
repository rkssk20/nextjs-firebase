export type DialogProps = {
  open: boolean
  handleClose: () => void
}

export type CategoriesProps = {
  text: 'フロント' | 'サーバーレス'
  url: 'front' | 'serverless'
}

export type ArticleType = {
  id: string;
  display_id: string;
  title: string;
  created_at: string;
  image: string;
  likes: number;
  like: boolean;
  details: string;
  name: string;
  tags: number[];
  mine: boolean;
}