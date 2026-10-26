import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  MultiSelect,
  AutocompleteSingle,
  AutocompleteMulti,
  AutocompleteWithSections,
  SelectAsync,
  SelectAsyncMulti,
  AutocompleteAsyncSingle,
  AutocompleteAsyncMulti,
} from './index'
import type { SelectOption, SelectSection } from './types'

const meta: Meta<typeof Select> = {
  title: 'Core/UI/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta

const cityOptions: SelectOption[] = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'kzn', label: 'Казань' },
]

// Большой список — для тестирования пагинации (видно скроллинг и подгрузку)
const manyOptions: SelectOption[] = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'kzn', label: 'Казань' },
  { value: 'nn', label: 'Нижний Новгород' },
  { value: 'chel', label: 'Челябинск' },
  { value: 'smr', label: 'Самара' },
  { value: 'rnd', label: 'Ростов-на-Дону' },
  { value: 'ufa', label: 'Уфа' },
  { value: 'krd', label: 'Краснодар' },
  { value: 'perm', label: 'Пермь' },
  { value: 'vgd', label: 'Волгоград' },
  { value: 'vrnzh', label: 'Воронеж' },
  { value: 'srtv', label: 'Саратов' },
  { value: 'krsk', label: 'Красноярск' },
  { value: 'tlt', label: 'Тольятти' },
  { value: 'izhv', label: 'Ижевск' },
  { value: 'brsk', label: 'Барнаул' },
  { value: 'ulsk', label: 'Ульяновск' },
]

const citySections: SelectSection[] = [
  { key: 'eu', title: 'Европа', options: [cityOptions[0], cityOptions[1], cityOptions[4]] },
  { key: 'asia', title: 'Азия / Урал', options: [cityOptions[2], cityOptions[3]] },
]

const asyncLoad = async ({ signal: _signal, cursor }: { signal: AbortSignal; cursor?: string }) => {
  await new Promise((r) => setTimeout(r, 500))
  const start = cursor ? parseInt(cursor, 10) : 0
  const pageSize = 3
  const slice = cityOptions.slice(start, start + pageSize)
  return {
    items: slice,
    cursor: start + pageSize < cityOptions.length ? String(start + pageSize) : undefined,
  }
}

const asyncLoadSmall = async ({ signal: _signal, cursor }: { signal: AbortSignal; cursor?: string }) => {
  await new Promise((r) => setTimeout(r, 400))
  const start = cursor ? parseInt(cursor, 10) : 0
  const pageSize = 2
  const slice = cityOptions.slice(start, start + pageSize)
  return {
    items: slice,
    cursor: start + pageSize < cityOptions.length ? String(start + pageSize) : undefined,
  }
}

// Пагинация — загружаем из большого списка по 5, нужен скролл чтобы подгрузить следующие
const asyncLoadPaginated = async ({ signal: _signal, cursor }: { signal: AbortSignal; cursor?: string }) => {
  await new Promise((r) => setTimeout(r, 600))
  const start = cursor ? parseInt(cursor, 10) : 0
  const pageSize = 5
  const slice = manyOptions.slice(start, start + pageSize)
  return {
    items: slice,
    cursor: start + pageSize < manyOptions.length ? String(start + pageSize) : undefined,
  }
}

// ——— Без API (статичные опции) ———

/** Одиночный выбор, без поиска */
export const Default: StoryObj<typeof Select> = {
  args: {
    label: 'Город',
    placeholder: 'Выберите город',
    options: cityOptions,
  },
}

/** Множественный выбор, без поиска */
export const Multi: StoryObj<typeof MultiSelect> = {
  render: () => (
    <MultiSelect
      label="Города"
      placeholder="Выберите города"
      options={cityOptions}
    />
  ),
}

/** Одиночный выбор с поиском по списку */
export const AutocompleteSingleStory: StoryObj<typeof AutocompleteSingle> = {
  render: () => (
    <AutocompleteSingle
      className="w-[256px]"
      label="Город (с поиском)"
      placeholder="Выберите город"
      searchPlaceholder="Поиск..."
      options={cityOptions}
    />
  ),
}

