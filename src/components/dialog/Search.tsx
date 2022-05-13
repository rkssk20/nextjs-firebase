import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil'
import { DialogProps } from "@/types/types";
import { searchHistorySelector } from "@/lib/recoil";
import DialogPaper from "./DialogPaper";

import styles from '@/styles/components/dialog/search.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import TagIcon from '@mui/icons-material/Tag';

const Search = ({ open, handleClose }: DialogProps) => {
  const [search, setSearch] = useState('')
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistorySelector)
  const router = useRouter()
  const categories = [{
    text: 'フロント',
    url: 'front'
  }, {
    text: 'サーバーレス',
    url: 'serverless'
  }]

  // const handleClose = () => {
  //   router.push({
  //     pathname: router.asPath
  //   }, undefined, {
  //     shallow: true
  //   })
  // }

  // 検索を実行
  const handlePost = (e: FormEvent) => {
    e.preventDefault()
    if(search.length === 0) return

    setSearchHistory([search, ...searchHistory])

    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    })
  }

  // 検索履歴から検索
  const handleRoute = (item: string) => {
    router.push({
      pathname: '/search',
      query: {
        q: item
      }
    })
  }

  return (
    <DialogPaper open={ open } handleClose={ handleClose }>
      <DialogTitle className={ styles.dialog_title }>
        {/* 検索欄 */}
        <form className={ styles.input } onSubmit={ handlePost }>
          <InputBase
            className={ styles.input_base }
            classes={{ root: styles.input_base_root }}
            placeholder="検索"
            autoFocus={ true }
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />

          <IconButton aria-label='検索' onClick={ handlePost }>
            <SearchIcon />
          </IconButton>
        </form>

        <Button
          color='inherit'
          className={ styles.button }
          classes={{ root: styles.button_root }}
          onClick={ handleClose }
        >
          キャンセル
        </Button>
      </DialogTitle>

      <DialogContent>
        <Typography className={ styles.title } variant='h5'>検索履歴</Typography>

        {/* 検索履歴 */}
        { (searchHistory.length > 0) ?
          <List>
            { searchHistory.map(item => (
              <ListItemButton
                key={ item }
                className={ styles.list_item_button }
                onClick={ () => handleRoute(item) }
              >
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>

                <ListItemText>
                  { item }
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
          :
          <List className={ styles.none }>
            <Typography variant="body1">履歴がありません</Typography>
            <Typography className={ styles.ex } variant="body1">例) 「Next.js」、「supabase」</Typography>
          </List>
        }

        <Typography className={ styles.title } variant='h5'>カテゴリ</Typography>

        {/* カテゴリ一覧 */}
        <List>
          { categories.map(item => (
            <ListItemButton
              key={ item.url }
              className={ styles.list_item_button }
              onClick={ () => router.push(`/categories/${ item.url }`) }
            >
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>

              <ListItemText>
                { item.text }
              </ListItemText>
            </ListItemButton>
          )) }
        </List>
      </DialogContent>
    </DialogPaper>
  )
}

export default Search