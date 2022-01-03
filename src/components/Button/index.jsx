import Button from '@mui/material/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  display: block;
  max-width: ${({ theme }) => theme.sizes.blocks.button};
`

const Btn = ({ children, className, onClick }) => (
  <StyledButton
    variant="outlined"
    className={className}
    onClick={onClick}
  >{ children }
  </StyledButton>
)

export default Btn
