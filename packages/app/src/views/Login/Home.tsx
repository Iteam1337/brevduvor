import React from 'react'

import { ScrollableLayout } from '~/components/Layout'
import ContentWrapper from '~/components/ContentWrapper'
import { AuthContext } from '~/AppContext'
import Logotype from '~/assets/Logotype'
import PrimaryButton from '~/components/Button'
import Input from '~/components/form/Input'
import styled from 'styled-components/native'

const backgroundImage = require('~/../assets/background-topo.png')

interface HomeProps {
  navigation: any
}

const Wrap = styled.View`
  margin-top: 100px;
  height: 50px;
  margin-bottom: 100px;
`

const StyledLogo = styled(Logotype)`
  height: 50px;
  flex: 1;
`

const InputWrapper = styled.View`
  width: 100%;
`

const Home: React.FC<HomeProps> = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { login } = React.useContext<any>(AuthContext)

  return (
    <ScrollableLayout image={backgroundImage}>
      <ContentWrapper>
        <Wrap>
          <StyledLogo />
        </Wrap>
        <InputWrapper>
          <Input
            keyboardType="email-address"
            value={email}
            callback={setEmail}
            placeholder="Epost"
          />
          <Input
            secureTextEntry={true}
            value={password}
            callback={setPassword}
            placeholder="Lösenord"
          />
        </InputWrapper>
        <PrimaryButton
          text="Logga in"
          callback={() => login({ email, password })}
        />
      </ContentWrapper>
    </ScrollableLayout>
  )
}

export default Home
