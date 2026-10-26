import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')
    const root = path.resolve(dirname, '..')
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(root, 'src'),
        },
      },
    })
  },
}

export default config
