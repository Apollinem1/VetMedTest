/** Публичные файлы из `public/` с учётом Vite `base` (GitHub Pages). */
export function publicAssetUrl(path: string): string {
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL
  const rel = path.startsWith('/') ? path.slice(1) : path
  return `${base}${rel}`
}
