import React, { useState } from 'react'
import styled from 'styled-components'

type InputShape = 'normal' | 'outlined'

interface Props {
  defaultValue?: string
  placeholder?: string
  onChange: (data: string) => void
  shape?: InputShape
  autoFocus?: boolean
}

export default function Input({
  onChange,
  defaultValue,
  placeholder = '텍스트를 입력해 주세요',
  shape = 'normal',
  autoFocus = false,
}: Props) {
  const [text, setText] = useState('')

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setText(value)
    onChange(value)
  }

  return (
    <DefaultInput
      onChange={onChangeValue}
      value={text}
      defaultValue={defaultValue}
      placeholder={placeholder}
      shape={shape}
      autoFocus={autoFocus}
    />
  )
}

const DefaultInput = styled.input<{ shape: InputShape }>`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border: ${(props) => (props.shape === 'outlined' ? '1px solid black' : '1px solid white')};
  border-radius: 8px;
`
