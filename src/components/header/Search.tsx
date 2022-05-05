import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil'
import { searchHistorySelector } from "@/lib/recoil";
import DialogPaper from "@/atoms/DialogPaper"

import styles from '@/styles/components/header/search.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import TagIcon from '@mui/icons-material/Tag';

const Search = () => {
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

  const handleClose = () => {
    router.push(router.asPath.replace(/\?.*$/, ""), undefined, { shallow: true })
  }

  const handlePost = (e: FormEvent) => {
    e.preventDefault()
    if(search.length === 0) return

    setSearchHistory([search, ...searchHistory])
  }

  const handleRoute = (item: string) => {
    router.push(`/search/${ item }`)
  }

  return (
    <DialogPaper
      open={ router.query.dialog === 'search' }
      handleClose={ handleClose }
    >
      <DialogTitle className={ styles.dialog_title }>
        <form className={ styles.input } onSubmit={ handlePost }>
          <IconButton aria-label='戻る' onClick={ handlePost }>
            <SearchIcon />
          </IconButton>

          <InputBase
            className={ styles.input_base }
            placeholder="検索"
            autoFocus={ true }
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
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
        <Typography variant='h6'>検索履歴</Typography>

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

        <Typography className={ styles.categories } variant='h6'>カテゴリ</Typography>

        <List>
          { categories.map(item => (
            <ListItemButton
              key={ item.url }
              onClick={ () => router.push(`/categories/${ item.url }`) }
            >
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>

              { item.text }
            </ListItemButton>
          )) }
        </List>
      </DialogContent>
    </DialogPaper>
  )
}

export default Search