/** Множественный выбор с поиском, выбранные — теги */
export const AutocompleteMultiStory: StoryObj<typeof AutocompleteMulti> = {
  render: () => (
    <AutocompleteMulti
      className="w-[256px]"
      label="Города для поездки"
      placeholder="Выберите города"
      searchPlaceholder="Поиск..."
      options={cityOptions}
    />
  ),
}

/** С поиском и категориями (секциями) */
export const WithSections: StoryObj<typeof AutocompleteWithSections> = {
  render: () => (
    <AutocompleteWithSections
      className="w-[256px]"
      label="Город по региону"
      placeholder="Выберите город"
      searchPlaceholder="Поиск..."
      sections={citySections}
      selectionMode="single"
    />
  ),
}

/** С поиском и категориями, множественный выбор */
export const WithSectionsMulti: StoryObj<typeof AutocompleteWithSections> = {
  render: () => (
    <AutocompleteWithSections
      className="w-[256px]"
      label="Города по региону (несколько)"
      placeholder="Выберите города"
      searchPlaceholder="Поиск..."
      sections={citySections}
      selectionMode="multiple"
    />
  ),
}

// ——— С API (асинхронная подгрузка, пагинация при скролле) ———

/** Асинхронная подгрузка, одиночный выбор, подгрузка при скролле */
export const Async: StoryObj<typeof SelectAsync> = {
  render: () => (
    <SelectAsync
      label="Город (подгрузка)"
      placeholder="Выберите город"
      load={asyncLoad}
    />
  ),
}

/** Асинхронная подгрузка, множественный выбор */
export const AsyncMulti: StoryObj<typeof SelectAsyncMulti> = {
  render: () => (
    <SelectAsyncMulti
      label="Города (подгрузка, несколько)"
      placeholder="Выберите города"
      load={asyncLoad}
    />
  ),
}

/** С поиском + асинхронная подгрузка, одиночный выбор */
export const AutocompleteAsyncSingleStory: StoryObj<typeof AutocompleteAsyncSingle> = {
  render: () => (
    <AutocompleteAsyncSingle
      className="w-[256px]"
      label="Город (поиск + подгрузка)"
      placeholder="Выберите город"
      searchPlaceholder="Поиск..."
      load={asyncLoadSmall}
    />
  ),
}

/** С поиском + асинхронная подгрузка, множественный выбор, теги */
export const AutocompleteAsyncMultiStory: StoryObj<typeof AutocompleteAsyncMulti> = {
  render: () => (
    <AutocompleteAsyncMulti
      className="w-[256px]"
      label="Города (поиск + подгрузка, несколько)"
      placeholder="Выберите города"
      searchPlaceholder="Поиск..."
      load={asyncLoadSmall}
    />
  ),
}

/**
 * Пагинация при скролле — 20 городов, по 5 за раз (600ms задержка).
 * Откройте дропдаун → видите первые 5 → скрольте вниз → подгружаются следующие 5 и т.д.
 */
export const Paginated: StoryObj<typeof SelectAsync> = {
  render: () => (
    <SelectAsync
      label="Город (пагинация, 20 городов)"
      placeholder="Выберите город"
      load={asyncLoadPaginated}
    />
  ),
}

/**
 * Демо с реальным fetch к /api/cities — в host-приложении (Mirage и т.п.).
 * Здесь используется та же подгрузка, что и в Async.
 */
export const AsyncWithMirage: StoryObj<typeof SelectAsync> = {
  render: () => (
    <SelectAsync
      label="Город (как в Mirage — подставь load из приложения)"
      placeholder="Выберите город"
      load={asyncLoad}
    />
  ),
}

/** Аналогично: пагинация через API — в приложении подключи свой load */
export const PaginatedWithMirage: StoryObj<typeof SelectAsync> = {
  render: () => (
    <SelectAsync
      label="Город (пагинация — свой load в приложении)"
      placeholder="Выберите город"
      load={asyncLoadPaginated}
    />
  ),
}
