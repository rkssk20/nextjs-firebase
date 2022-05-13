import { atom, selector, DefaultValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

interface NotificateProps {
  open: boolean;
  message: string;
}

// 通知
export const notificateState = atom<NotificateProps>({
  key: 'notificate',
  default: {
    open: false,
    message: ''
  }
})

// 検索履歴
export const searchHistoryState = atom<string[]>({
  key: 'searchHistroy',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const searchHistorySelector = selector<string[]>({
  key: 'searchHistorySelector',
  get: ({ get }) => {
    return get(searchHistoryState)
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) return

    set(searchHistoryState, (currVal: string[]) => {
      return Array.from(new Set([...newValue, ...currVal])).slice(0, 5)
    })
  },
})
