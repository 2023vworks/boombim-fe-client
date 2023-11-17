import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/atom/Button/Button'

const meta = {
  title: 'Boombim/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'text',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Button',
    width: 320,
    height: 42,
    buttonType: 'PRIMARY',
  },
}

export const Outline: Story = {
  args: {
    text: 'Button',
    width: 320,
    height: 42,
    buttonType: 'OUTLINE',
  },
}
