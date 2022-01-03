import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.bg};
    font-family: 'Roboto', sans-serif;
  }
  button {
    -webkit-tap-highlight-color: transparent;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyle
