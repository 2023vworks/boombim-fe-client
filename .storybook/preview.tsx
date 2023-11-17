import React from 'react'
import type { Preview } from '@storybook/react'
import GlobalStyle from '../src/styles/GlobalStyle'
import theme from '../src/styles/theme'
import { ThemeProvider } from 'styled-components'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]

export default preview
