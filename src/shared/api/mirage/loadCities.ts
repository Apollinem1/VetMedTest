import type {
  SelectAsyncLoadParams,
  SelectAsyncLoadResult,
  SelectOption,
} from 'core-frontend'

const CITIES_PAGE_SIZE = 5

/**
 * Загрузка городов с пагинацией через Mirage API.
 * Используется в SelectAsync / SelectPaginated при тестах и в dev.
 */
export async function loadCitiesFromApi(
  { signal, cursor }: SelectAsyncLoadParams
): Promise<SelectAsyncLoadResult> {
  const url = new URL('/api/cities', window.location.origin)
  url.searchParams.set('cursor', cursor ?? '0')
  url.searchParams.set('limit', String(CITIES_PAGE_SIZE))
  const res = await fetch(url.toString(), { signal })
  if (!res.ok) throw new Error('Failed to load cities')
  const data = (await res.json()) as { items: SelectOption[]; cursor?: string }
  return { items: data.items, cursor: data.cursor }
}
