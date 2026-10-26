# core-frontend

Общая UI-библиотека на **React 19** и **HeroUI v3** (Tailwind CSS v4).

## Разработка

```bash
npm install
npm run storybook      # http://localhost:6006 — каталог компонентов и сториз
npm run build          # сборка npm-пакета (tsup → dist/)
npm run build-storybook # статическая документация → storybook-static/
npm run check          # tsc --noEmit
```

### Локальная подстановка в shop без publish

В **shop** зависимость задана как **`file:../core-frontend`** (соседние репозитории). После `npm install` в shop можно дополнительно из **корня core-frontend**:

```bash
npm run sync:shop
```

Скрипт собирает либу и копирует `dist/`, `src/styles/`, `package.json` в `../shop/node_modules/core-frontend/`.

Другой путь к shop:

```bash
# Windows PowerShell
$env:SHOP_ROOT="D:\path\to\shop"; npm run sync:shop
```

Сторизы лежат рядом с компонентами: `src/ui/**/*.stories.tsx`. В сайдбаре Storybook группа **`Core/UI/…`**.

## Публикация

```bash
npm run build
npm publish
```

Настройка `.npmrc` и GitLab Package Registry — токен для `//git.onibox.ru/.../packages/npm/`; в потребителе удобнее зависимость **tarball-URL** или `file:../core-frontend`, т.к. у не-scoped пакета нельзя отдельно задать registry в `.npmrc` (только `@scope:registry`).

## Использование в приложении

Установите пакет из GitLab Registry.

### Бренд-токены (цвета, отступы, шрифты, тени, темы)

См. `src/styles/tokens/README.md`. В корневом CSS приложения:

```css
@import 'core-frontend/styles/tokens.css';
@import "tailwindcss";
@import "@heroui/styles";
@import 'core-frontend/styles/tailwind-bridge.css';
```

Тема: `class="dark"` или `data-theme="dark"` на корне.

### Компоненты

```tsx
import { Button } from 'core-frontend'
```

В Storybook: раздел **Docs → Brand book**.

---

