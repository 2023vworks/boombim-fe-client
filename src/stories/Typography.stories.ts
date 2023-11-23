import { Typography } from '@/bds/Typography/Typography'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Boombim/Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      name: 'CHILDREN',
    },
    size: {
      name: 'SIZE',
    },
    color: {
      name: 'COLOR',
    },
    lineHeight: {
      name: 'LINE_HEIGHT',
    },
    fontWeight: {
      name: 'FONT_WEIGHT',
    },
    fontFamily: {
      name: 'FONT_FAMILY',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'H1',
    color: 'mainColor',
  },
}
export const H2: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'H2',
    color: 'mainColor',
  },
}
export const H3: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'H3',
    color: 'mainColor',
  },
}
export const H4: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'H4',
    color: 'mainColor',
  },
}
export const H5: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'H5',
    color: 'mainColor',
  },
}
export const P: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'P',
    color: 'mainColor',
  },
}
export const SMALL: Story = {
  args: {
    children: '타이포그래피',
    fontWeight: 600,
    size: 'SMALL',
    color: 'mainColor',
  },
}
