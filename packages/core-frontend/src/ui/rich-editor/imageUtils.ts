export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

/** Базовая нормализация URL картинки (http(s), data:, относительные пути) */
export function normalizeImageSrc(raw: string): string {
  const value = raw.trim()
  if (!value) return ''
  if (/^data:image\//i.test(value)) return value
  if (value.startsWith('//')) return `https:${value}`
  if (
    /^https?:\/\//i.test(value) ||
    value.startsWith('/') ||
    value.startsWith('./') ||
    value.startsWith('../')
  ) {
    return value
  }
  return `https://${value}`
}

export function fileNameFromUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const name = parsed.pathname.split('/').filter(Boolean).pop()
    return name || 'image'
  } catch {
    return 'image'
  }
}
