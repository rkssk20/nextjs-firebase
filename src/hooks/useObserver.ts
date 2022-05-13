import { useState, useEffect, MutableRefObject } from 'react'

// 無限スクロール
// (対象を監視し、表示の状態を返す)
const useObserver = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [intersect, setIntersect] = useState(false)

  useEffect(() => {
    if (ref.current === null) return

    const observer = new IntersectionObserver(([entry]) => {
      setIntersect(entry.isIntersecting)
    })

    observer.observe(ref.current)

    // useEffectのreturnはアンマウント時の処理
    return () => {
      if (ref.current !== null) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref.current])

  return intersect
}

export default useObserver