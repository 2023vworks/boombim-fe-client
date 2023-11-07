import { Typography } from '@/components/atom/Typography/Typography'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Boombim/Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'text',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    text: 'Button',
    width: 320,
    height: 42,
    buttonType: 'PRIMARY',
  },
}
