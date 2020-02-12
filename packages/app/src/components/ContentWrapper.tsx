import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(SafeAreaView)<{
  toLeft: ContentWrapperProps['toLeft']
}>`
  width: 100%;
  align-items: ${({ toLeft }) => (toLeft ? 'flex-start' : 'center')};
  justify-content: center;
  height: 90%;
`
interface ContentWrapperProps {
  toLeft?: boolean
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  toLeft,
}) => {
  return <Wrapper toLeft={toLeft}>{children}</Wrapper>
}

export default ContentWrapper
