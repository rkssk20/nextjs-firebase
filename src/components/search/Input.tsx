import { useState, useEffect, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { searchHistorySelector } from '@/lib/recoil'

import styles from '@/styles/components/search/input.module.scss'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';

const Input = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistorySelector)
  const sorce = router.query.sorce

  useEffect(() => {
    router.query.q &&
    (typeof(router.query.q) === 'string') &&
    (() => {
      setSearch(router.query.q)
    })()
  }, [router.query.q])

  // 検索を実行
  const handlePost = () => {
    if(search.length === 0) return

    setSearchHistory([search, ...searchHistory])

    const query = Boolean(sorce) ? { q: search, sorce } : { q: search }

    router.push({
      pathname: '/search',
      query 
    }, undefined, {
      shallow: true
    })
  }

  // 検索履歴から実行
  const handleHistory = (_: SyntheticEvent<Element, Event>, value: string | null) => {
    if(!value) return

    setSearchHistory([value, ...searchHistory])

    const query = Boolean(sorce) ? { q: value, sorce } : { q: value }

    router.push({
      pathname: '/search',
      query
    }, undefined, {
      shallow: true
    })
  }

  return (
    <Autocomplete
      className={ styles.autocomplete }
      classes={{
        root: styles.autocomplete_root,
        input: styles.autocomplete_input,
        popper: styles.autocomplete_popper,
        option: styles.autocomplete_option
      }}
      freeSolo
      openOnFocus
      value={ search }
      options={ searchHistory }
      isOptionEqualToValue={ () => false }
      // 検索履歴から実行した場合の処理
      onChange={ handleHistory }
      renderInput={ (params) => (
        <div className={ styles.input_field } ref={ params.InputProps.ref }>
          {/* 検索欄 */}
          <input
            type='text'
            placeholder="検索"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
            onSubmit={ handlePost }
            { ...params.inputProps }
          />

          {/* 検索アイコン */}
          <IconButton aria-label='検索' onClick={ handlePost }>
            <SearchIcon />
          </IconButton>
        </div>
      )}
    />
  )
}

export default Input