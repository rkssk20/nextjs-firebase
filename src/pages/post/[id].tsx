import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const test = {
    id: 'fsdf-fsdf-erte-vdf',
    display_id: 'cvdfg',
    title: '技術選定',
    created_at: '2022-04-30 04:00:00.00000',
    image: '/image/ginza.png',
    likes: 0,
    like: false,
    details: 'できるだけサーバーレスで開発したい場合の技術選定を考えます。フロント: Next.js SSRで動的',
    name: 'フロントエンジニアA',
    tags: [0, 1],
    mine: true
  }

  return {
    props: {
      test
    },
    revalidate: 300
  };
};

interface PostProps {
  test: {
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
}

const Post = ({ test }: PostProps) => {
  return (
    <p>a</p>
  )
}

export default Post