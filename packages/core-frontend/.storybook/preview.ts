import React from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/styles/preview.css'

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
    layout: 'padded',
  },
  globalTypes: {
    theme: {
      description: 'Тема',
      toolbar: {
        title: 'Тема',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Светлая' },
          { value: 'dark', title: 'Тёмная' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals?.theme as string) ?? 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.className = theme
        document.documentElement.setAttribute('data-theme', theme)
        document.body.className = 'bg-background text-foreground min-h-screen'
      }
      return React.createElement(Story)
    },
  ],
}

export default preview
