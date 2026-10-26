import { useRef, useState, useLayoutEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Подписывается на изменение высоты DOM-элемента через ResizeObserver.
 * @returns [ref, height] — ref привязать к контейнеру, height — текущая высота в px или null
 */
export function useContainerHeight(): [RefObject<HTMLDivElement | null>, number | null] {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const resizeObserver = new ResizeObserver((entries) => {
      const { height: contentHeight } = entries[0]?.contentRect ?? {}
      setHeight(typeof contentHeight === 'number' ? contentHeight : null)
    })
    resizeObserver.observe(element)
    return () => resizeObserver.disconnect()
  }, [])

  return [ref, height]
}
