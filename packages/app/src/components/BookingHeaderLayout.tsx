import React from 'react'
import styled from 'styled-components/native'

const BookingHeaderContainer = styled.View`
  height: 150px;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 100px;
`

const BookingHeader: React.FC = ({ children }) => {
  return <BookingHeaderContainer>{children}</BookingHeaderContainer>
}

export default BookingHeader
