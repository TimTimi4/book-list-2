import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.sizes.blocks.container};
  position: relative;
  margin: 50px auto;
  padding: 0px 20px 0px 20px;
`

const Container = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default Container
