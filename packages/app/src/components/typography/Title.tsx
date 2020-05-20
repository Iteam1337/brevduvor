import React from 'react'
import Heading from '~/components/typography/Heading'
import styled from 'styled-components/native'

interface Props {
  text: string
}

const Wrapper = styled.View`
  margin-top: 60px;
  align-self: center;
  justify-content: flex-end;
  margin-bottom: 40px;
`

const Title: React.FC<Props> = ({ text }) => {
  return (
    <Wrapper>
      <Heading text={text} />
    </Wrapper>
  )
}

export default Title
