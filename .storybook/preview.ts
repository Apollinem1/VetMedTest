import React from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/app/index.css'
import { makeServer } from '../src/shared/api/mirage'

// Mirage для моков API в сторибуке (селекты с подгрузкой)
if (typeof window !== 'undefined') {
  const server = (window as Window & { __mirageServer?: ReturnType<typeof makeServer> }).__mirageServer
  if (server) server.shutdown()
  ;(window as Window & { __mirageServer?: ReturnType<typeof makeServer> }).__mirageServer = makeServer({
    environment: 'test',
  })
}

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals?.theme ?? 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.className = theme
        document.documentElement.setAttribute('data-theme', theme)
        document.body.className = 'bg-background text-foreground'
      }
      return React.createElement(Story)
    },
  ],
}

export default preview