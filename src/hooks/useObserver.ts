import { useState, useEffect } from 'react'

// 無限スクロール
// (対象を監視し、表示の状態を返す)
const useObserver = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [intersect, setIntersect] = useState(false)

  useEffect(() => {
    if (ref === null) return

    const observer = new IntersectionObserver(([entry]) => {
      setIntersect(entry.isIntersecting)
    })

    observer.observe(ref)

    // useEffectのreturnはアンマウント時の処理
    return () => {
      if (ref !== null) {
        observer.unobserve(ref)
      }
    }
  }, [ref])

  return { intersect, setRef }
}

export default useObserver