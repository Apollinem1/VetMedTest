/** Нормализация URL как при вставке ссылки в редактор */
export function normalizeRichEditorHref(raw: string): string {
  const value = raw.trim()
  if (!value) return ''
  if (
    /^https?:\/\//i.test(value) ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  ) {
    return value
  }
  return `https://${value}`
}

/** Сокращение для атрибута title (подсказка при наведении) */
export function truncateUrlForTooltip(url: string, maxLen = 72): string {
  if (url.length <= maxLen) return url
  return `${url.slice(0, maxLen - 3)}...`
}

/**
 * Разрешённые data: URI для вложений (ссылки на файлы в документе).
 * Не допускаем data:text/html и прочие произвольные типы.
 */
export function isSafeDataUriForAttachment(url: string): boolean {
  if (!url.startsWith('data:')) return false
  const comma = url.indexOf(',')
  if (comma < 0) return false
  const meta = url.slice(5, comma).toLowerCase()
  if (meta === 'text/html' || meta.startsWith('text/html')) return false
  if (meta.startsWith('image/')) return true
  if (meta.startsWith('application/pdf')) return true
  if (meta === 'application/msword') return true
  if (meta.startsWith('application/vnd.openxmlformats')) return true
  if (meta.startsWith('application/vnd.ms-')) return true
  if (meta === 'application/rtf' || meta === 'text/rtf') return true
  if (meta.startsWith('application/vnd.oasis.opendocument')) return true
  return false
}

/** Нормализация YouTube URL для вставки видео */
export function normalizeYouTubeUrl(raw: string): string {
  const value = raw.trim()
  if (!value) return ''

  let parsedUrl: URL
  try {
    parsedUrl = /^https?:\/\//i.test(value) ? new URL(value) : new URL(`https://${value}`)
  } catch {
    return ''
  }

  const host = parsedUrl.hostname.replace(/^www\./i, '').toLowerCase()
  let videoId = ''

  if (host === 'youtu.be') {
    videoId = parsedUrl.pathname.split('/').filter(Boolean)[0] || ''
  } else if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsedUrl.pathname === '/watch') {
      videoId = parsedUrl.searchParams.get('v') || ''
    } else if (parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2] || ''
    } else if (parsedUrl.pathname.startsWith('/embed/')) {
      videoId = parsedUrl.pathname.split('/')[2] || ''
    } else if (parsedUrl.pathname.startsWith('/v/')) {
      videoId = parsedUrl.pathname.split('/')[2] || ''
    }
  }

  videoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '')
  if (!videoId) return ''
  return `https://www.youtube.com/watch?v=${videoId}`
}
