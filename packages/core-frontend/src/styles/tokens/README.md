# Дизайн-токены (`--brand-*`)

## Файлы

| Файл | Назначение |
|------|------------|
| `brand-tokens.css` | Только CSS-переменные для светлой и тёмной темы (`:root` / `.dark`). |
| `brand-tailwind-bridge.css` | `@theme inline` — мост в утилиты Tailwind v4 (`bg-brand-*`, `p-brand-*`, …). |

## Подключение в приложении

Порядок **важен**:

```css
@import 'core-frontend/styles/tokens.css';
@import "tailwindcss";
@import "@heroui/styles";
@import 'core-frontend/styles/tailwind-bridge.css';
```

Дальше на корневом элементе переключайте тему: `class="dark"` или `data-theme="dark"` / `light`.

## Темизация

- Переменные с префиксом `--brand-*` переопределяются в селекте `.dark, [data-theme="dark"]`.
- Для HeroUI акцентов дублируются `--accent` и `--accent-foreground` из брендовых токенов.
